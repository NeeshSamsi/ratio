import { ArrowUpRight, MoveRight, SquareArrowOutUpRight } from "lucide-react"
import type { ComponentPropsWithoutRef, JSX } from "react"
import { cn } from "@/lib/utils"
import { Tokens } from "@/tokens"

const { Text: TextColor, TextHover } = Tokens

type Icons = "arrow-right" | "arrow-top-right"

type AnchorProps = Omit<
  ComponentPropsWithoutRef<"a"> & {
    size: "base" | "md" | "lg"
    label: string
    link: string
    external?: boolean
    icon?: Icons
    leadingIcon?: boolean
    className?: string
  },
  "style"
>

const IconMap: Record<Icons, JSX.Element> = {
  "arrow-right": <MoveRight className="aspect-square size-full" />,
  "arrow-top-right": <ArrowUpRight className="aspect-square size-full" />,
}

export default function Anchor({
  size,
  label,
  link,
  icon,
  external,
  leadingIcon,
}: AnchorProps) {
  return (
    <a
      href={link}
      className={cn(
        "flex w-fit items-center gap-2 underline transition-colors",
        TextColor.foreground,
        TextHover["primary-hover"],
        {
          "text-size-30": size === "base",
          "text-size-40": size === "md",
          "text-size-50": size === "lg",
        },
        { "flex-row-reverse": leadingIcon },
      )}
    >
      <span>{label}</span>

      <div
        className={cn({
          "size-4": size === "base" || size === "md",
          "size-4.5": size === "lg",
        })}
        // Lucide says to hide decorational icons
        aria-hidden="true"
      >
        {icon && IconMap[icon]}
        {external && (
          <SquareArrowOutUpRight className="aspect-square size-full" />
        )}
      </div>
    </a>
  )
}
