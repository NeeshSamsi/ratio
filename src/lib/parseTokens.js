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

  // Generate BackgroundKey type and its variants
  const baseBackgroundKeys = sortKeys(
    Object.keys(rawDesignTokens.background).filter(
      (key) =>
        !key.endsWith("-hover") &&
        !key.endsWith("-active") &&
        !key.endsWith("-disabled"),
    ),
  )
    .map((key) => `"${key}"`)
    .join(" | ")
  typeDefinitions.push(`type BackgroundKey = ${baseBackgroundKeys};`)

  const backgroundHoverKeys = sortKeys(
    Object.keys(rawDesignTokens.background)
      .filter((key) => key.endsWith("-hover"))
      .map((key) => key.replace(/-hover$/, "")),
  )
    .map((key) => `"${key}"`)
    .join(" | ")
  typeDefinitions.push(`type BackgroundHoverKey = ${backgroundHoverKeys};`)

  const backgroundActiveKeys = sortKeys(
    Object.keys(rawDesignTokens.background)
      .filter((key) => key.endsWith("-active"))
      .map((key) => key.replace(/-active$/, "")),
  )
    .map((key) => `"${key}"`)
    .join(" | ")
  typeDefinitions.push(`type BackgroundActiveKey = ${backgroundActiveKeys};`)

  // Generate TextKey type
  const baseTextKeys = sortKeys(
    Object.keys(rawDesignTokens.text).filter(
      (key) =>
        !key.endsWith("-hover") &&
        !key.endsWith("-active") &&
        !key.endsWith("-disabled") &&
        !key.endsWith("-visited"),
    ),
  )
    .map((key) => `"${key}"`)
    .join(" | ")
  typeDefinitions.push(`type TextKey = ${baseTextKeys};`)

  // Generate state-specific text key types with stripped suffixes
  const hoverTextKeys = sortKeys(
    Object.keys(rawDesignTokens.text)
      .filter((key) => key.endsWith("-hover"))
      .map((key) => key.replace(/-hover$/, "")),
  )
    .map((key) => `"${key}"`)
    .join(" | ")
  typeDefinitions.push(`type TextHoverKey = ${hoverTextKeys};`)

  const activeTextKeys = sortKeys(
    Object.keys(rawDesignTokens.text)
      .filter((key) => key.endsWith("-active"))
      .map((key) => key.replace(/-active$/, "")),
  )
    .map((key) => `"${key}"`)
    .join(" | ")
  typeDefinitions.push(`type TextActiveKey = ${activeTextKeys};`)

  const visitedTextKeys = sortKeys(
    Object.keys(rawDesignTokens.text)
      .filter((key) => key.endsWith("-visited"))
      .map((key) => key.replace(/-visited$/, "")),
  )
    .map((key) => `"${key}"`)
    .join(" | ")
  typeDefinitions.push(`type TextVisitedKey = ${visitedTextKeys};`)

  // Generate BorderKey type and its variants
  const baseBorderKeys = sortKeys(
    Object.keys(rawDesignTokens.border).filter(
      (key) => !key.endsWith("-hover") && !key.endsWith("-active"),
    ),
  )
    .map((key) => `"${key}"`)
    .join(" | ")
  typeDefinitions.push(`type BorderKey = ${baseBorderKeys};`)

  const borderHoverKeys = sortKeys(
    Object.keys(rawDesignTokens.border)
      .filter((key) => key.endsWith("-hover"))
      .map((key) => key.replace(/-hover$/, "")),
  )
    .map((key) => `"${key}"`)
    .join(" | ")
  typeDefinitions.push(`type BorderHoverKey = ${borderHoverKeys};`)

  const borderActiveKeys = sortKeys(
    Object.keys(rawDesignTokens.border)
      .filter((key) => key.endsWith("-active"))
      .map((key) => key.replace(/-active$/, "")),
  )
    .map((key) => `"${key}"`)
    .join(" | ")
  typeDefinitions.push(`type BorderActiveKey = ${borderActiveKeys};`)

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
    Background: { prefix: "bg", type: "BackgroundKey" },
    BackgroundHover: { prefix: "hover:bg", type: "BackgroundHoverKey" },
    BackgroundActive: { prefix: "active:bg", type: "BackgroundActiveKey" },
    BackgroundFocus: { prefix: "focus:bg", type: "BackgroundKey" },
  }

  Object.entries(backgroundObjects).forEach(([objName, { prefix, type }]) => {
    tokenObjects.push(`const ${objName}: Record<${type}, string> = {
${sortKeys(Object.entries(rawDesignTokens.background))
  .filter(([key]) => {
    if (objName === "Background" || objName === "BackgroundFocus") {
      return (
        !key.endsWith("-hover") &&
        !key.endsWith("-active") &&
        !key.endsWith("-disabled")
      )
    }
    if (objName === "BackgroundHover") return key.endsWith("-hover")
    if (objName === "BackgroundActive") return key.endsWith("-active")
    return false
  })
  .map(([key, value]) => {
    const colorName =
      value.value.match(/\{primitives\.color\.([^}]+)\}/)?.[1] || value.value
    // Strip the state suffix from the key
    const cleanKey = key
      .replace(/-hover$/, "")
      .replace(/-active$/, "")
      .replace(/-disabled$/, "")
    return `  "${cleanKey}": "${prefix}-${colorName}"`
  })
  .join(",\n")}
};`)
  })

  // Generate text objects
  const textObjects = {
    Text: { prefix: "text", type: "TextKey" },
    TextHover: { prefix: "hover:text", type: "TextHoverKey" },
    TextActive: { prefix: "active:text", type: "TextActiveKey" },
    TextFocus: { prefix: "focus:text", type: "TextKey" },
    TextVisited: { prefix: "visited:text", type: "TextVisitedKey" },
  }

  Object.entries(textObjects).forEach(([objName, { prefix, type }]) => {
    tokenObjects.push(`const ${objName}: Record<${type}, string> = {
${sortKeys(Object.entries(rawDesignTokens.text))
  .filter(([key]) => {
    if (objName === "Text" || objName === "TextFocus") {
      return (
        !key.endsWith("-hover") &&
        !key.endsWith("-active") &&
        !key.endsWith("-disabled") &&
        !key.endsWith("-visited")
      )
    }
    if (objName === "TextHover") return key.endsWith("-hover")
    if (objName === "TextActive") return key.endsWith("-active")
    if (objName === "TextVisited") return key.endsWith("-visited")
    return false
  })
  .map(([key, value]) => {
    const colorName =
      value.value.match(/\{primitives\.color\.([^}]+)\}/)?.[1] || value.value
    // Strip the state suffix from the key
    const cleanKey = key
      .replace(/-hover$/, "")
      .replace(/-active$/, "")
      .replace(/-disabled$/, "")
      .replace(/-visited$/, "")
    return `  "${cleanKey}": "${prefix}-${colorName}"`
  })
  .join(",\n")}
};`)
  })

  // Generate border objects
  const borderObjects = {
    Border: { prefix: "border", type: "BorderKey" },
    BorderHover: { prefix: "hover:border", type: "BorderHoverKey" },
    BorderActive: { prefix: "active:border", type: "BorderActiveKey" },
  }

  Object.entries(borderObjects).forEach(([objName, { prefix, type }]) => {
    tokenObjects.push(`const ${objName}: Record<${type}, string> = {
${sortKeys(Object.entries(rawDesignTokens.border))
  .filter(([key]) => {
    if (objName === "Border") {
      return !key.endsWith("-hover") && !key.endsWith("-active")
    }
    if (objName === "BorderHover") return key.endsWith("-hover")
    if (objName === "BorderActive") return key.endsWith("-active")
    return false
  })
  .map(([key, value]) => {
    const colorName =
      value.value.match(/\{primitives\.color\.([^}]+)\}/)?.[1] || value.value
    // Strip the state suffix from the key
    const cleanKey = key.replace(/-hover$/, "").replace(/-active$/, "")
    return `  "${cleanKey}": "${prefix}-${colorName}"`
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
  BackgroundFocus,
  Text,
  TextHover,
  TextActive,
  TextFocus,
  TextVisited,
  Border,
  BorderHover,
  BorderActive,
} as const;

export {
  Tokens,
  type SpacingKey,
  type BackgroundKey,
  type BackgroundHoverKey,
  type BackgroundActiveKey,
  type TextKey,
  type TextHoverKey,
  type TextActiveKey,
  type TextVisitedKey,
  type BorderKey,
  type BorderHoverKey,
  type BorderActiveKey,
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
