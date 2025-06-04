import type { ComponentProps } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft, Sparkle, ArrowUpRight } from "lucide-react"

type StoryProps = ComponentProps<typeof Button>

export default {
  component: Button,
  title: "Form/Button",
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["primary", "secondary", "destructive", "ghost"],
    },
    children: {
      control: {
        type: "text",
      },
    },
    disabled: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
    },
    fullWidth: {
      control: "boolean",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<StoryProps>

type Story = StoryObj<StoryProps>

export const Default: Story = {
  render: (props) => <Button {...props} />,
  args: {
    variant: "primary",
    children: "Explore",
  },
}

export const WithLeftIcon: Story = {
  render: (props) => <Button {...props} />,
  args: {
    variant: "primary",
    children: (
      <>
        <ArrowLeft />
        Back
      </>
    ),
  },
}

export const WithRightIcon: Story = {
  render: (props) => <Button {...props} />,
  args: {
    variant: "primary",
    children: (
      <>
        Next
        <ArrowRight />
      </>
    ),
  },
}

export const WithBothIcons: Story = {
  render: (props) => <Button {...props} />,
  args: {
    variant: "primary",
    children: (
      <>
        <Sparkle />
        Canvas
        <ArrowUpRight />
      </>
    ),
  },
}
