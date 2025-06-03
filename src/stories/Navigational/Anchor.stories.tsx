import type { ComponentProps } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import Anchor from "../../components/Anchor"

type StoryProps = ComponentProps<typeof Anchor>

export default {
  component: Anchor,
  title: "Navigational/Anchor",
  argTypes: {
    size: {
      control: {
        type: "select",
      },
      options: ["base", "md", "lg"],
    },
    label: {
      control: {
        type: "text",
      },
    },
    link: {
      control: {
        type: "text",
      },
    },
    external: {
      control: {
        type: "boolean",
      },
    },
    icon: {
      control: {
        type: "select",
      },
      options: ["arrow-right", "arrow-top-right"],
    },
    leadingIcon: {
      control: {
        type: "boolean",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<StoryProps>

type Story = StoryObj<StoryProps>

export const Default: Story = {
  render: (props) => <Anchor {...props} />,
  args: {
    label: "Explore",
    link: "https://vsco.co",
    size: "base",
    external: true,
  },
}
