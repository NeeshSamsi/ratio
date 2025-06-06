import type { ComponentProps } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { OrderedList, ListItem } from "@/components/List"
import { Tokens } from "@/tokens"

type StoryProps = ComponentProps<typeof OrderedList>

export default {
  component: OrderedList,
  title: "Text/OrderedList",
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["decimal", "lower-alpha", "lower-roman"],
    },
    indent: {
      control: {
        type: "select",
      },
      options: Object.keys(Tokens.MarginLeft),
    },
    marginBottom: {
      control: {
        type: "select",
      },
      options: Object.keys(Tokens.MarginBottom),
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Lists offer a clean, scannable way to present grouped content. Whether ordered or unordered, they improve comprehension by adding rhythm and structure to dense information.

![Dos and Donts](/images/docs/List.png)
`,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<StoryProps>

type Story = StoryObj<StoryProps>

export const Default: Story = {
  render: (props) => (
    <OrderedList {...props}>
      <ListItem>Rule of thirds</ListItem>
      <ListItem>Leading lines</ListItem>
      <ListItem>Foreground interest</ListItem>
      <ListItem>Selective focus</ListItem>
      <ListItem>Frame within a frame</ListItem>
    </OrderedList>
  ),
  args: {
    variant: "decimal",
    indent: "4",
    marginBottom: "4",
  },
}
