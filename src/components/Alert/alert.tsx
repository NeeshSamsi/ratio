import { cva } from "cva"
import { VariantIconMap, type Variants } from "../types"
import { useState, type PropsWithChildren } from "react"
import { Tokens } from "@/tokens"
import Box from "../Box"
import { X } from "lucide-react"
import { Button } from "../ui/button"

const { Background, Text, Border } = Tokens

type AlertProps = {
  variant: Variants
  dismissible?: boolean
  actionLabel?: string
  onAction?: () => void
} & PropsWithChildren

const alert = cva({
  base: `rounded-md border`,
  variants: {
    variant: {
      info: `${Background.informational} ${Text.foreground} ${Border["informational-weak"]}`,
      success: `${Background["success-secondary"]} ${Text["success-inverse"]} ${Border["success-inverse"]}`,
      warning: `${Background["warning-secondary"]} ${Text["warning-inverse"]} ${Border["primary-inverse"]}`,
      critical: `${Background["critical-secondary"]} ${Text["critical-inverse"]} ${Border["critical-inverse"]}`,
    },
  },
})

export default function Alert({
  variant,
  children,
  actionLabel,
  onAction,
}: AlertProps) {
  const [show, setShow] = useState(true)

  if (!show) return null

  return (
    <Box
      padding="4"
      display="flex"
      alignItems="start"
      gap="4"
      className={alert({ variant })}
      role="alert"
    >
      <Box width="8">{VariantIconMap[variant]}</Box>
      <div className="flex-auto">{children}</div>
      <Box display="flex" alignItems="center" gap="3">
        {actionLabel && onAction && (
          <Button variant="secondary" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
        <button aria-label="Dismiss alert" onClick={() => setShow(false)}>
          <Box width="6">
            <X className="aspect-square h-full w-full" />
          </Box>
        </button>
      </Box>
    </Box>
  )
}
