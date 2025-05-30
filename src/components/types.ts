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

parseSpacing(rawDesignTokens.spacing)

export {
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
  type SpacingKey,
}
