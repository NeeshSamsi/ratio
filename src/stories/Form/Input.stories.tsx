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
  parameters: {
    docs: {
      description: {
        component: `
Inputs allow users to enter and modify information, forming the foundation of user interaction. Use them to capture data clearly and efficiently, ensuring accessibility, consistency, and ease of use across all form elements.

![Dos and Donts](/images/docs/Input.png)
`,
      },
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
