import { addons } from "storybook/manager-api"
// import { themes } from "storybook/theming"
import ratioTheme from "./RatioTheme"

addons.setConfig({
  theme: ratioTheme,
})
