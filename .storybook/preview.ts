import type { Preview } from "@storybook/react"
import { themes } from "@storybook/theming"
import "../src/index.css"

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

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
}

export default preview
