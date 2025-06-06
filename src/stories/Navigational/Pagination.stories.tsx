import type { ComponentProps } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"

type StoryProps = ComponentProps<typeof Pagination>

export default {
  component: Pagination,
  title: "Navigational/Pagination",
  parameters: {
    docs: {
      description: {
        component: `
Pagination divides content into manageable sections, helping users navigate large data sets or long lists with ease. Use it to improve performance, reduce overwhelm, and maintain a clear, focused user experience.

![Dos and Donts](/images/docs/Pagination.png)
`,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<StoryProps>

type Story = StoryObj<StoryProps>

export const Default: Story = {
  render: (props) => (
    <Pagination {...props}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
}
