import * as React from "react"

import { cn } from "@/lib/utils"
import { Tokens } from "@/tokens"
import clsx from "clsx"
const { Border, BorderHover } = Tokens

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 shadow-xs transition-all placeholder:text-stone-50/60 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent",
        clsx(Border.weak, BorderHover.primary),
        // "selection:bg-primary selection:text-primary-foreground",
        // "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        // "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  )
}

export { Input }
