import * as React from "react"

import { cn } from "@/lib/utils"
import { Tokens } from "@/tokens"
import clsx from "clsx"
const { Border, BorderHover } = Tokens

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 shadow-xs transition-all placeholder:text-stone-50/60 disabled:cursor-not-allowed disabled:opacity-50",
        clsx(Border.weak, BorderHover.primary),
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
