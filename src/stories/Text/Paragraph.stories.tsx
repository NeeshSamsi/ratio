import type { ComponentProps } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import Paragraph from "../../components/Paragraph"
import { Tokens } from "../../tokens"

type StoryProps = ComponentProps<typeof Paragraph>

export default {
  component: Paragraph,
  title: "Text/Paragraph",
  argTypes: {
    size: {
      control: {
        type: "select",
      },
      options: ["base", "md", "lg"],
    },
    marginBottom: {
      control: {
        type: "select",
      },
      options: Object.keys(Tokens.MarginBottom),
    },
    center: { control: { type: "boolean" } },
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
  render: (props) => <Paragraph {...props} />,
  args: {
    children:
      "We empower photographers to connect with other creatives and businesses with our suite of creative tools that spans from mobile to desktop and across our global community.",
    size: "base",
    center: false,
  },
}
