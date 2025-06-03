import type { ComponentProps } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import Text from "@/components/Text"

type StoryProps = ComponentProps<typeof Text>

export default {
  component: Text,
  title: "Primitives/Text",
  argTypes: {
    as: {
      control: {
        type: "select",
      },
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span"],
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
  render: (props) => <Text {...props} />,
  args: {
    children:
      "A space to create without pressure, share without performing and to see the world through your own lens.",
    as: "p",
  },
}
