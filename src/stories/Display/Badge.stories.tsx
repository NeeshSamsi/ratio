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
