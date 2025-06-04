import type { ComponentProps } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import Alert from "@/components/Alert"
import Paragraph from "@/components/Paragraph"

type StoryProps = ComponentProps<typeof Alert>

export default {
  component: Alert,
  title: "Display/Alert",
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["info", "success", "warning", "critical"],
    },
    dismissible: {
      control: {
        type: "boolean",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<StoryProps>

type Story = StoryObj<StoryProps>

export const Default: Story = {
  render: (props) => (
    <Alert {...props}>
      <Paragraph size="lg">This is an alert message</Paragraph>
    </Alert>
  ),
  args: {
    variant: "info",
    dismissible: true,
  },
}

export const Success: Story = {
  render: (props) => (
    <Alert {...props}>
      <Paragraph size="lg">Operation completed successfully!</Paragraph>
    </Alert>
  ),
  args: {
    variant: "success",
    dismissible: true,
  },
}

export const Warning: Story = {
  render: (props) => (
    <Alert {...props}>
      <Paragraph size="lg">
        Please review your changes before proceeding.
      </Paragraph>
    </Alert>
  ),
  args: {
    variant: "warning",
    dismissible: true,
  },
}

export const Critical: Story = {
  render: (props) => (
    <Alert {...props}>
      <Paragraph size="lg">
        An error occurred while processing your request.
      </Paragraph>
    </Alert>
  ),
  args: {
    variant: "critical",
    dismissible: true,
  },
}
