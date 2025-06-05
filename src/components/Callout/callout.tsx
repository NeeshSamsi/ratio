import type { PropsWithChildren } from "react"
import { cn } from "@/lib/utils"
import { cva } from "cva"
import { VariantIconMap, type Variants } from "@/components/types"
import { Tokens, type BackgroundKey, type TextKey } from "@/tokens"
import Box from "@/components//Box"
import Paragraph from "@/components//Paragraph"

const { Text: TextColor, Background, Border } = Tokens

type CalloutProps = PropsWithChildren & {
  variant: Variants
  title: string
}

const ContentBgMap: Record<Variants, BackgroundKey> = {
  info: "informational-weak",
  success: "success-secondary-weak",
  warning: "warning-secondary",
  critical: "critical-secondary-weak",
}

const ContentTextMap: Record<Variants, TextKey> = {
  info: "text-informational",
  success: "success-inverse",
  warning: "warning-inverse",
  critical: "critical-inverse",
}

const callout = cva({
  base: ``,
  variants: {
    variant: {
      info: `${Background.informational} ${TextColor.foreground} ${Border["informational-weak"]}`,
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
      <Box padding="4" display="flex" alignItems="center" gap="4">
        <Box width="6">{VariantIconMap[variant]}</Box>
        <Paragraph size="md" marginBottom="0">
          {title}
        </Paragraph>
      </Box>
      {children && (
        <Box
          padding="4"
          background={ContentBgMap[variant]}
          className={ContentTextMap[variant]}
        >
          {children}
        </Box>
      )}
    </Box>
  )
}
