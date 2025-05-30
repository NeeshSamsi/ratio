import tokens from "../../design-tokens.tokens.json" with { type: "json" }

const { "design-tokens": rawDesignTokens } = tokens

// Generate SpacingKey type from the JSON file
type SpacingKey = {
  [K in keyof typeof rawDesignTokens.spacing]: K extends `space-${infer N}`
    ? N extends "px"
      ? "px"
      : N extends "0-5"
        ? "0.5"
        : N
    : never
}[keyof typeof rawDesignTokens.spacing]

// Helper function to extract primitive color name from token value
function getPrimitiveColorName(value: string): string {
  const match = value.match(/\{primitives\.color\.([^}]+)\}/)
  return match ? match[1] : value
}

// Generate types for semantic tokens
type BackgroundKey = keyof typeof rawDesignTokens.background
type TextKey = keyof typeof rawDesignTokens.text
type BorderKey = keyof typeof rawDesignTokens.border

// Background objects
const Background: Record<BackgroundKey, string> = {} as Record<
  BackgroundKey,
  string
>
const BackgroundHover: Record<BackgroundKey, string> = {} as Record<
  BackgroundKey,
  string
>
const BackgroundActive: Record<BackgroundKey, string> = {} as Record<
  BackgroundKey,
  string
>

// Text objects
const Text: Record<TextKey, string> = {} as Record<TextKey, string>
const TextHover: Record<TextKey, string> = {} as Record<TextKey, string>
const TextActive: Record<TextKey, string> = {} as Record<TextKey, string>

// Border objects
const Border: Record<BorderKey, string> = {} as Record<BorderKey, string>
const BorderHover: Record<BorderKey, string> = {} as Record<BorderKey, string>
const BorderActive: Record<BorderKey, string> = {} as Record<BorderKey, string>

// Margin objects
const Margin: Record<SpacingKey, string> = {} as Record<SpacingKey, string>
const MarginLeft: Record<SpacingKey, string> = {} as Record<SpacingKey, string>
const MarginTop: Record<SpacingKey, string> = {} as Record<SpacingKey, string>
const MarginRight: Record<SpacingKey, string> = {} as Record<SpacingKey, string>
const MarginBottom: Record<SpacingKey, string> = {} as Record<
  SpacingKey,
  string
>
const MarginX: Record<SpacingKey, string> = {} as Record<SpacingKey, string>
const MarginY: Record<SpacingKey, string> = {} as Record<SpacingKey, string>

// Padding objects
const Padding: Record<SpacingKey, string> = {} as Record<SpacingKey, string>
const PaddingLeft: Record<SpacingKey, string> = {} as Record<SpacingKey, string>
const PaddingTop: Record<SpacingKey, string> = {} as Record<SpacingKey, string>
const PaddingRight: Record<SpacingKey, string> = {} as Record<
  SpacingKey,
  string
>
const PaddingBottom: Record<SpacingKey, string> = {} as Record<
  SpacingKey,
  string
>
const PaddingX: Record<SpacingKey, string> = {} as Record<SpacingKey, string>
const PaddingY: Record<SpacingKey, string> = {} as Record<SpacingKey, string>

// Gap object
const Gap: Record<SpacingKey, string> = {} as Record<SpacingKey, string>

function parseSpacing(spacings: Record<string, { value: number }>) {
  for (const space in spacings) {
    // Extract the number from space-{number} or handle special cases
    let key = space.replace("space-", "")
    if (key === "px") {
      key = "px"
    } else if (key === "0-5") {
      key = "0.5"
    } else {
      key = key.replace("space-", "")
    }

    // Create margin classes
    Margin[key as SpacingKey] = `m-${key}`
    MarginLeft[key as SpacingKey] = `ml-${key}`
    MarginTop[key as SpacingKey] = `mt-${key}`
    MarginRight[key as SpacingKey] = `mr-${key}`
    MarginBottom[key as SpacingKey] = `mb-${key}`
    MarginX[key as SpacingKey] = `mx-${key}`
    MarginY[key as SpacingKey] = `my-${key}`

    // Create padding classes
    Padding[key as SpacingKey] = `p-${key}`
    PaddingLeft[key as SpacingKey] = `pl-${key}`
    PaddingTop[key as SpacingKey] = `pt-${key}`
    PaddingRight[key as SpacingKey] = `pr-${key}`
    PaddingBottom[key as SpacingKey] = `pb-${key}`
    PaddingX[key as SpacingKey] = `px-${key}`
    PaddingY[key as SpacingKey] = `py-${key}`

    // Create gap classes
    Gap[key as SpacingKey] = `gap-${key}`
  }
}

function parseSemanticTokens() {
  // Parse background tokens
  for (const key in rawDesignTokens.background) {
    const value = rawDesignTokens.background[key as BackgroundKey].value
    const colorName = getPrimitiveColorName(value)
    Background[key as BackgroundKey] = `bg-${colorName}`

    // Handle hover & active variants if they exist
    if (key.endsWith("-hover")) {
      BackgroundHover[key.replace("-hover", "") as BackgroundKey] =
        `hover:bg-${colorName}`
    } else if (key.endsWith("-active")) {
      BackgroundActive[key.replace("-active", "") as BackgroundKey] =
        `active:bg-${colorName}`
    }
  }

  // Parse text tokens
  for (const key in rawDesignTokens.text) {
    const value = rawDesignTokens.text[key as TextKey].value
    const colorName = getPrimitiveColorName(value)
    Text[key as TextKey] = `text-${colorName}`

    // Handle hover & active variants if they exist
    if (key.endsWith("-hover")) {
      TextHover[key.replace("-hover", "") as TextKey] =
        `hover:text-${colorName}`
    } else if (key.endsWith("-active")) {
      TextActive[key.replace("-active", "") as TextKey] =
        `active:text-${colorName}`
    }
  }

  // Parse border tokens
  for (const key in rawDesignTokens.border) {
    const value = rawDesignTokens.border[key as BorderKey].value
    const colorName = getPrimitiveColorName(value)
    Border[key as BorderKey] = `border-${colorName}`

    // Handle hover & active variants if they exist
    if (key.endsWith("-hover")) {
      BorderHover[key.replace("-hover", "") as BorderKey] =
        `hover:border-${colorName}`
    } else if (key.endsWith("-active")) {
      BorderActive[key.replace("-active", "") as BorderKey] =
        `active:border-${colorName}`
    }
  }
}

parseSpacing(rawDesignTokens.spacing)
parseSemanticTokens()

// Create a single Tokens object to hold all token objects
const Tokens = {
  Margin,
  MarginLeft,
  MarginTop,
  MarginRight,
  MarginBottom,
  MarginX,
  MarginY,
  Padding,
  PaddingLeft,
  PaddingTop,
  PaddingRight,
  PaddingBottom,
  PaddingX,
  PaddingY,
  Gap,
  Background,
  BackgroundHover,
  BackgroundActive,
  Text,
  TextHover,
  TextActive,
  Border,
  BorderHover,
  BorderActive,
} as const

export {
  Tokens,
  type SpacingKey,
  type BackgroundKey,
  type TextKey,
  type BorderKey,
}
