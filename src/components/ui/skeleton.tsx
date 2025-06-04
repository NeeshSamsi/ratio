import { cn } from "@/lib/utils"
import { Tokens } from "@/tokens"
const { Background } = Tokens

type SkeletonProps = {
  width?: string
  height?: string
} & React.ComponentProps<"div">

function Skeleton({
  width = "100%",
  height = "1.2em",
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse rounded-md",
        Background["surface-3"],
        className,
      )}
      style={{ width, height }}
      {...props}
    />
  )
}

export { Skeleton }
