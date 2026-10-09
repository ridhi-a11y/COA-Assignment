import React, { useState } from "react";
import { Copy, Check, ArrowRight, Sparkles, AlertCircle, RefreshCw, Cpu, Layers, Binary, Hash } from "lucide-react";
import { BASES, convertNumber, validateInput } from "@/utils/numberConverter";

const samplePresets = [
  { label: "Decimal 45 → Binary", val: "45", from: 10, to: 2 },
  { label: "Binary 101101 → Decimal", val: "101101", from: 2, to: 10 },
  { label: "Decimal 45 → Hexadecimal", val: "45", from: 10, to: 16 },
  { label: "Hexadecimal 2D → Octal", val: "2D", from: 16, to: 8 },
  { label: "Octal 55 → Binary", val: "55", from: 8, to: 2 },
  { label: "Decimal 255 → Hexadecimal", val: "255", from: 10, to: 16 },
];

export default function NumberConverter() {
  const [inputVal, setInputVal] = useState("45");
  const [fromBase, setFromBase] = useState(10);
  const [toBase, setToBase] = useState(2);
  const [validationError, setValidationError] = useState("");
  const [calculationResult, setCalculationResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputVal(val);
    setValidationError("");
  };

  const handleFromBaseChange = (e) => {
    const base = Number(e.target.value);
    setFromBase(base);
    setValidationError("");
  };

  const handleToBaseChange = (e) => {
    const base = Number(e.target.value);
    setToBase(base);
  };

  const handleCalculate = () => {
    setCopied(false);
    const validation = validateInput(inputVal, fromBase);
    if (!validation.isValid) {
      setValidationError(validation.error);
      setCalculationResult(null);
      return;
    }

    setValidationError("");
    const res = convertNumber(inputVal, fromBase, toBase);
    if (res.success) {
      setCalculationResult(res);
    } else {
      setValidationError(res.error);
      setCalculationResult(null);
    }
  };

  const handleCopy = () => {
    if (!calculationResult) return;
    navigator.clipboard.writeText(calculationResult.result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const applyPreset = (preset) => {
    setInputVal(preset.val);
    setFromBase(preset.from);
    setToBase(preset.to);
    setValidationError("");
    setCalculationResult(null);
  };

  const swapBases = () => {
    const prevFrom = fromBase;
    const prevTo = toBase;
    setFromBase(prevTo);
    setToBase(prevFrom);
    if (calculationResult) {
      setInputVal(calculationResult.result);
      setCalculationResult(null);
    }
    setValidationError("");
  };

  return (
    <div className="w-full">
      {/* Main Interactive Converter Box */}
      <div className="bg-[#111114] border border-primary/45 rounded-2xl p-6 sm:p-8 md:p-10 shadow-[0_0_35px_rgba(255,184,0,0.08)] relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/[0.04] rounded-full blur-3xl pointer-events-none" />

        {/* Quick Presets */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mr-2 flex items-center gap-1">
            <Sparkles size={12} className="text-primary" />
            Quick Test Cases:
          </span>
          {samplePresets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => applyPreset(preset)}
              className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] hover:border-primary/40 text-neutral-300 hover:text-white transition-all"
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Inputs & Selectors Form */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end">
          {/* Input Number */}
          <div className="md:col-span-5">
            <label className="block text-xs font-medium text-neutral-400 mb-2">
              Input Number ({BASES[fromBase].name} digits only)
            </label>
            <div className="relative">
              <input
                type="text"
                value={inputVal}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCalculate();
                }}
                placeholder={`e.g. ${BASES[fromBase].example}`}
                className={`w-full px-4 py-3.5 rounded-xl bg-[#0A0A0C] border font-mono text-base sm:text-lg text-white placeholder-neutral-600 focus:outline-none transition-all ${
                  validationError
                    ? "border-red-500/80 focus:border-red-500 ring-1 ring-red-500/20"
                    : "border-white/[0.12] focus:border-primary/60 focus:ring-1 focus:ring-primary/30"
                }`}
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 font-mono text-xs text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                Base {fromBase}
              </span>
            </div>
          </div>

          {/* Source Dropdown */}
          <div className="md:col-span-3">
            <label className="block text-xs font-medium text-neutral-400 mb-2">
              From / Source System
            </label>
            <div className="relative">
              <select
                value={fromBase}
                onChange={handleFromBaseChange}
                className="w-full px-3.5 py-3.5 rounded-xl bg-[#0A0A0C] border border-white/[0.12] text-sm text-white focus:outline-none focus:border-primary/60 appearance-none cursor-pointer transition-all pr-8"
              >
                <option value={10}>Decimal (Base 10)</option>
                <option value={2}>Binary (Base 2)</option>
                <option value={8}>Octal (Base 8)</option>
                <option value={16}>Hexadecimal (Base 16)</option>
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 text-xs">
                ▼
              </div>
            </div>
          </div>

          {/* Swap Button / Arrow Divider */}
          <div className="hidden md:flex md:col-span-1 justify-center pb-3">
            <button
              type="button"
              onClick={swapBases}
              title="Swap source and target systems"
              className="w-10 h-10 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-primary/40 flex items-center justify-center text-neutral-400 hover:text-primary transition-all"
            >
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Target Dropdown */}
          <div className="md:col-span-3">
            <label className="block text-xs font-medium text-neutral-400 mb-2">
              To / Target System
            </label>
            <div className="relative">
              <select
                value={toBase}
                onChange={handleToBaseChange}
                className="w-full px-3.5 py-3.5 rounded-xl bg-[#0A0A0C] border border-white/[0.12] text-sm text-white focus:outline-none focus:border-primary/60 appearance-none cursor-pointer transition-all pr-8"
              >
                <option value={2}>Binary (Base 2)</option>
                <option value={10}>Decimal (Base 10)</option>
                <option value={8}>Octal (Base 8)</option>
                <option value={16}>Hexadecimal (Base 16)</option>
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 text-xs">
                ▼
              </div>
            </div>
          </div>
        </div>

        {/* Validation Error Message */}
        {validationError && (
          <div className="mt-4 p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-300 font-mono animate-in fade-in duration-150">
            <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-red-200">Validation Error: </span>
              {validationError}
            </div>
          </div>
        )}

        {/* Calculate Action Button */}
        <div className="mt-6 flex items-center justify-end pt-4 border-t border-white/[0.06]">
          <button
            onClick={handleCalculate}
            className="px-6 py-2.5 rounded-xl bg-primary hover:bg-[#FFA500] text-black font-semibold text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(255,184,0,0.2)] hover:shadow-[0_0_28px_rgba(255,184,0,0.35)] transition-all active:scale-[0.98]"
          >
            <span>Calculate</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* CALCULATION RESULT CONTAINER (Only displayed after calculate) */}
      {calculationResult && (
        <div className="mt-8 bg-[#111114] border border-primary/30 rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-300 relative overflow-hidden">
          {/* Subtle amber ambient corner accent */}
          <div className="absolute top-0 left-0 w-32 h-1 bg-gradient-to-r from-primary to-transparent" />

          {/* Result Header & Copy */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-primary block mb-1">
                CALCULATION RESULT
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                  {calculationResult.result}
                </span>
                <span className="font-mono text-lg sm:text-xl text-primary font-bold">
                  {BASES[calculationResult.toBase].symbol}
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1 font-mono">
                Converted from {calculationResult.input}{BASES[calculationResult.fromBase].symbol} ({BASES[calculationResult.fromBase].name})
              </p>
            </div>

            <button
              onClick={handleCopy}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-medium transition-all ${
                copied
                  ? "bg-green-500/20 border border-green-500/40 text-green-300"
                  : "bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-neutral-300 hover:text-white hover:border-primary/40"
              }`}
            >
              {copied ? (
                <>
                  <Check size={14} className="text-green-400" />
                  <span>COPIED TO CLIPBOARD</span>
                </>
              ) : (
                <>
                  <Copy size={14} className="text-primary" />
                  <span>COPY RESULT</span>
                </>
              )}
            </button>
          </div>

          {/* STEP-BY-STEP CONVERSION SECTION */}
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <h3 className="text-base font-bold text-white tracking-tight">
                Step-by-Step Conversion
              </h3>
            </div>

            <div className="space-y-6">
              {calculationResult.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-[#0A0A0C] border border-white/[0.06] rounded-xl p-5 sm:p-6"
                >
                  <h4 className="text-sm font-semibold text-white mb-1.5 flex items-center gap-2">
                    <span className="text-primary font-mono text-xs">0{idx + 1}.</span>
                    {step.title}
                  </h4>
                  <p className="text-xs text-neutral-400 mb-4 leading-relaxed font-normal">
                    {step.description}
                  </p>

                  <div className="bg-[#111114] border border-white/[0.04] rounded-lg p-4 font-mono text-xs sm:text-sm text-neutral-200 space-y-1.5 overflow-x-auto">
                    {step.lines.map((line, lIdx) => (
                      <div
                        key={lIdx}
                        className={`whitespace-pre ${
                          line.includes("Therefore:")
                            ? "text-primary font-bold pt-2 border-t border-white/[0.06] mt-2"
                            : "text-neutral-300"
                        }`}
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4 EDUCATIONAL CARDS */}
      <div className="mt-14">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-primary font-medium">
              FOUNDATIONAL RADIX SYSTEMS
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              The four foundational number systems used across hardware and computing systems.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Binary */}
          <div className="bg-[#111114] border border-white/[0.06] hover:border-primary/40 rounded-xl p-5 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs text-primary font-medium">BASE 2</span>
              <Binary size={18} className="text-neutral-500 group-hover:text-primary transition-colors" />
            </div>
            <h4 className="text-base font-semibold text-white mb-1 tracking-tight">Binary</h4>
            <div className="font-mono text-xl font-bold text-primary mb-3">
              0, 1
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed font-normal">
              The native language of computer hardware. Each bit maps directly to the physical on/off state of CMOS transistors.
            </p>
          </div>

          {/* Card 2: Decimal */}
          <div className="bg-[#111114] border border-white/[0.06] hover:border-primary/40 rounded-xl p-5 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs text-primary font-medium">BASE 10</span>
              <Hash size={18} className="text-neutral-500 group-hover:text-primary transition-colors" />
            </div>
            <h4 className="text-base font-semibold text-white mb-1 tracking-tight">Decimal</h4>
            <div className="font-mono text-xl font-bold text-primary mb-3">
              0–9
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed font-normal">
              Standard human radix. Input quantities and higher-level user calculations are entered in base 10 before machine encoding.
            </p>
          </div>

          {/* Card 3: Octal */}
          <div className="bg-[#111114] border border-white/[0.06] hover:border-primary/40 rounded-xl p-5 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs text-primary font-medium">BASE 8</span>
              <Layers size={18} className="text-neutral-500 group-hover:text-primary transition-colors" />
            </div>
            <h4 className="text-base font-semibold text-white mb-1 tracking-tight">Octal</h4>
            <div className="font-mono text-xl font-bold text-primary mb-3">
              0–7
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed font-normal">
              Groups binary bits in 3s (2³ = 8). Historically vital in 12-bit/36-bit systems (DEC PDP) and modern Unix file permission masks.
            </p>
          </div>

          {/* Card 4: Hexadecimal */}
          <div className="bg-[#111114] border border-white/[0.06] hover:border-primary/40 rounded-xl p-5 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs text-primary font-medium">BASE 16</span>
              <Cpu size={18} className="text-neutral-500 group-hover:text-primary transition-colors" />
            </div>
            <h4 className="text-base font-semibold text-white mb-1 tracking-tight">Hexadecimal</h4>
            <div className="font-mono text-xl font-bold text-primary mb-3">
              0–9, A–F
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed font-normal">
              Groups binary in 4-bit nibbles (2⁴ = 16). The universal standard for byte representation, RAM address spaces, and machine opcode inspection.
            </p>
          </div>
        </div>
      </div>

      {/* WHY NUMBER SYSTEMS MATTER IN COMPUTERS */}
      <div className="mt-12 bg-[#111114] border border-white/[0.06] rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          <h3 className="font-mono text-xs uppercase tracking-widest text-primary font-medium">
            WHY NUMBER SYSTEMS MATTER IN COMPUTATION
          </h3>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-5 text-xs text-neutral-400 leading-relaxed">
          <div>
            <h4 className="text-white font-semibold text-sm mb-1.5 flex items-center gap-1.5">
              <span className="text-primary font-mono">1.</span> Physical Transistor Physics
            </h4>
            <p>
              Digital integrated circuits operate on voltage thresholds (e.g. 0V for logic LOW and 3.3V/1.8V for logic HIGH). Because two discrete states yield the highest noise immunity, computers are fundamentally binary devices.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-1.5 flex items-center gap-1.5">
              <span className="text-primary font-mono">2.</span> Word Alignment & Memory Addressing
            </h4>
            <p>
              Writing 32-bit or 64-bit binary strings (e.g., <code className="text-neutral-200 font-mono">1111111111111111</code>) is error-prone. Hexadecimal condenses every byte (8 bits) into exactly two characters (<code className="text-primary font-mono">0xFF</code>), perfectly aligning with physical bus architectures.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-1.5 flex items-center gap-1.5">
              <span className="text-primary font-mono">3.</span> Arithmetic Logic Unit (ALU) Efficiency
            </h4>
            <p>
              Conversion algorithms govern how ALUs handle sign-magnitude, two's complement arithmetic, fixed-point representations, and IEEE-754 floating point numbers under silicon register constraints.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
