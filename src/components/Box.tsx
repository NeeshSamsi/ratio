import type { ComponentPropsWithoutRef, ElementType, ReactElement } from "react"
import { Tokens, type SpacingKey } from "./types"
import { cn } from "../lib/utils"

const {
  Margin,
  MarginLeft,
  MarginTop,
  MarginRight,
  MarginBottom,
  MarginX,
  MarginY,
} = Tokens

export type BoxElement =
  | "div"
  | "span"
  | "aside"
  | "nav"
  | "main"
  | "section"
  | "ul"
  | "ol"
  | "li"

type MarginProps = {
  margin?: SpacingKey
  marginLeft?: SpacingKey
  marginTop?: SpacingKey
  marginRight?: SpacingKey
  marginBottom?: SpacingKey
  marginX?: SpacingKey
  marginY?: SpacingKey
}

type BoxProps<T extends ElementType> = {
  as?: T extends BoxElement ? T : never
} & MarginProps &
  Omit<ComponentPropsWithoutRef<T>, "style">

export default function Box<T extends ElementType = "div">({
  as,
  children,
  margin,
  marginLeft,
  marginTop,
  marginRight,
  marginBottom,
  marginX,
  marginY,
  className,
  ...restProps
}: BoxProps<T>): ReactElement {
  const Tag = as || "div"

  return (
    <Tag
      className={cn(
        "",
        Tokens.Background["surface-1"],
        Tokens.Text.foreground,
        margin && Margin[margin],
        marginX && MarginX[marginX],
        marginY && MarginY[marginY],
        marginLeft && MarginLeft[marginLeft],
        marginTop && MarginTop[marginTop],
        marginRight && MarginRight[marginRight],
        marginBottom && MarginBottom[marginBottom],
        className,
      )}
      {...restProps}
    >
      {children}
    </Tag>
  )
}
