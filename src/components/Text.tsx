import type { ComponentPropsWithoutRef, ElementType, ReactElement } from "react"
import { cn } from "../lib/utils"

// type TextAs = "span" | "p" | "label" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

type TextProps<T extends ElementType> = {
  as?: T
} & Omit<ComponentPropsWithoutRef<T>, "style">

export default function Text<T extends ElementType = "span">({
  as,
  children,
  className,
  ...restProps
}: TextProps<T>): ReactElement {
  const Tag = as || "span"

  return (
    <Tag className={cn("", className)} {...restProps}>
      {children}
    </Tag>
  )
}
