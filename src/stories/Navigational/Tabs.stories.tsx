import type { ComponentProps } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

type StoryProps = ComponentProps<typeof Tabs>

export default {
  component: Tabs,
  title: "Navigational/Tabs",
  tags: ["autodocs"],
} satisfies Meta<StoryProps>

type Story = StoryObj<StoryProps>

export const Default: Story = {
  render: (props) => (
    <Tabs defaultValue="account" {...props}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="p-4">Account settings and preferences.</div>
      </TabsContent>
      <TabsContent value="password">
        <div className="p-4">Change your password here.</div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="p-4">General application settings.</div>
      </TabsContent>
    </Tabs>
  ),
}
