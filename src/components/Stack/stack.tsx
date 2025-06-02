import type { SpacingKey } from "../../tokens"
import Box from "../Box"
import type { BoxElement } from "../Box/box-tokens"

type StackProps = {
  as?: BoxElement
  orientation: "horizontal" | "vertical"
  gap?: SpacingKey
  children: React.ReactNode
}

export default function Stack({ as, orientation, gap, children }: StackProps) {
  const flexDirection = orientation === "horizontal" ? "row" : "col"

  return (
    <Box as={as} display="flex" flexDirection={flexDirection} gap={gap}>
      {children}
    </Box>
  )
}
