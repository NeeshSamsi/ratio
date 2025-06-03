import type { ComponentPropsWithoutRef } from "react"
import { cn } from "@/lib/utils"
import { cva } from "cva"
import Text from "@/components/Text"
import { type SpacingKey, Tokens } from "@/tokens"

type HeadingProps = Omit<
  ComponentPropsWithoutRef<"p"> & {
    size: "base" | "md" | "lg"
    marginBottom?: SpacingKey
    center?: boolean
    className?: string
  },
  "style"
>

const paragraph = cva({
  base: "",
  variants: {
    size: {
      base: `text-size-30 leading-normal font-regular ${Tokens.MarginBottom[4]}`,
      md: `text-size-40 leading-normal font-regular ${Tokens.MarginBottom[4]}`,
      lg: `text-size-50 leading-normal font-regular ${Tokens.MarginBottom[4]}`,
    },
  },
})

export default function Paragraph({
  size = "base",
  marginBottom,
  center = false,
  children,
  className,
  ...restProps
}: HeadingProps) {
  return (
    <Text
      as="p"
      className={cn(
        paragraph({ size }),
        center && "text-center",
        marginBottom && Tokens.MarginBottom[marginBottom],
        className,
      )}
      {...restProps}
    >
      {children}
    </Text>
  )
}
