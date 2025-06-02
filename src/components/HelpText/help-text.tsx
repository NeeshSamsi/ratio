import type { PropsWithChildren } from "react"
import Box from "../Box"
import Text from "../Text"
import { IconMap, type Variants } from "../types"
import { Tokens } from "../../tokens"
import { cva } from "cva"

const { Text: TextColor } = Tokens

const helpText = cva({
  base: "text-size-10",
  variants: {
    variant: {
      info: TextColor.secondary,
      success: TextColor.success,
      critical: TextColor.critical,
    },
  },
})

type HelpTextProps = PropsWithChildren & {
  variant: Exclude<Variants, "warning">
}

export default function HelpText({ variant, children }: HelpTextProps) {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap="2"
      className={helpText({ variant })}
    >
      {IconMap[variant]}
      <Text as="p">{children}</Text>
    </Box>
  )
}
