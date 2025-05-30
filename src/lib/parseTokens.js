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
parseTokens(rawDesignTokens.radius, designTokens.radius)

// Generate CSS variables
const cssVars = {
  color: generateCssVars(designTokens.color, "color"),
  text: generateCssVars(designTokens.textSizes, "text"),
  radius: generateCssVars(designTokens.radius, "radius"),
}

const tokensTemplate = `
@theme {
\t--color-*: initial;
${cssVars.color.join("\n")}

\t--text-*: initial;
${cssVars.text.join("\n")}

\t--radius-*: initial;
${cssVars.radius.join("\n")}
}
`

fs.writeFileSync(path.join(__dirname, "../", "theme.css"), tokensTemplate)

// function parseSemanticColors

// console.log(tokensTemplate)
