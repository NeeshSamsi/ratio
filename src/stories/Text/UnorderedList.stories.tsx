import type { ComponentProps } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { UnorderedList, ListItem } from "../../components/List"
import { Tokens } from "../../tokens"

type StoryProps = ComponentProps<typeof UnorderedList>

export default {
  component: UnorderedList,
  title: "Text/UnorderedList",
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["disc", "square", "check"],
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
  tags: ["autodocs"],
} satisfies Meta<StoryProps>

type Story = StoryObj<StoryProps>

export const Default: Story = {
  render: (props) => (
    <UnorderedList {...props}>
      <ListItem>Rule of thirds</ListItem>
      <ListItem>Leading lines</ListItem>
      <ListItem>Foreground interest</ListItem>
      <ListItem>Selective focus</ListItem>
      <ListItem>Frame within a frame</ListItem>
    </UnorderedList>
  ),
  args: {
    variant: "disc",
    indent: "4",
    marginBottom: "4",
  },
}
