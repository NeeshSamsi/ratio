import { useEffect, type PropsWithChildren } from "react"
import type { BackgroundKey } from "@/tokens"
import type { HeadingProps } from "../Heading/heading"
import Box from "../Box"
import Heading from "../Heading"
import Stack from "../Stack"
import { CardProvider, useCardContext } from "./card-context"

type CardProps = {
  background: Extract<BackgroundKey, "surface-2" | "surface-3">
  orientation?: "horizontal" | "vertical"
} & PropsWithChildren

export function CardNode({ background, orientation, children }: CardProps) {
  const { image, title, content } = useCardContext()

  return (
    <Box
      background={background}
      className="overflow-hidden rounded-md"
      display="flex"
      flexDirection={orientation === "vertical" ? "col" : "row"}
    >
      {image}
      <Box padding="10">
        <Stack orientation="vertical" gap="4">
          {title}
          {content}
          {children}
        </Stack>
      </Box>
    </Box>
  )
}

type CardImageProps = {
  src: string
  alt: string
}

export function CardImage({ src, alt }: CardImageProps) {
  const { setImage } = useCardContext()
  useEffect(() => {
    setImage(
      <img
        src={src}
        alt={alt}
        // Somehow set aspect-ratio
        className={`object-cover`}
        // ${orientation === "horizontal" ? "w-2/5" : "w-full"}
      />,
    )
  }, [setImage, src, alt])

  return null
}

export function CardTitle({
  children,
  ...props
}: Omit<HeadingProps, "marginBottom">) {
  const { setTitle } = useCardContext()
  useEffect(() => {
    setTitle(
      <Heading marginBottom="0" {...props}>
        {children}
      </Heading>,
    )
  }, [children, props, setTitle])

  return null
}

export function CardContent({ children }: PropsWithChildren) {
  const { setContent } = useCardContext()
  useEffect(() => {
    setContent(children)
  }, [children, setContent])

  return null
}

export function Card(props: CardProps) {
  return (
    <CardProvider>
      <CardNode {...props}></CardNode>
    </CardProvider>
  )
}
