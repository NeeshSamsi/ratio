import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import tokens from "../../design-tokens.tokens.json" with { type: "json" }

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the directory

const { primitives: rawPrimitives, "design-tokens": rawDesignTokens } = tokens

const designTokens = {
  color: {},
  textSizes: {},
  radius: {},
}

function parseTokens(tokens, target, options = {}) {
  const {
    prefix = "",
    transform = (value) => value,
    filter = () => true,
  } = options

  for (const key in tokens) {
    if (filter(key)) {
      const value = tokens[key].value
      target[key.replace(prefix, "")] = transform(value)
    }
  }
}

function generateCssVars(tokens, prefix) {
  return Object.entries(tokens).map(
    ([key, value]) => `\t--${prefix}-${key}: ${value};`,
  )
}

// Parse colors
parseTokens(rawPrimitives.color, designTokens.color)

// Parse text sizes (convert to rem)
parseTokens(rawDesignTokens.font, designTokens.textSizes, {
  transform: (value) => `${value / 16}rem`,
  filter: (key) => !key.startsWith("weight"),
})

// Parse radii
parseTokens(rawDesignTokens.radius, designTokens.radius, {
  transform: (value) => `${value}px`,
})

// Generate CSS variables
const cssVars = {
  color: generateCssVars(designTokens.color, "color"),
  text: generateCssVars(designTokens.textSizes, "text"),
  radius: generateCssVars(designTokens.radius, "radius"),
}

const tokensCssTemplate = `
@theme {
\t--color-*: initial;
${cssVars.color.join("\n")}

\t--text-*: initial;
${cssVars.text.join("\n")}

\t--radius-*: initial;
${cssVars.radius.join("\n")}
}
`

// Generate TypeScript type definitions
function generateTypeDefinitions() {
  const typeDefinitions = []

  // Helper function to sort keys
  function sortKeys(keys) {
    return keys.sort((a, b) => {
      // Handle arrays (from Object.entries)
      const keyA = Array.isArray(a) ? a[0] : a
      const keyB = Array.isArray(b) ? b[0] : b

      // Handle special case for "px"
      if (keyA === "px") return -1
      if (keyB === "px") return 1

      // Convert to numbers for numeric comparison
      const numA = parseFloat(keyA)
      const numB = parseFloat(keyB)

      // If both are numbers, compare numerically
      if (!isNaN(numA) && !isNaN(numB)) {
        return numA - numB
      }

      // Otherwise compare as strings
      return String(keyA).localeCompare(String(keyB))
    })
  }

  // Generate SpacingKey type
  const spacingKeys = sortKeys(
    Object.keys(rawDesignTokens.spacing)
      .map((key) => key.replace("space-", ""))
      .map((key) => (key === "0-5" ? "0.5" : key)),
  )
    .map((key) => `"${key}"`)
    .join(" | ")

  typeDefinitions.push(`type SpacingKey = ${spacingKeys};`)

  // Generate BackgroundKey type
  const backgroundKeys = sortKeys(Object.keys(rawDesignTokens.background))
    .map((key) => `"${key}"`)
    .join(" | ")
  typeDefinitions.push(`type BackgroundKey = ${backgroundKeys};`)

  // Generate TextKey type
  const textKeys = sortKeys(Object.keys(rawDesignTokens.text))
    .map((key) => `"${key}"`)
    .join(" | ")
  typeDefinitions.push(`type TextKey = ${textKeys};`)

  // Generate BorderKey type
  const borderKeys = sortKeys(Object.keys(rawDesignTokens.border))
    .map((key) => `"${key}"`)
    .join(" | ")
  typeDefinitions.push(`type BorderKey = ${borderKeys};`)

  // Generate token objects
  const tokenObjects = []

  // Generate margin objects
  const marginObjects = {
    Margin: "m",
    MarginLeft: "ml",
    MarginRight: "mr",
    MarginTop: "mt",
    MarginBottom: "mb",
    MarginX: "mx",
    MarginY: "my",
  }

  Object.entries(marginObjects).forEach(([objName, prefix]) => {
    tokenObjects.push(`const ${objName}: Record<SpacingKey, string> = {
${sortKeys(
  Object.keys(rawDesignTokens.spacing).map((key) => {
    const cleanKey = key.replace("space-", "")
    return cleanKey === "0-5" ? "0.5" : cleanKey
  }),
)
  .map((finalKey) => `  "${finalKey}": "${prefix}-${finalKey}"`)
  .join(",\n")}
};`)
  })

  // Generate padding objects
  const paddingObjects = {
    Padding: "p",
    PaddingLeft: "pl",
    PaddingRight: "pr",
    PaddingTop: "pt",
    PaddingBottom: "pb",
    PaddingX: "px",
    PaddingY: "py",
  }

  Object.entries(paddingObjects).forEach(([objName, prefix]) => {
    tokenObjects.push(`const ${objName}: Record<SpacingKey, string> = {
${sortKeys(
  Object.keys(rawDesignTokens.spacing).map((key) => {
    const cleanKey = key.replace("space-", "")
    return cleanKey === "0-5" ? "0.5" : cleanKey
  }),
)
  .map((finalKey) => `  "${finalKey}": "${prefix}-${finalKey}"`)
  .join(",\n")}
};`)
  })

  // Generate gap object
  tokenObjects.push(`const Gap: Record<SpacingKey, string> = {
${sortKeys(
  Object.keys(rawDesignTokens.spacing).map((key) => {
    const cleanKey = key.replace("space-", "")
    return cleanKey === "0-5" ? "0.5" : cleanKey
  }),
)
  .map((finalKey) => `  "${finalKey}": "gap-${finalKey}"`)
  .join(",\n")}
};`)

  // Generate gap-x and gap-y objects
  tokenObjects.push(`const GapX: Record<SpacingKey, string> = {
${sortKeys(
  Object.keys(rawDesignTokens.spacing).map((key) => {
    const cleanKey = key.replace("space-", "")
    return cleanKey === "0-5" ? "0.5" : cleanKey
  }),
)
  .map((finalKey) => `  "${finalKey}": "gap-x-${finalKey}"`)
  .join(",\n")}
};`)

  tokenObjects.push(`const GapY: Record<SpacingKey, string> = {
${sortKeys(
  Object.keys(rawDesignTokens.spacing).map((key) => {
    const cleanKey = key.replace("space-", "")
    return cleanKey === "0-5" ? "0.5" : cleanKey
  }),
)
  .map((finalKey) => `  "${finalKey}": "gap-y-${finalKey}"`)
  .join(",\n")}
};`)

  // Generate width objects
  const widthObjects = {
    Width: "w",
    MaxWidth: "max-w",
    MinWidth: "min-w",
  }

  Object.entries(widthObjects).forEach(([objName, prefix]) => {
    tokenObjects.push(`const ${objName}: Record<SpacingKey, string> = {
${sortKeys(
  Object.keys(rawDesignTokens.spacing).map((key) => {
    const cleanKey = key.replace("space-", "")
    return cleanKey === "0-5" ? "0.5" : cleanKey
  }),
)
  .map((finalKey) => `  "${finalKey}": "${prefix}-${finalKey}"`)
  .join(",\n")}
};`)
  })

  // Generate height objects
  const heightObjects = {
    Height: "h",
    MaxHeight: "max-h",
    MinHeight: "min-h",
  }

  Object.entries(heightObjects).forEach(([objName, prefix]) => {
    tokenObjects.push(`const ${objName}: Record<SpacingKey, string> = {
${sortKeys(
  Object.keys(rawDesignTokens.spacing).map((key) => {
    const cleanKey = key.replace("space-", "")
    return cleanKey === "0-5" ? "0.5" : cleanKey
  }),
)
  .map((finalKey) => `  "${finalKey}": "${prefix}-${finalKey}"`)
  .join(",\n")}
};`)
  })

  // Generate background objects
  const backgroundObjects = {
    Background: "bg",
    BackgroundHover: "hover:bg",
    BackgroundActive: "active:bg",
  }

  Object.entries(backgroundObjects).forEach(([objName, prefix]) => {
    tokenObjects.push(`const ${objName}: Record<BackgroundKey, string> = {
${sortKeys(Object.entries(rawDesignTokens.background))
  .map(([key, value]) => {
    const colorName =
      value.value.match(/\{primitives\.color\.([^}]+)\}/)?.[1] || value.value
    return `  "${key}": "${prefix}-${colorName}"`
  })
  .join(",\n")}
};`)
  })

  // Generate text objects
  const textObjects = {
    Text: "text",
    TextHover: "hover:text",
    TextActive: "active:text",
  }

  Object.entries(textObjects).forEach(([objName, prefix]) => {
    tokenObjects.push(`const ${objName}: Record<TextKey, string> = {
${sortKeys(Object.entries(rawDesignTokens.text))
  .map(([key, value]) => {
    const colorName =
      value.value.match(/\{primitives\.color\.([^}]+)\}/)?.[1] || value.value
    return `  "${key}": "${prefix}-${colorName}"`
  })
  .join(",\n")}
};`)
  })

  // Generate border objects
  const borderObjects = {
    Border: "border",
    BorderHover: "hover:border",
    BorderActive: "active:border",
  }

  Object.entries(borderObjects).forEach(([objName, prefix]) => {
    tokenObjects.push(`const ${objName}: Record<BorderKey, string> = {
${sortKeys(Object.entries(rawDesignTokens.border))
  .map(([key, value]) => {
    const colorName =
      value.value.match(/\{primitives\.color\.([^}]+)\}/)?.[1] || value.value
    return `  "${key}": "${prefix}-${colorName}"`
  })
  .join(",\n")}
};`)
  })

  // Combine all type definitions
  const finalTypeDefinitions = `// Generated TypeScript definitions
${typeDefinitions.join("\n\n")}

${tokenObjects.join("\n\n")}

// Create a single Tokens object to hold all token objects
const Tokens = {
  // Spacing tokens
  Margin,
  MarginLeft,
  MarginRight,
  MarginTop,
  MarginBottom,
  MarginX,
  MarginY,
  Padding,
  PaddingLeft,
  PaddingRight,
  PaddingTop,
  PaddingBottom,
  PaddingX,
  PaddingY,
  Gap,
  GapX,
  GapY,
  // Size tokens
  Width,
  MaxWidth,
  MinWidth,
  Height,
  MaxHeight,
  MinHeight,
  // Color tokens
  Background,
  BackgroundHover,
  BackgroundActive,
  Text,
  TextHover,
  TextActive,
  Border,
  BorderHover,
  BorderActive,
} as const;

export {
  Tokens,
  type SpacingKey,
  type BackgroundKey,
  type TextKey,
  type BorderKey,
  GapX,
  GapY,
};`

  return finalTypeDefinitions
}

// Write CSS file
fs.writeFileSync(path.join(__dirname, "../", "theme.css"), tokensCssTemplate)

// Write TypeScript definitions
fs.writeFileSync(
  path.join(__dirname, "../", "tokens.ts"),
  generateTypeDefinitions(),
)
