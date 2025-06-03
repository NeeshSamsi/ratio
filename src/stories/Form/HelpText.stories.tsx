import type { ComponentProps } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import HelpText from "../components/HelpText"

type StoryProps = ComponentProps<typeof HelpText>

export default {
  component: HelpText,
  title: "Form/HelpText",
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["info", "success", "critical"],
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
  render: (props) => <HelpText {...props} />,
  args: {
    variant: "info",
    children: "Name the mood, theme, or moment.",
  },
}
