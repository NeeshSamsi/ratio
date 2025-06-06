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
  parameters: {
    docs: {
      description: {
        component: `
Alerts communicate important messages that require user attention or action. Use them to convey status, warn of potential issues, or confirm outcomes with clarity, urgency, and appropriate visual cues.

![Dos and Donts](/images/docs/Alert.png)
`,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<StoryProps>

type Story = StoryObj<StoryProps>

export const Default: Story = {
  render: (props) => (
    <Alert {...props}>
      <Paragraph size="lg">
        New features are available! Take a look around.
      </Paragraph>
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
      <Paragraph size="lg">Your photo was uploaded successfully!</Paragraph>
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
        Image size is larger than recommended. It may slow down your preview.
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
        Upload failed. Please try again or check your connection.
      </Paragraph>
    </Alert>
  ),
  args: {
    variant: "critical",
    dismissible: true,
  },
}

export const WithAction: Story = {
  render: (props) => (
    <Alert
      {...props}
      actionLabel="Review Now"
      onAction={() => alert("Action clicked!")}
    >
      <Paragraph size="lg">
        New features are available! Take a look around.
      </Paragraph>
    </Alert>
  ),
  args: {
    variant: "info",
    dismissible: true,
  },
}
