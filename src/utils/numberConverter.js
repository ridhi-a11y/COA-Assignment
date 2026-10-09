/**
 * COA Laboratory Number System Converter Engine
 * Pure client-side radix conversion utility with comprehensive step-by-step algorithms.
 */

export const BASES = {
  2: { name: "Binary", label: "Binary (Base 2)", base: 2, symbol: "₂", chars: "01", example: "101101" },
  8: { name: "Octal", label: "Octal (Base 8)", base: 8, symbol: "₈", chars: "01234567", example: "55" },
  10: { name: "Decimal", label: "Decimal (Base 10)", base: 10, symbol: "₁₀", chars: "0123456789", example: "45" },
  16: { name: "Hexadecimal", label: "Hexadecimal (Base 16)", base: 16, symbol: "₁₆", chars: "0123456789ABCDEF", example: "2D" },
};

/**
 * Validate input string for a given radix
 */
export function validateInput(rawInput, fromBase) {
  const input = rawInput.trim();
  if (!input) {
    return { isValid: false, error: "Please enter a number to convert." };
  }

  const baseInfo = BASES[fromBase];
  if (!baseInfo) {
    return { isValid: false, error: "Unsupported base." };
  }

  const upperInput = input.toUpperCase();

  // Check each character
  for (let i = 0; i < upperInput.length; i++) {
    const char = upperInput[i];
    if (!baseInfo.chars.includes(char)) {
      return {
        isValid: false,
        error: `Invalid character '${char}' for ${baseInfo.name} (Base ${baseInfo.base}). Allowed characters are: ${baseInfo.chars}.`
      };
    }
  }

  return { isValid: true, sanitized: upperInput };
}

/**
 * Perform conversion and generate step-by-step explanation
 */
export function convertNumber(rawInput, fromBase, toBase) {
  const validation = validateInput(rawInput, fromBase);
  if (!validation.isValid) {
    return { success: false, error: validation.error };
  }

  const input = validation.sanitized;
  const fromInfo = BASES[fromBase];
  const toInfo = BASES[toBase];

  // 1. Same base edge case
  if (fromBase === toBase) {
    return {
      success: true,
      result: input,
      resultFormatted: `${input}${toInfo.symbol}`,
      fromBase,
      toBase,
      input,
      steps: [
        {
          title: "Direct Identity Mapping",
          description: `The source system (${fromInfo.name}, Base ${fromBase}) matches the target system (${toInfo.name}, Base ${toBase}). No radix conversion is needed.`,
          lines: [`${input}${fromInfo.symbol} = ${input}${toInfo.symbol}`]
        }
      ]
    };
  }

  // Parse source into decimal BigInt
  let decimalVal;
  try {
    decimalVal = BigInt(0);
    const baseBig = BigInt(fromBase);
    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      const val = BigInt("0123456789ABCDEF".indexOf(char));
      decimalVal = decimalVal * baseBig + val;
    }
  } catch (err) {
    return { success: false, error: "Failed to parse input number: " + err.message };
  }

  // Generate target result string
  let targetResult;
  if (toBase === 10) {
    targetResult = decimalVal.toString(10);
  } else if (toBase === 2) {
    targetResult = decimalVal.toString(2);
  } else if (toBase === 8) {
    targetResult = decimalVal.toString(8);
  } else if (toBase === 16) {
    targetResult = decimalVal.toString(16).toUpperCase();
  }

  // Generate Step-by-Step Explanation
  const steps = generateSteps(input, fromBase, toBase, decimalVal, targetResult);

  return {
    success: true,
    result: targetResult,
    resultFormatted: `${targetResult}${toInfo.symbol}`,
    fromBase,
    toBase,
    input,
    decimalVal: decimalVal.toString(),
    steps
  };
}

/**
 * Step-by-step mathematical explanation generator
 */
function generateSteps(input, fromBase, toBase, decimalVal, targetResult) {
  const fromInfo = BASES[fromBase];
  const toInfo = BASES[toBase];
  const steps = [];

  // CASE 1: Decimal to Any Base (Repeated Division Algorithm)
  if (fromBase === 10) {
    const divisionSteps = [];
    let current = decimalVal;
    const targetRadix = BigInt(toBase);

    if (current === 0n) {
      divisionSteps.push(`0 ÷ ${toBase} = 0 remainder 0`);
    } else {
      while (current > 0n) {
        const quotient = current / targetRadix;
        const remainder = current % targetRadix;
        const remHex = "0123456789ABCDEF"[Number(remainder)];
        const remNote = toBase === 16 && remainder >= 10n ? ` (${remainder} → ${remHex})` : "";
        divisionSteps.push(`${current} ÷ ${toBase} = ${quotient} remainder ${remainder}${remNote}`);
        current = quotient;
      }
    }

    steps.push({
      title: `Step 1: Repeated Division by ${toBase}`,
      description: `Divide the decimal value iteratively by target base ${toBase}. Record the integer quotient and the remainder at each step until the quotient becomes 0.`,
      lines: divisionSteps
    });

    steps.push({
      title: "Step 2: Collect Remainders",
      description: "Read the remainders from bottom (Most Significant Digit, MSD) to top (Least Significant Digit, LSD).",
      lines: [
        `Remainders in reverse order: ${targetResult}`,
        `Therefore: ${input}${fromInfo.symbol} = ${targetResult}${toInfo.symbol}`
      ]
    });
    return steps;
  }

  // CASE 2: Any Base to Decimal (Positional Weighting Expansion)
  if (toBase === 10) {
    const expansions = [];
    const n = input.length;
    let sumTerms = [];
    let evaluatedTerms = [];

    for (let i = 0; i < n; i++) {
      const char = input[i];
      const power = n - 1 - i;
      const digitVal = "0123456789ABCDEF".indexOf(char);
      const weight = BigInt(fromBase) ** BigInt(power);
      const termTotal = BigInt(digitVal) * weight;

      if (fromBase === 16 && digitVal >= 10) {
        sumTerms.push(`(${char}[${digitVal}] × ${fromBase}^${power})`);
      } else {
        sumTerms.push(`(${char} × ${fromBase}^${power})`);
      }
      evaluatedTerms.push(termTotal.toString());
    }

    steps.push({
      title: `Step 1: Positional Notation Expansion`,
      description: `Multiply each digit by the radix ${fromBase} raised to the power of its position index (counting from right to left, starting at 0):`,
      lines: [
        `${input}${fromInfo.symbol} = ${sumTerms.join(" + ")}`,
        `= ${evaluatedTerms.join(" + ")}`,
        `= ${decimalVal}`
      ]
    });

    steps.push({
      title: "Step 2: Sum the Products",
      description: "Sum all positional values to obtain the final decimal quantity.",
      lines: [
        `Therefore: ${input}${fromInfo.symbol} = ${decimalVal}₁₀`
      ]
    });
    return steps;
  }

  // CASE 3: Binary to Octal (Direct 3-bit Grouping)
  if (fromBase === 2 && toBase === 8) {
    // Pad to multiple of 3
    const padLength = (3 - (input.length % 3)) % 3;
    const padded = "0".repeat(padLength) + input;
    const groups = [];
    const groupCalcs = [];

    for (let i = 0; i < padded.length; i += 3) {
      const chunk = padded.slice(i, i + 3);
      const val = parseInt(chunk, 2);
      groups.push(chunk);
      groupCalcs.push(`${chunk}₂ = ${val}₈`);
    }

    steps.push({
      title: "Step 1: Group Bits into 3-bit Triads",
      description: "Since 2³ = 8, each octal digit corresponds to exactly 3 binary bits. Group the binary string from right to left into 3-bit groups (padding with leading zeros if necessary):",
      lines: [
        padLength > 0 ? `Padded with ${padLength} leading zero(s): ${padded}` : `Original bits: ${padded}`,
        `Groups: [ ${groups.join(" ] [ ")} ]`
      ]
    });

    steps.push({
      title: "Step 2: Convert Each 3-Bit Group to Octal",
      description: "Evaluate each triad individually using standard 4-2-1 weighting:",
      lines: groupCalcs
    });

    steps.push({
      title: "Step 3: Combine Digits",
      description: "Concatenate the resulting octal digits:",
      lines: [`Therefore: ${input}₂ = ${targetResult}₈`]
    });
    return steps;
  }

  // CASE 4: Binary to Hexadecimal (Direct 4-bit Grouping)
  if (fromBase === 2 && toBase === 16) {
    const padLength = (4 - (input.length % 4)) % 4;
    const padded = "0".repeat(padLength) + input;
    const groups = [];
    const groupCalcs = [];

    for (let i = 0; i < padded.length; i += 4) {
      const chunk = padded.slice(i, i + 4);
      const val = parseInt(chunk, 2);
      const hexChar = "0123456789ABCDEF"[val];
      groups.push(chunk);
      groupCalcs.push(`${chunk}₂ = ${val} = ${hexChar}₁₆`);
    }

    steps.push({
      title: "Step 1: Group Bits into 4-bit Nibbles",
      description: "Since 2⁴ = 16, each hexadecimal digit corresponds to exactly 4 binary bits (one nibble). Group bits from right to left into 4-bit groups:",
      lines: [
        padLength > 0 ? `Padded with ${padLength} leading zero(s): ${padded}` : `Original bits: ${padded}`,
        `Groups: [ ${groups.join(" ] [ ")} ]`
      ]
    });

    steps.push({
      title: "Step 2: Convert Each Nibble to Hexadecimal",
      description: "Evaluate each 4-bit group using standard 8-4-2-1 weighting:",
      lines: groupCalcs
    });

    steps.push({
      title: "Step 3: Combine Digits",
      description: "Concatenate the hexadecimal characters:",
      lines: [`Therefore: ${input}₂ = ${targetResult}₁₆`]
    });
    return steps;
  }

  // CASE 5: Octal to Binary (3-bit expansion)
  if (fromBase === 8 && toBase === 2) {
    const expansions = [];
    for (let char of input) {
      const val = parseInt(char, 8);
      const bin = val.toString(2).padStart(3, "0");
      expansions.push(`${char}₈ → ${bin}₂`);
    }

    steps.push({
      title: "Step 1: Expand Each Octal Digit into 3 Binary Bits",
      description: "Each octal digit (0–7) directly maps to a 3-bit binary representation (4-2-1 code):",
      lines: expansions
    });

    steps.push({
      title: "Step 2: Concatenate and Trim",
      description: "Join the 3-bit binary groups and drop any redundant leading zeros:",
      lines: [
        `Concatenated: ${input.split("").map(c => parseInt(c, 8).toString(2).padStart(3, "0")).join(" ")}`,
        `Therefore: ${input}₈ = ${targetResult}₂`
      ]
    });
    return steps;
  }

  // CASE 6: Hexadecimal to Binary (4-bit expansion)
  if (fromBase === 16 && toBase === 2) {
    const expansions = [];
    for (let char of input) {
      const val = parseInt(char, 16);
      const bin = val.toString(2).padStart(4, "0");
      expansions.push(`${char}₁₆ (${val}) → ${bin}₂`);
    }

    steps.push({
      title: "Step 1: Expand Each Hex Digit into 4 Binary Bits",
      description: "Each hexadecimal digit (0–F) maps to a 4-bit binary nibble (8-4-2-1 code):",
      lines: expansions
    });

    steps.push({
      title: "Step 2: Concatenate and Trim",
      description: "Join the 4-bit nibbles and drop any redundant leading zeros:",
      lines: [
        `Concatenated: ${input.split("").map(c => parseInt(c, 16).toString(2).padStart(4, "0")).join(" ")}`,
        `Therefore: ${input}₁₆ = ${targetResult}₂`
      ]
    });
    return steps;
  }

  // CASE 7: Octal to Hexadecimal (via Binary intermediate)
  if (fromBase === 8 && toBase === 16) {
    const intermediateBin = decimalVal.toString(2);
    const octalToBinExpansions = input.split("").map(c => `${c}₈ → ${parseInt(c, 8).toString(2).padStart(3, "0")}₂`);

    steps.push({
      title: "Stage 1: Convert Octal to Binary (3 bits per digit)",
      description: "Expand each octal digit into its corresponding 3-bit binary triad:",
      lines: [
        ...octalToBinExpansions,
        `Complete Binary representation: ${intermediateBin}₂`
      ]
    });

    // Group binary into 4 bits
    const padLength = (4 - (intermediateBin.length % 4)) % 4;
    const padded = "0".repeat(padLength) + intermediateBin;
    const nibbleCalcs = [];

    for (let i = 0; i < padded.length; i += 4) {
      const chunk = padded.slice(i, i + 4);
      const val = parseInt(chunk, 2);
      const hexChar = "0123456789ABCDEF"[val];
      nibbleCalcs.push(`${chunk}₂ = ${val} → ${hexChar}₁₆`);
    }

    steps.push({
      title: "Stage 2: Regroup Binary into 4-bit Nibbles",
      description: "Group the binary bits from right to left into 4-bit groups and convert each to hexadecimal:",
      lines: [
        `Grouped: ${padded.match(/.{1,4}/g).join(" ")}`,
        ...nibbleCalcs,
        `Therefore: ${input}₈ = ${targetResult}₁₆`
      ]
    });
    return steps;
  }

  // CASE 8: Hexadecimal to Octal (via Binary intermediate)
  if (fromBase === 16 && toBase === 8) {
    const intermediateBin = decimalVal.toString(2);
    const hexToBinExpansions = input.split("").map(c => `${c}₁₆ → ${parseInt(c, 16).toString(2).padStart(4, "0")}₂`);

    steps.push({
      title: "Stage 1: Convert Hexadecimal to Binary (4 bits per digit)",
      description: "Expand each hexadecimal digit into its 4-bit binary nibble:",
      lines: [
        ...hexToBinExpansions,
        `Complete Binary representation: ${intermediateBin}₂`
      ]
    });

    // Group binary into 3 bits
    const padLength = (3 - (intermediateBin.length % 3)) % 3;
    const padded = "0".repeat(padLength) + intermediateBin;
    const triadCalcs = [];

    for (let i = 0; i < padded.length; i += 3) {
      const chunk = padded.slice(i, i + 3);
      const val = parseInt(chunk, 2);
      triadCalcs.push(`${chunk}₂ = ${val}₈`);
    }

    steps.push({
      title: "Stage 2: Regroup Binary into 3-bit Triads",
      description: "Group the binary string from right to left into 3-bit groups and convert each to an octal digit:",
      lines: [
        `Grouped: ${padded.match(/.{1,3}/g).join(" ")}`,
        ...triadCalcs,
        `Therefore: ${input}₁₆ = ${targetResult}₈`
      ]
    });
    return steps;
  }

  // Fallback (General 2-stage via Decimal)
  steps.push({
    title: `Stage 1: Convert ${fromInfo.name} to Decimal`,
    description: `Evaluate ${input}${fromInfo.symbol} using positional expansion to find decimal quantity:`,
    lines: [`${input}${fromInfo.symbol} = ${decimalVal}₁₀`]
  });

  steps.push({
    title: `Stage 2: Convert Decimal to ${toInfo.name}`,
    description: `Divide ${decimalVal} iteratively by ${toBase} to collect remainders:`,
    lines: [`${decimalVal}₁₀ = ${targetResult}${toInfo.symbol}`]
  });

  return steps;
}
