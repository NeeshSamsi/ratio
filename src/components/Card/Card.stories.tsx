import type { Meta, StoryObj } from "@storybook/react-vite"
import { Card, CardTitle, CardContent } from "./card"
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
    image: {
      control: {
        type: "object",
        fields: {
          src: {
            control: "text",
            description: "Image source URL",
          },
          alt: {
            control: "text",
            description: "Image alt text",
          },
        },
      },
    },
    children: {
      table: {
        disable: true,
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
          Basic Card
        </CardTitle>
        <CardContent>
          <Paragraph size="base" marginBottom="0">
            This is a basic card with a title and content.
          </Paragraph>
          <Button variant="secondary">Learn More</Button>
        </CardContent>
      </>
    ),
  },
}

export const WithImageHorizontal: Story = {
  args: {
    background: "surface-3",
    orientation: "horizontal",
    image: {
      src: "https://picsum.photos/400/300",
      alt: "Random image for horizontal card",
    },
    children: (
      <>
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
    image: {
      src: "https://picsum.photos/400/300",
      alt: "Random image for vertical card",
    },
    children: (
      <>
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

export const ComplexContent: Story = {
  args: {
    background: "surface-3",
    children: (
      <>
        <CardTitle level="h2" displayLevel="h4">
          Complex Card Content
        </CardTitle>
        <CardContent>
          <Paragraph size="base" marginBottom="0">
            This card demonstrates more complex content structure with multiple
            elements.
          </Paragraph>
          <ul className="my-4">
            <li>First item</li>
            <li>Second item</li>
            <li>Third item</li>
          </ul>
          <Button variant="secondary">Get Started</Button>
        </CardContent>
      </>
    ),
  },
}
