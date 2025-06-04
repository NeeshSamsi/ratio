import type { JSX } from "react"
import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react"

export type Variants = "info" | "success" | "warning" | "critical"

export const VariantIconMap: Record<Variants, JSX.Element> = {
  info: <Info aria-hidden="true" className="aspect-square h-full w-full" />,
  success: (
    <CircleCheck aria-hidden="true" className="aspect-square size-full" />
  ),
  warning: (
    <CircleAlert aria-hidden="true" className="aspect-square size-full" />
  ),
  critical: (
    <TriangleAlert aria-hidden="true" className="aspect-square size-full" />
  ),
}
