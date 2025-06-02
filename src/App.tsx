import Box from "./components/Box"
import Heading from "./components/Heading"
import Paragraph from "./components/Paragraph"
import ThemeProvider from "./components/ThemeProvider"

function App() {
  return (
    <ThemeProvider>
      <Box as="main">
        <Heading level="h1" displayLevel="h1">
          Ratio UI
        </Heading>
        <Paragraph size="base">iosuhdf ouihsdfi h</Paragraph>
      </Box>
    </ThemeProvider>
  )
}

export default App
