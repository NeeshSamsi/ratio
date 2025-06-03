import type { JSX } from "react"
import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react"

export type Variants = "info" | "success" | "warning" | "critical"

export const IconMap: Record<Variants, JSX.Element> = {
  info: <Info className="aspect-square h-full w-full" />,
  success: <CircleCheck className="aspect-square h-full w-full" />,
  warning: <CircleAlert className="aspect-square h-full w-full" />,
  critical: <TriangleAlert className="aspect-square h-full w-full" />,
}
