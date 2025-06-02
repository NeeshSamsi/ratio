import type { ComponentProps } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import type { BoxElement } from "../../components/Box/box-tokens"
import Box from "../../components/Box"

const boxElements: BoxElement[] = [
  "span",
  "div",
  "section",
  "nav",
  "main",
  "article",
  "aside",
  "header",
  "footer",
  "figure",
  "figcaption",
  "ul",
  "ol",
  "li",
]

type StoryProps = ComponentProps<typeof Box>

export default {
  component: Box,
  title: "Primitives/Box",
  argTypes: {
    as: {
      control: {
        type: "select",
      },
      options: boxElements,
    },
    children: {
      control: {
        type: "text",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<StoryProps>

type Story = StoryObj<StoryProps>

export const Default: Story = {
  render: (props) => <Box {...props} />,
  args: {
    children: "Hello, World!",
    as: "div",
  },
}
