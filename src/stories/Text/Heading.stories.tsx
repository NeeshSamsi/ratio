import type { ComponentProps } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import Heading from "@/components/Heading"
import { Tokens } from "@/tokens"

type StoryProps = ComponentProps<typeof Heading>

export default {
  component: Heading,
  title: "Text/Heading",
  argTypes: {
    level: {
      control: {
        type: "select",
      },
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
    },
    displayLevel: {
      control: {
        type: "select",
      },
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
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
Headings provide structure and hierarchy, helping users navigate content quickly and intuitively. Use them to guide attention and organize information with clarity and intention.

![Dos and Donts](/images/docs/Heading.png)
`,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<StoryProps>

type Story = StoryObj<StoryProps>

export const Default: Story = {
  render: (props) => <Heading {...props} />,
  args: {
    children: "Crafted, not curated.",
    level: "h1",
    displayLevel: "h1",
    center: false,
  },
}
