import type { SpacingKey } from "../../tokens"

export type BoxElement =
  | "span"
  | "div"
  | "section"
  | "nav"
  | "main"
  | "article"
  | "aside"
  | "header"
  | "footer"
  | "figure"
  | "figcaption"
  | "ul"
  | "ol"
  | "li"

export type FlexDirectionKey = "row" | "row-reverse" | "col" | "col-reverse"
export type FlexWrapKey = "nowrap" | "wrap" | "wrap-reverse"
export type JustifyContentKey =
  | "start"
  | "end"
  | "center"
  | "between"
  | "around"
  | "evenly"
export type AlignItemsKey = "start" | "end" | "center" | "baseline" | "stretch"

export const FlexDirection: Record<FlexDirectionKey, string> = {
  row: "flex-row",
  "row-reverse": "flex-row-reverse",
  col: "flex-col",
  "col-reverse": "flex-col-reverse",
}

export const FlexWrap: Record<FlexWrapKey, string> = {
  nowrap: "flex-nowrap",
  wrap: "flex-wrap",
  "wrap-reverse": "flex-wrap-reverse",
}

export const JustifyContent: Record<JustifyContentKey, string> = {
  start: "justify-start",
  end: "justify-end",
  center: "justify-center",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
}

export const AlignItems: Record<AlignItemsKey, string> = {
  start: "items-start",
  end: "items-end",
  center: "items-center",
  baseline: "items-baseline",
  stretch: "items-stretch",
}

export type Position = "relative" | "absolute" | "fixed" | "sticky" | "static"

export type NumberPercentage = `${number}%`

export type Width = SpacingKey | NumberPercentage
export type MinWidth = SpacingKey | NumberPercentage
export type MaxWidth = SpacingKey | NumberPercentage

export type Height = SpacingKey | NumberPercentage
export type MinHeight = SpacingKey | NumberPercentage
export type MaxHeight = SpacingKey | NumberPercentage
