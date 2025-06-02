import type { ComponentPropsWithoutRef, ElementType, ReactElement } from "react"
import { cn } from "../../lib/utils"
import { Tokens, type SpacingKey } from "../../tokens"
import type {
  BoxElement,
  FlexDirectionKey,
  FlexWrapKey,
  JustifyContentKey,
  AlignItemsKey,
  Position,
  Width,
  MinWidth,
  MaxWidth,
  Height,
  MinHeight,
  MaxHeight,
} from "./box-tokens"
import {
  FlexDirection,
  FlexWrap,
  JustifyContent,
  AlignItems,
} from "./box-tokens"

const {
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
  GapX,
  GapY,
} = Tokens

type MarginProps = {
  margin?: SpacingKey
  marginLeft?: SpacingKey
  marginTop?: SpacingKey
  marginRight?: SpacingKey
  marginBottom?: SpacingKey
  marginX?: SpacingKey
  marginY?: SpacingKey
}

type PaddingProps = {
  padding?: SpacingKey
  paddingLeft?: SpacingKey
  paddingTop?: SpacingKey
  paddingRight?: SpacingKey
  paddingBottom?: SpacingKey
  paddingX?: SpacingKey
  paddingY?: SpacingKey
}

type DisplayProps = {
  display: "none" | "block" | "inline-block" | "flex"
  flexDirection?: FlexDirectionKey
  flexWrap?: FlexWrapKey
  justifyContent?: JustifyContentKey
  alignItems?: AlignItemsKey
  gap?: SpacingKey
  gapX?: SpacingKey
  gapY?: SpacingKey
}

type PositionProps = {
  position?: Position
  width?: Width
  minWidth?: MinWidth
  maxWidth?: MaxWidth
  height?: Height
  minHeight?: MinHeight
  maxHeight?: MaxHeight
}

type BoxProps<T extends ElementType> = {
  as?: T extends BoxElement ? T : never
} & MarginProps &
  PaddingProps &
  DisplayProps &
  PositionProps &
  Omit<ComponentPropsWithoutRef<T>, "style">

export default function Box<T extends ElementType = "div">({
  as,
  children,
  display = "block",
  margin,
  marginLeft,
  marginTop,
  marginRight,
  marginBottom,
  marginX,
  marginY,
  padding,
  paddingLeft,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingX,
  paddingY,
  flexDirection,
  flexWrap,
  justifyContent,
  alignItems,
  gap,
  gapX,
  gapY,
  position,
  width,
  minWidth,
  maxWidth,
  height,
  minHeight,
  maxHeight,
  className,
  ...restProps
}: BoxProps<T>): ReactElement {
  const Tag = as || "div"

  const getDimensionClass = (
    value:
      | Width
      | Height
      | MinWidth
      | MaxWidth
      | MinHeight
      | MaxHeight
      | undefined,
    prefix: string,
  ) => {
    if (!value) return undefined
    if (typeof value === "string" && value.includes("%")) {
      return `${prefix}-[${value}]`
    }
    return `${prefix}-${value}`
  }

  return (
    <Tag
      className={cn(
        display,
        margin && Margin[margin],
        marginX && MarginX[marginX],
        marginY && MarginY[marginY],
        marginLeft && MarginLeft[marginLeft],
        marginTop && MarginTop[marginTop],
        marginRight && MarginRight[marginRight],
        marginBottom && MarginBottom[marginBottom],
        padding && Padding[padding],
        paddingX && PaddingX[paddingX],
        paddingY && PaddingY[paddingY],
        paddingLeft && PaddingLeft[paddingLeft],
        paddingTop && PaddingTop[paddingTop],
        paddingRight && PaddingRight[paddingRight],
        paddingBottom && PaddingBottom[paddingBottom],
        flexDirection && FlexDirection[flexDirection],
        flexWrap && FlexWrap[flexWrap],
        justifyContent && JustifyContent[justifyContent],
        alignItems && AlignItems[alignItems],
        gap && Gap[gap],
        gapX && GapX[gapX],
        gapY && GapY[gapY],
        position,
        getDimensionClass(width, "w"),
        getDimensionClass(minWidth, "min-w"),
        getDimensionClass(maxWidth, "max-w"),
        getDimensionClass(height, "h"),
        getDimensionClass(minHeight, "min-h"),
        getDimensionClass(maxHeight, "max-h"),
        className,
      )}
      {...restProps}
    >
      {children}
    </Tag>
  )
}
