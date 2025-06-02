import type { JSX } from "react"
import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react"

export type Variants = "info" | "success" | "warning" | "critical"

export const IconMap: Record<Variants, JSX.Element> = {
  info: <Info />,
  success: <CircleCheck />,
  warning: <CircleAlert />,
  critical: <TriangleAlert />,
}
