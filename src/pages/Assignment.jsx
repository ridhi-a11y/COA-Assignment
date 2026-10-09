import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Download,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Binary,
  Layers,
  Terminal,
  Code2,
  Play,
  Copy,
  Check,
  RotateCcw,
  AlertCircle
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// --- INSTRUCTION SIMULATOR LOGIC (direct port of instruction_simulator.py) ---
const OPNAME = { "+": "ADD", "-": "SUB", "*": "MUL", "/": "DIV" };
const PRECEDENCE = { "+": 1, "-": 1, "*": 2, "/": 2 };

function tokenizeExpr(expr) {
  const tokens = [];
  let i = 0;
  while (i < expr.length) {
    const c = expr[i];
    if (/\s/.test(c)) {
      i++;
      continue;
    }
    if (/[a-zA-Z]/.test(c)) {
      tokens.push(c.toUpperCase());
    } else if ("()+-*/".includes(c)) {
      tokens.push(c);
    } else {
      throw new Error(`Invalid character: ${c}`);
    }
    i++;
  }
  return tokens;
}

function toPostfixExpr(tokens) {
  const output = [];
  const stack = [];
  for (const t of tokens) {
    if (/[A-Z]/.test(t)) {
      output.push(t);
    } else if (t === "(") {
      stack.push(t);
    } else if (t === ")") {
      while (stack.length && stack[stack.length - 1] !== "(") {
        output.push(stack.pop());
      }
      if (!stack.length) throw new Error("Mismatched parentheses");
      stack.pop();
    } else {
      while (
        stack.length &&
        stack[stack.length - 1] !== "(" &&
        (PRECEDENCE[stack[stack.length - 1]] || 0) >= (PRECEDENCE[t] || 0)
      ) {
        output.push(stack.pop());
      }
      stack.push(t);
    }
  }
  while (stack.length) {
    const top = stack.pop();
    if (top === "(" || top === ")") throw new Error("Mismatched parentheses");
    output.push(top);
  }
  return output;
}

class SimNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildTreeExpr(postfix) {
  const stack = [];
  for (const t of postfix) {
    if (/[A-Z]/.test(t)) {
      stack.push(new SimNode(t));
    } else {
      if (stack.length < 2) throw new Error("Malformed expression");
      const r = stack.pop();
      const l = stack.pop();
      stack.push(new SimNode(t, l, r));
    }
  }
  if (stack.length !== 1) throw new Error("Malformed expression");
  return stack[0];
}

function gen0AddrCode(postfix) {
  return postfix.map((t) => (/[A-Z]/.test(t) ? `PUSH ${t}` : OPNAME[t] || t));
}

function gen3AddrCode(postfix) {
  const stack = [];
  const code = [];
  let n = 0;
  const newTemp = () => {
    n++;
    return `T${n}`;
  };
  for (const t of postfix) {
    if (/[A-Z]/.test(t)) {
      stack.push(t);
    } else {
      if (stack.length < 2) return [];
      const b = stack.pop();
      const a = stack.pop();
      const temp = newTemp();
      code.push(`${temp} = ${a} ${t} ${b}`);
      stack.push(temp);
    }
  }
  return code;
}

function gen2AddrCode(postfix) {
  const stack = [];
  const code = [];
  let n = 0;
  const temps = new Set();
  const newTemp = () => {
    n++;
    return `T${n}`;
  };
  for (const t of postfix) {
    if (/[A-Z]/.test(t)) {
      stack.push(t);
    } else {
      if (stack.length < 2) return [];
      const b = stack.pop();
      const a = stack.pop();
      let dest;
      if (temps.has(a)) {
        dest = a;
      } else {
        dest = newTemp();
        temps.add(dest);
        code.push(`MOV ${dest}, ${a}`);
      }
      code.push(`${OPNAME[t] || t} ${dest}, ${b}`);
      stack.push(dest);
    }
  }
  return code;
}

function gen1AddrCode(root) {
  if (!root) return [];
  let n = 0;
  const newTemp = () => {
    n++;
    return `T${n}`;
  };
  function gen(nd) {
    if (!nd || !nd.left) return [];
    const { left, right, val: op } = nd;
    let instrs = [];
    if (!right.left) {
      instrs = instrs.concat(!left.left ? [`LOAD ${left.val}`] : gen(left));
      instrs.push(`${OPNAME[op] || op} ${right.val}`);
    } else {
      instrs = instrs.concat(!right.left ? [`LOAD ${right.val}`] : gen(right));
      const t = newTemp();
      instrs.push(`STORE ${t}`);
      instrs = instrs.concat(!left.left ? [`LOAD ${left.val}`] : gen(left));
      instrs.push(`${OPNAME[op] || op} ${t}`);
    }
    return instrs;
  }
  const code = gen(root);
  n++;
  code.push(`STORE T${n}`);
  return code;
}

export default function Assignment() {
  // Simulator state
  const [showSimulator, setShowSimulator] = useState(false);
  const [simExpression, setSimExpression] = useState("(A + B) * (C - D)");
  const [activeAddressTab, setActiveAddressTab] = useState("all");
  const [copiedCode, setCopiedCode] = useState(false);

  // Compute simulation outputs reactively
  const simResult = useMemo(() => {
    try {
      if (!simExpression.trim()) {
        return { error: "Please enter an expression (e.g. (A + B) * (C - D))" };
      }
      const tokens = tokenizeExpr(simExpression);
      const postfix = toPostfixExpr(tokens);
      const tree = buildTreeExpr(postfix);
      const addr0 = gen0AddrCode(postfix);
      const addr1 = gen1AddrCode(tree);
      const addr2 = gen2AddrCode(postfix);
      const addr3 = gen3AddrCode(postfix);
      return {
        postfix: postfix.join(" "),
        addr0,
        addr1,
        addr2,
        addr3,
        error: null,
      };
    } catch (err) {
      return { error: err.message || "Invalid expression" };
    }
  }, [simExpression]);

  const handleCopyCode = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white selection:bg-primary/20 selection:text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 md:pt-36 pb-24 px-6 max-w-5xl mx-auto w-full">
        {/* PAGE HEADER */}
        <div className="mb-12 pb-8 border-b border-white/[0.08]">
          <span className="font-mono text-xs uppercase tracking-widest text-primary font-medium block mb-2">
            06 / ASSIGNMENT &amp; LAB
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-2">
            Computer Organisation &amp; Architecture
          </h1>

          <div className="flex flex-wrap items-center gap-2 font-mono text-sm text-neutral-300 mb-4">
            <span className="text-primary font-medium">Assignment 01</span>
            <span className="text-neutral-600">·</span>
            <span>BE CSE (Artificial Intelligence)</span>
            <span className="text-neutral-600">·</span>
            <span className="text-neutral-400">Chandigarh University</span>
          </div>

          <p className="text-base sm:text-lg text-neutral-300 max-w-3xl leading-relaxed font-normal">
            Academic coursework and interactive laboratory simulators covering computer organization, microarchitectures (CPU, GPU, TPU), 0/1/2/3-address instruction generation, host hardware profiling, and computing foundations.
          </p>
        </div>

        {/* TILE 1: PRIMARY ASSIGNMENT CARD */}
        <section className="mb-6">
          <div className="bg-[#111114] border border-white/[0.08] hover:border-primary/40 rounded-2xl p-6 sm:p-8 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                <FileText size={22} />
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-primary font-medium block mb-1">
                  OFFICIAL COURSEWORK
                </span>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  COA Assignment 01 — Computer Organization &amp; Architecture
                </h3>
                <p className="text-xs text-neutral-400 font-mono mt-0.5">
                  Subject: Computer Organisation &amp; Architecture · Student: Ridhi Gupta (25BAI10044)
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/COA_Assignment_01_Ridhi_Gupta.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-xs font-medium text-neutral-200 hover:text-white flex items-center gap-2 transition-all"
              >
                <ExternalLink size={13} className="text-primary" />
                <span>View PDF</span>
              </a>

              <a
                href="/COA_Assignment_01_Ridhi_Gupta.pdf"
                download="25bai10044_Ridhi_Gupta_Assignment_1.pdf"
                className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-xs font-medium text-neutral-200 hover:text-white flex items-center gap-2 transition-all"
              >
                <Download size={13} className="text-primary" />
                <span>Download PDF</span>
              </a>
            </div>
          </div>
        </section>

        {/* TILE 2: INSTRUCTION SIMULATOR (UNDER ASSIGNMENT 1) */}
        <section className="mb-14">
          <div className="bg-[#111114] border border-white/[0.08] hover:border-primary/40 rounded-2xl p-6 sm:p-8 transition-all flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                  <Terminal size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono uppercase text-primary font-medium">
                      LABORATORY SIMULATOR · PYTHON TOOL
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-neutral-300">
                      0 / 1 / 2 / 3-Address Formats
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Instruction Simulator
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono mt-0.5">
                    Repository: cu/instruction_simulator.py · Author: Ridhi Gupta
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://github.com/ridhi-a11y/cu/blob/main/instruction_simulator.py"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-xs font-medium text-neutral-200 hover:text-white flex items-center gap-2 transition-all"
                >
                  <ExternalLink size={13} className="text-primary" />
                  <span>View on GitHub</span>
                </a>

                <button
                  onClick={() => setShowSimulator(!showSimulator)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-2 transition-all ${
                    showSimulator
                      ? "bg-primary text-black font-semibold shadow-[0_0_14px_rgba(255,184,0,0.25)]"
                      : "bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-neutral-200 hover:text-white"
                  }`}
                >
                  <Play size={13} className={showSimulator ? "text-black fill-current" : "text-primary"} />
                  <span>{showSimulator ? "Hide Live Simulator" : "Try Live Simulator"}</span>
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
              An interactive expression-to-instruction translator demonstrating 0-, 1-, 2-, and 3-address instruction formats through postfix conversion and expression-tree generation.
            </p>

            {/* ARCHITECTURAL FORMAT PILLS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/[0.06] text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-[#0A0A0C] border border-white/[0.04]">
                <span className="text-primary font-semibold block text-[11px] mb-0.5">0-Address (Stack)</span>
                <span className="text-[11px] text-neutral-400">PUSH / POP / OP on stack top</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0A0A0C] border border-white/[0.04]">
                <span className="text-primary font-semibold block text-[11px] mb-0.5">1-Address (AC)</span>
                <span className="text-[11px] text-neutral-400">LOAD / STORE / OP with Accumulator</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0A0A0C] border border-white/[0.04]">
                <span className="text-primary font-semibold block text-[11px] mb-0.5">2-Address (Reg)</span>
                <span className="text-[11px] text-neutral-400">MOV / OP Dest, Src register pairs</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0A0A0C] border border-white/[0.04]">
                <span className="text-primary font-semibold block text-[11px] mb-0.5">3-Address (Triplets)</span>
                <span className="text-[11px] text-neutral-400">Dest = Op1 op Op2 explicit registers</span>
              </div>
            </div>

            {/* INTERACTIVE IN-BROWSER SIMULATOR DRAWER */}
            {showSimulator && (
              <div className="mt-2 p-5 sm:p-6 rounded-xl bg-[#0A0A0C] border border-primary/20 space-y-5 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
                      Live In-Browser Instruction Translator
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-neutral-400">Presets:</span>
                    {[
                      "(A + B) * (C - D)",
                      "(A + B) / (C * D - E)",
                      "A * B + C * D"
                    ].map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setSimExpression(preset)}
                        className="px-2 py-1 rounded text-[10px] font-mono bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-neutral-300 hover:text-white transition-all"
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                {/* EXPRESSION INPUT BOX */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-neutral-400 block">
                    Mathematical Infix Expression (supports A–Z, +, -, *, /, and parentheses):
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={simExpression}
                      onChange={(e) => setSimExpression(e.target.value)}
                      placeholder="e.g. (A + B) * (C - D)"
                      className="w-full bg-[#111114] border border-white/[0.1] focus:border-primary rounded-xl px-4 py-2.5 font-mono text-sm text-white focus:outline-none transition-colors"
                    />
                    <button
                      onClick={() => setSimExpression("(A + B) * (C - D)")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
                      title="Reset expression"
                    >
                      <RotateCcw size={14} />
                    </button>
                  </div>
                </div>

                {/* ERROR NOTIFICATION IF INVALID */}
                {simResult.error ? (
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-mono flex items-center gap-2">
                    <AlertCircle size={15} className="shrink-0" />
                    <span>{simResult.error}</span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* POSTFIX DISPLAY */}
                    <div className="p-3 rounded-lg bg-[#111114] border border-white/[0.06] flex items-center justify-between text-xs font-mono">
                      <div>
                        <span className="text-neutral-500 mr-2">Postfix Form:</span>
                        <span className="text-primary font-bold">{simResult.postfix}</span>
                      </div>
                      <span className="text-[10px] text-neutral-400">Shunting-Yard Conversion</span>
                    </div>

                    {/* FORMAT SELECTOR TABS */}
                    <div className="flex flex-wrap items-center gap-1.5 border-b border-white/[0.06] pb-2">
                      {[
                        { id: "all", label: "All Formats View" },
                        { id: "addr0", label: "0-Address (Stack)" },
                        { id: "addr1", label: "1-Address (AC)" },
                        { id: "addr2", label: "2-Address (Reg)" },
                        { id: "addr3", label: "3-Address (Triplets)" }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveAddressTab(tab.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                            activeAddressTab === tab.id
                              ? "bg-primary/10 text-primary border border-primary/30 font-medium"
                              : "text-neutral-400 hover:text-white"
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* GENERATED INSTRUCTIONS GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
                      {(activeAddressTab === "all" || activeAddressTab === "addr0") && (
                        <div className="p-4 rounded-xl bg-[#111114] border border-white/[0.06] space-y-2">
                          <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                            <span className="text-primary font-semibold">0-Address Code (Stack)</span>
                            <span className="text-[10px] text-neutral-400">{simResult.addr0.length} instrs</span>
                          </div>
                          <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                            {simResult.addr0.map((inst, idx) => (
                              <div key={idx} className="flex items-center justify-between text-neutral-300">
                                <span className="text-neutral-600 text-[10px] w-6">{idx + 1}.</span>
                                <span className="flex-1 font-semibold">{inst}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {(activeAddressTab === "all" || activeAddressTab === "addr1") && (
                        <div className="p-4 rounded-xl bg-[#111114] border border-white/[0.06] space-y-2">
                          <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                            <span className="text-primary font-semibold">1-Address Code (Accumulator)</span>
                            <span className="text-[10px] text-neutral-400">{simResult.addr1.length} instrs</span>
                          </div>
                          <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                            {simResult.addr1.map((inst, idx) => (
                              <div key={idx} className="flex items-center justify-between text-neutral-300">
                                <span className="text-neutral-600 text-[10px] w-6">{idx + 1}.</span>
                                <span className="flex-1 font-semibold">{inst}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {(activeAddressTab === "all" || activeAddressTab === "addr2") && (
                        <div className="p-4 rounded-xl bg-[#111114] border border-white/[0.06] space-y-2">
                          <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                            <span className="text-primary font-semibold">2-Address Code (Register)</span>
                            <span className="text-[10px] text-neutral-400">{simResult.addr2.length} instrs</span>
                          </div>
                          <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                            {simResult.addr2.map((inst, idx) => (
                              <div key={idx} className="flex items-center justify-between text-neutral-300">
                                <span className="text-neutral-600 text-[10px] w-6">{idx + 1}.</span>
                                <span className="flex-1 font-semibold">{inst}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {(activeAddressTab === "all" || activeAddressTab === "addr3") && (
                        <div className="p-4 rounded-xl bg-[#111114] border border-white/[0.06] space-y-2">
                          <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                            <span className="text-primary font-semibold">3-Address Code (Triplets)</span>
                            <span className="text-[10px] text-neutral-400">{simResult.addr3.length} instrs</span>
                          </div>
                          <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                            {simResult.addr3.map((inst, idx) => (
                              <div key={idx} className="flex items-center justify-between text-neutral-300">
                                <span className="text-neutral-600 text-[10px] w-6">{idx + 1}.</span>
                                <span className="flex-1 font-semibold">{inst}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                      <span>Source: cu/instruction_simulator.py by Ridhi Gupta</span>
                      <a
                        href="https://github.com/ridhi-a11y/cu/blob/main/instruction_simulator.py"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline inline-flex items-center gap-1"
                      >
                        <span>GitHub Repository</span>
                        <ExternalLink size={11} />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>



      </main>

      <Footer />
    </div>
  );
}
