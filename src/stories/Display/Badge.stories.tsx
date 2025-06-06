import type { ComponentProps } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import Badge from "@/components/Badge"

type StoryProps = ComponentProps<typeof Badge>

export default {
  component: Badge,
  title: "Display/Badge",
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: [
        "primary",
        "surface-1",
        "surface-2",
        "surface-3",
        "info",
        "success",
        "warning",
        "critical",
      ],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["base", "lg"],
    },
    text: {
      control: {
        type: "text",
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Badges communicate quick status or counts with minimal visual weight. They draw subtle attention without interrupting the flow of surrounding content

![Dos and Donts](/images/docs/Badge.png)
`,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<StoryProps>

type Story = StoryObj<StoryProps>

export const Default: Story = {
  render: (props) => <Badge {...props} />,
  args: {
    text: "Badge",
    variant: "primary",
    size: "base",
  },
}
