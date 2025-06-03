import type { ComponentPropsWithoutRef, ReactElement } from "react"
import type { SpacingKey, TextKey, BackgroundKey } from "@/tokens"
import Box from "@/components/Box"

type ListElement = "ul" | "ol"

type ListProps = Omit<ComponentPropsWithoutRef<ListElement>, "style"> & {
  type: ListElement
  styleType: OrderedListVariant | UnorderedListVariant
  children: ReactElement<typeof ListItem> | ReactElement<typeof ListItem>[]
  marginBottom?: SpacingKey
  indent?: SpacingKey
  color?: TextKey
  background?: BackgroundKey
}

type OrderedListVariant = "decimal" | "lower-alpha" | "lower-roman"

type UnorderedListVariant = "disc" | "square" | "check"

const ListStyleType = {
  decimal: "list-decimal",
  "lower-alpha": "list-[lower-alpha]",
  "lower-roman": "list-[lower-roman]",
  disc: "list-disc",
  square: "list-[square]",
  check: "list-['✓_']",
}

function List({
  type,
  indent = "10",
  marginBottom = "4",
  styleType,
  children,
  ...restProps
}: ListProps) {
  return (
    <Box
      as={type}
      {...restProps}
      marginBottom={marginBottom}
      marginLeft={indent}
      display="flex"
      flexDirection="col"
      gap="2"
      className={ListStyleType[styleType]}
    >
      {children}
    </Box>
  )
}

type OrderedListProps = Omit<ListProps, "type" | "styleType"> & {
  variant?: OrderedListVariant
}

export function OrderedList({
  variant = "decimal",
  ...props
}: OrderedListProps) {
  return <List type="ol" styleType={variant} {...props} />
}

type UnorderedListProps = Omit<ListProps, "type" | "styleType"> & {
  variant?: UnorderedListVariant
}

export function UnorderedList({
  variant = "disc",
  ...props
}: UnorderedListProps) {
  return <List type="ul" styleType={variant} {...props} />
}

type ListItemProps = Omit<ComponentPropsWithoutRef<"li">, "style"> & {
  color?: TextKey
  background?: BackgroundKey
}

export function ListItem(props: ListItemProps) {
  const { className, children, color, background, ...rest } = props
  return (
    <Box
      as="li"
      className={className}
      color={color}
      background={background}
      {...rest}
    >
      {children}
    </Box>
  )
}
