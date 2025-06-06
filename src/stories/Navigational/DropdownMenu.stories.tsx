import type { ComponentProps } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

type StoryProps = ComponentProps<typeof DropdownMenu>

export default {
  component: DropdownMenu,
  title: "Navigational/DropdownMenu",
  parameters: {
    docs: {
      description: {
        component: `
Dropdown menus offer quick access to relevant actions based on a user’s selection or interaction. Use them to streamline workflows, reduce clutter, and present secondary options without overwhelming the main interface.

![Dos and Donts](/images/docs/Dropdown.png)
`,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<StoryProps>

type Story = StoryObj<StoryProps>

export const Default: Story = {
  render: (props) => (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger>
        <Button variant="secondary">Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Help</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}
