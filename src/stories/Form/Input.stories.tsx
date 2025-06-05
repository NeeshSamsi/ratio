import type { ComponentProps } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Input } from "@/components/ui/input"

type StoryProps = ComponentProps<typeof Input>

export default {
  component: Input,
  title: "Form/Input",
  argTypes: {
    type: {
      control: {
        type: "select",
      },
      options: ["text", "email", "password", "url"],
    },
    placeholder: {
      control: {
        type: "text",
      },
    },
    disabled: {
      control: "boolean",
    },
    readOnly: {
      control: "boolean",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<StoryProps>

type Story = StoryObj<StoryProps>

export const Default: Story = {
  render: (props) => <Input {...props} />,
  args: {
    type: "text",
    placeholder: "Enter text...",
  },
}
