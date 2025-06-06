import type { ComponentProps } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Skeleton } from "@/components/ui/skeleton"

type StoryProps = ComponentProps<typeof Skeleton>

export default {
  component: Skeleton,
  title: "Layout/Skeleton",
  argTypes: {
    width: {
      control: "text",
      description: "Width of the skeleton element",
    },
    height: {
      control: "text",
      description: "Height of the skeleton element",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Skeleton components act as visual placeholders while content loads. They reinforce structure and maintain visual continuity during transitions.
`,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<StoryProps>

type Story = StoryObj<StoryProps>

export const Default: Story = {
  args: {
    width: "100%",
    height: "1em",
  },
}

export const CustomSize: Story = {
  args: {
    width: "200px",
    height: "100px",
  },
}

export const Text: Story = {
  args: {
    width: "80%",
    height: "1.5em",
  },
}

export const Circle: Story = {
  args: {
    width: "50px",
    height: "50px",
    className: "rounded-full",
  },
}
