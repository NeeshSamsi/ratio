import Anchor from "./components/Anchor"
import Box from "./components/Box"
import Callout from "./components/Callout"
import Heading from "./components/Heading"
import HelpText from "./components/HelpText"
import { ListItem, UnorderedList } from "./components/List/"
import Paragraph from "./components/Paragraph"
import Stack from "./components/Stack/stack"
import ThemeProvider from "./components/ThemeProvider"

function App() {
  return (
    <ThemeProvider>
      <Box as="main">
        <Heading level="h1" displayLevel="h1">
          Ratio UI
        </Heading>

        <Stack orientation="horizontal" gap="6">
          <Paragraph size="base">iosuhdf ouihsdfi h</Paragraph>
          <Paragraph size="base">Something else</Paragraph>
        </Stack>

        <UnorderedList variant="disc">
          <ListItem>Testing</ListItem>
          <ListItem>Testing</ListItem>
          <ListItem>Testing</ListItem>
        </UnorderedList>

        <Box padding="8" display="flex" flexDirection="col" gap="4">
          <Callout variant="success" title="Read me, I'm a callout"></Callout>

          <HelpText variant="info">Testing help text</HelpText>

          <Anchor
            size="lg"
            label="Explore"
            link="https://vsco.co"
            icon="arrow-right"
          />
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
