import type { PropsWithChildren } from "react"
import { cn } from "../lib/utils"
import { Tokens } from "./types"

export default function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <div
      className={cn(
        "text-sans",
        Tokens.Background["surface-1"],
        Tokens.Text.foreground,
      )}
    >
      {children}
    </div>
  )
}
