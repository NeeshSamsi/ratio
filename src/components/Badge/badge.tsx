import { cva } from "cva"
import type { ComponentPropsWithoutRef } from "react"
import { Tokens } from "@/tokens"
import clsx from "clsx"
const { Background, Text, Border } = Tokens

type BadgeProps = {
  variant:
    | "primary"
    | "surface-1"
    | "surface-2"
    | "surface-3"
    | "info"
    | "success"
    | "warning"
    | "critical"
  size: "base" | "lg"
  text: string
} & Omit<ComponentPropsWithoutRef<"a">, "style">

const badge = cva({
  base: "uppercase px-7 py-1 rounded-md w-fit",
  variants: {
    variant: {
      primary: clsx(Background.primary, Text["foreground-inverse"]),
      "surface-1": clsx(
        Background["surface-1"],
        Text.foreground,
        "border",
        Border.weak,
      ),
      "surface-2": clsx(
        Background["surface-2"],
        Text.foreground,
        "border",
        Border.weak,
      ),
      "surface-3": clsx(
        Background["surface-3"],
        Text.foreground,
        "border",
        Border.weak,
      ),
      info: clsx(Background.informational, Text.foreground),
      success: clsx(Background.success, Text.foreground),
      warning: clsx(Background.warning, Text.foreground),
      critical: clsx(Background.critical, Text.foreground),
    },
    size: {
      base: "text-size-30",
      lg: "text-size-50",
    },
  },
})

export default function Badge({ variant, size, text }: BadgeProps) {
  return <span className={badge({ variant, size })}>{text}</span>
}
