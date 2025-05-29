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

function parsePrimitiveColors(colors) {
  for (const color in colors) {
    designTokens.color[color] = colors[color].value
  }
}
parsePrimitiveColors(rawPrimitives.color)

const primitivesCssVars = Object.entries(designTokens.color).map(
  (token) => `\t--color-${token[0]}: ${token[1]};`,
)

function parseTextSizes(sizes) {
  for (const size in sizes) {
    if (!size.startsWith("weight")) {
      designTokens.textSizes[size] = `${sizes[size].value / 16}rem`
    }
  }
}
parseTextSizes(rawDesignTokens.font)

const textSizesVars = Object.entries(designTokens.textSizes).map(
  (token) => `\t--text-${token[0]}: ${token[1]};`,
)

function parseRadii(radii) {
  for (const radius in radii) {
    designTokens.radius[radius] = radii[radius].value
  }
}
parseRadii(rawDesignTokens.radius)

const radiusVars = Object.entries(designTokens.radius).map(
  (token) => `\t--radius-${token[0]}: ${token[1]};`,
)

const tokensTemplate = `
@theme {
\t--color-*: initial;
${primitivesCssVars.join("\n")}

\t--text-*: initial;
${textSizesVars.join("\n")}

\t--radius-*: initial;
${radiusVars.join("\n")}
}
`

fs.writeFileSync(path.join(__dirname, "../", "theme.css"), tokensTemplate)

// function parseSemanticColors

// console.log(tokensTemplate)
