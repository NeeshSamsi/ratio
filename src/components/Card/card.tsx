import type { PropsWithChildren } from "react"
import type { BackgroundKey } from "@/tokens"
import type { HeadingProps } from "../Heading/heading"
import Box from "../Box"
import Heading from "../Heading"
import Stack from "../Stack"

type CardProps = {
  background: Extract<BackgroundKey, "surface-2" | "surface-3">
  image?: {
    src: string
    alt: string
  }
  orientation?: "horizontal" | "vertical"
} & PropsWithChildren

export function Card({ background, image, orientation, children }: CardProps) {
  return (
    <Box
      background={background}
      className="overflow-hidden rounded-md"
      display="flex"
      flexDirection={orientation === "vertical" ? "col" : "row"}
    >
      {image && (
        <img
          src={image.src}
          alt={image.alt}
          // Somehow set aspect-ratio
          className={`object-cover ${orientation === "horizontal" ? "w-2/5" : "w-full"}`}
        />
      )}
      <Box padding="10">
        <Stack orientation="vertical" gap="4">
          {children}
        </Stack>
      </Box>
    </Box>
  )
}

export function CardTitle(props: Omit<HeadingProps, "marginBottom">) {
  return <Heading marginBottom="0" {...props} />
}

export function CardContent({ children }: PropsWithChildren) {
  return children
}
