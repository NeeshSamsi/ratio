import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Card,
  CardTitle,
  CardContent,
  CardImage,
} from "../../components/Card/card"
import { Button } from "@/components/ui/button"
import Paragraph from "@/components/Paragraph"

const meta: Meta<typeof Card> = {
  title: "Display/Card",
  component: Card,
  argTypes: {
    background: {
      control: {
        type: "select",
      },
      options: ["surface-2", "surface-3"],
    },
    orientation: {
      control: {
        type: "radio",
      },
      options: ["horizontal", "vertical"],
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Cards group related content and actions into structured, touch-friendly containers. They help organize interfaces with flexibility and visual harmony.

![Dos and Donts](/images/docs/Card.png)
`,
      },
    },
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Card>

export const Basic: Story = {
  args: {
    background: "surface-2",
    children: (
      <>
        <CardTitle level="h2" displayLevel="h4">
          Make It Yours
        </CardTitle>
        <CardContent>
          <Paragraph size="base" marginBottom="0">
            Refine contrast, balance color, and highlight your signature
            style—all in one place.
          </Paragraph>
          <Button variant="secondary">Refine your look</Button>
        </CardContent>
      </>
    ),
  },
}

export const WithImageHorizontal: Story = {
  args: {
    background: "surface-3",
    orientation: "horizontal",
    children: (
      <>
        <CardImage
          src="https://picsum.photos/400/300"
          alt="Random image for horizontal card"
        />
        <CardTitle level="h2" displayLevel="h4">
          Card with Horizontal Image
        </CardTitle>
        <CardContent>
          <Paragraph size="base" marginBottom="0">
            This card has an image displayed horizontally alongside the content.
          </Paragraph>
          <Button variant="secondary">View Details</Button>
        </CardContent>
      </>
    ),
  },
}

export const WithImageVertical: Story = {
  args: {
    background: "surface-2",
    orientation: "vertical",
    children: (
      <>
        <CardImage
          src="https://picsum.photos/400/300"
          alt="Random image for vertical card"
        />
        <CardTitle level="h2" displayLevel="h4">
          Card with Vertical Image
        </CardTitle>
        <CardContent>
          <Paragraph size="base" marginBottom="0">
            This card has an image displayed vertically above the content.
          </Paragraph>
          <Button variant="secondary">Explore</Button>
        </CardContent>
      </>
    ),
  },
}
