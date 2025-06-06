import type { ComponentProps } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import Paragraph from "@/components/Paragraph"
import { Tokens } from "@/tokens"

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
  parameters: {
    docs: {
      description: {
        component: `
Paragraphs support longer-form content and communication. Designed for readability and flow, they maintain visual calm while delivering information with clarity and ease.

![Dos and Donts](/images/docs/Paragraph.png)
`,
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
      "A space to create without pressure, share without performing and to see the world through your own lens.",
    size: "base",
    center: false,
  },
}
