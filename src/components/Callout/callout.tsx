import type { JSX, PropsWithChildren } from "react"
import { cva } from "cva"
import Box from "../Box"
import { Tokens, type BackgroundKey } from "../../tokens"
import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react"
import { cn } from "../../lib/utils"
import Paragraph from "../Paragraph"

const { Text: TextColor, Background, Border } = Tokens

type Variants = "info" | "success" | "warning" | "critical"

type CalloutProps = PropsWithChildren & {
  variant: Variants
  title: string
}

const ContentBgMap: Record<Variants, BackgroundKey> = {
  info: "secondary-weak",
  success: "success-secondary-weak",
  warning: "warning-secondary-weak",
  critical: "critical-secondary-weak",
}

const IconMap: Record<Variants, JSX.Element> = {
  info: <Info />,
  success: <CircleCheck />,
  warning: <CircleAlert />,
  critical: <TriangleAlert />,
}

const callout = cva({
  base: ``,
  variants: {
    variant: {
      info: `${Background.secondary} ${TextColor.foreground} ${Border["secondary-weak"]}`,
      success: `${Background["success-secondary"]} ${TextColor["success-inverse"]} ${Border["success-inverse"]}`,
      warning: `${Background["warning-secondary"]} ${TextColor["warning-inverse"]} ${Border["primary-inverse"]}`,
      critical: `${Background["critical-secondary"]} ${TextColor["critical-inverse"]} ${Border["critical-inverse"]}`,
    },
  },
})

export default function Callout({ variant, title, children }: CalloutProps) {
  return (
    <Box
      className={cn(`overflow-hidden rounded-md border`, callout({ variant }))}
    >
      <Box padding="4" display="flex" gap="4">
        {IconMap[variant]}
        <Paragraph size="md" marginBottom="0">
          {title}
        </Paragraph>
      </Box>
      <Box padding="4" background={ContentBgMap[variant]}>
        {children}
      </Box>
    </Box>
  )
}
