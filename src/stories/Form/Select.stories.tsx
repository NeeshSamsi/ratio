import type { ComponentProps } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type StoryProps = ComponentProps<typeof Select>

export default {
  component: Select,
  title: "Form/Select",
  argTypes: {
    disabled: {
      control: "boolean",
    },
    defaultValue: {
      control: "text",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
ComboBoxes combine input and selection, allowing users to choose from a list or enter custom values. Use them to streamline form interactions, especially when dealing with large or dynamic datasets.

![Dos and Donts](/images/docs/Combobox.png)
`,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<StoryProps>

type Story = StoryObj<StoryProps>

export const Default: Story = {
  render: (props) => (
    <Select {...props}>
      <SelectTrigger>
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
  args: {
    // defaultValue: "apple",
  },
}

export const Disabled: Story = {
  render: (props) => (
    <Select {...props}>
      <SelectTrigger>
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
    </Select>
  ),
  args: {
    disabled: true,
  },
}
