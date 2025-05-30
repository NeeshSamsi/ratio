import type { Preview } from "@storybook/react-vite"
import type { StoryFn as Story, StoryContext } from "@storybook/react-vite"
import { themes } from "storybook/theming"
import "../src/index.css"

import React from "react"
import ThemeProvider from "../src/components/ThemeProvider"

const preview: Preview = {
  initialGlobals: {
    backgrounds: { value: "#0A0A0A" },
  },
  parameters: {
    docs: {
      theme: themes.dark,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    background: {
      default: "#0A0A0A",
    },
    decorators: [
      (Story) => ({
        components: { Story, ThemeProvider },
        template: (
          <ThemeProvider>
            <Story />
          </ThemeProvider>
        ),
      }),
    ],

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
  decorators: [
    (Story: Story, context: StoryContext) => (
      <ThemeProvider>{Story(context.args, context)}</ThemeProvider>
    ),
  ],
}

export default preview
