import type { ComponentProps } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import type { BoxElement } from "@/components/Box/box-tokens"
import Stack from "@/components/Stack"

const stackElements: BoxElement[] = [
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

type StoryProps = ComponentProps<typeof Stack>

export default {
  component: Stack,
  title: "Layout/Stack",
  argTypes: {
    as: {
      control: {
        type: "select",
      },
      options: stackElements,
    },
    orientation: { control: { type: "radio" } },
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
  render: (props) => <Stack {...props} />,
  args: {
    children: (
      <>
        <p>Item 1</p>
        <p>Item 2</p>
      </>
    ),
    as: "div",
    orientation: "horizontal",
    gap: "2",
  },
}
