import { ArrowUpRight, MoveRight, SquareArrowOutUpRight } from "lucide-react"
import type { ComponentPropsWithoutRef, JSX } from "react"
import { cn } from "@/lib/utils"
import { Tokens } from "@/tokens"
import clsx from "clsx"

const { Text: TextColor, TextHover, TextActive, TextVisited } = Tokens

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
  console.log(TextColor.primary)

  return (
    <a
      href={link}
      target={external ? "_blank" : "_self"}
      // cn() aka twMerge mixes up text-clr and text-size classes & overrides theme
      className={clsx(
        TextColor.primary,
        TextHover.primary,
        TextActive.primary,
        TextVisited.primary,
        "flex w-fit items-center gap-2 underline transition-colors",
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
