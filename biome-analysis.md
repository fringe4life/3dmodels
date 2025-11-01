# Biome.jsonc vs Ultracite Analysis

## Summary

Your `biome.jsonc` contains **duplicate rules** from Ultracite and **conflicting levels** for some rules.

## Duplicate Rules (Same Level)

These rules are already set by Ultracite at the same level, so they're redundant:

- `suspicious.noDoubleEquals: "error"` - Already set by Ultracite core
- `suspicious.noDebugger: "error"` - Already set by Ultracite core
- `style.useImportType: "error"` - Already set by Ultracite core
- `style.useConsistentArrayType: "error"` - Already set by Ultracite core
- `correctness.noUnusedVariables: "error"` - Already set by Ultracite core
- `correctness.noUndeclaredVariables: "error"` - Already set by Ultracite core
- All `a11y.*` rules (12 rules) - All already set by Ultracite core

## Rules with Different Levels (Conflicts)

These rules are set at different levels than Ultracite:

### 1. `suspicious.noExplicitAny`
- **Your config**: `"warn"`
- **Ultracite core**: `"error"`
- **Impact**: You're relaxing this rule - Ultracite wants it as error, you want warnings

### 2. `complexity.noExcessiveCognitiveComplexity`
- **Your config**: `"warn"`
- **Ultracite core**: `"error"`
- **Impact**: You're relaxing this rule - Ultracite wants it as error, you want warnings

### 3. `performance.noImgElement`
- **Your config**: `"off"`
- **Ultracite next**: `"error"`
- **Impact**: You're disabling this rule - Ultracite wants to enforce Next.js `<Image>` usage

### 4. `correctness.noUndeclaredDependencies`
- **Your config**: `"error"`
- **Ultracite core**: `"off"`
- **Impact**: You're enabling this rule - Ultracite has it disabled (likely too slow)

## Rules with Different Options

### `nursery.useSortedClasses`
- **Your config**: Functions: `["clsx", "cva", "tw", "tw.*"]`
- **Ultracite core**: Functions: `["clsx", "cva", "tw", "twMerge", "cn", "twJoin", "tv"]`
- **Impact**: Your config is missing some common utility functions that Ultracite supports

## Recommendations

1. **Remove duplicate rules** that match Ultracite's defaults (same level)
2. **Keep or document** rules with different levels if intentional
3. **Update `useSortedClasses` options** to include missing functions if you use them
4. **Consider `noUndeclaredDependencies`** - it's disabled in Ultracite for performance; only enable if needed

