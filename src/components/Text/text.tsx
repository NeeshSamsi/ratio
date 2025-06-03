import type { ComponentPropsWithoutRef, ElementType, ReactElement } from "react"
import { type SpacingKey, Tokens } from "@/tokens"
import { cn } from "@/lib/utils"

const {
  Margin,
  MarginLeft,
  MarginTop,
  MarginRight,
  MarginBottom,
  MarginX,
  MarginY,
} = Tokens

export type TextElement =
  | "span"
  | "p"
  | "label"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"

type MarginProps = {
  margin?: SpacingKey
  marginLeft?: SpacingKey
  marginTop?: SpacingKey
  marginRight?: SpacingKey
  marginBottom?: SpacingKey
  marginX?: SpacingKey
  marginY?: SpacingKey
}

type TextProps<T extends ElementType> = {
  as?: T extends TextElement ? T : never
} & MarginProps &
  Omit<ComponentPropsWithoutRef<T>, "style">

export default function Text<T extends ElementType = "span">({
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
}: TextProps<T>): ReactElement {
  const Tag = as || "span"

  return (
    <Tag
      className={cn(
        "",
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
