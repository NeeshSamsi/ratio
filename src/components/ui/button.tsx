import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import clsx from "clsx"
import { Tokens } from "@/tokens"
import { LoaderCircle } from "lucide-react"
const { Background, BackgroundHover, BackgroundActive, Text } = Tokens

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-all disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-amber-200 focus-visible:ring-2 ring-offset-4 disabled:opacity-40 px-3 py-2",
  {
    variants: {
      variant: {
        primary: clsx(
          Background.primary,
          BackgroundHover.primary,
          BackgroundActive.primary,
          Text["foreground-inverse"],
        ),
        secondary: clsx(
          Background["surface-1-inverse"],
          BackgroundHover.primary,
          BackgroundActive.primary,
          Text["foreground-inverse"],
        ),
        destructive: clsx(
          Background.critical,
          BackgroundHover.critical,
          BackgroundActive.critical,
          Text.foreground,
        ),
        ghost: clsx(Background["surface-1"], BackgroundHover["surface-1"]),
      },
      // size: {

      // },
    },
    defaultVariants: {
      variant: "primary",
      // size: "sm",
    },
  },
)

type ButtonProps = {
  fullWidth?: boolean
  asChild?: boolean
  loading?: boolean
} & React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>

function Button({
  className,
  variant,
  // size,
  fullWidth = false,
  asChild = false,
  loading = false,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      disabled={loading}
      className={cn(
        buttonVariants({ variant, className }),
        `${fullWidth ? "w-full" : "w-fit"}`,
      )}
      {...props}
    >
      {loading ? (
        <LoaderCircle className="aspect-square size-4 animate-spin" />
      ) : (
        children
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
