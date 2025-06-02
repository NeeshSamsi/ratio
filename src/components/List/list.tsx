import type { ComponentPropsWithoutRef, ReactElement } from "react"
import type { SpacingKey } from "../../tokens"
import Box from "../Box"

type ListElement = "ul" | "ol"

type ListProps = ComponentPropsWithoutRef<ListElement> & {
  type: ListElement
  styleType: OrderedListVariant | UnorderedListVariant
  children: ReactElement<typeof ListItem> | ReactElement<typeof ListItem>[]
  marginBottom?: SpacingKey
  indent?: SpacingKey
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

export function ListItem(props: ComponentPropsWithoutRef<"li">) {
  return <Box as="li" {...props} />
}
