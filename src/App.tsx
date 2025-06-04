import Anchor from "./components/Anchor"
import Box from "./components/Box"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./components/ui/breadcrumb"
import Callout from "./components/Callout"
import Heading from "./components/Heading"
import HelpText from "./components/HelpText"
import { ListItem, UnorderedList } from "./components/List/"
import Paragraph from "./components/Paragraph"
import Stack from "./components/Stack/stack"
import ThemeProvider from "./components/ThemeProvider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu"
import { Skeleton } from "./components/ui/skeleton"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./components/ui/pagination"
import Badge from "./components/Badge"
import { Button } from "./components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Alert from "./components/Alert"

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

        <div className="flex"></div>

        <Box padding="8" display="flex" flexDirection="col" gap="4">
          <Callout variant="success" title="Read me, I'm a callout">
            Content for callout goes here
          </Callout>

          <HelpText variant="info">Testing help text</HelpText>

          <Anchor
            size="base"
            label="Explore"
            link="https://vsco.co/something"
            icon="arrow-right"
          />

          <Breadcrumb background="surface-2">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="">Home</BreadcrumbLink>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1">
                      <BreadcrumbEllipsis
                        background="surface-3"
                        className="size-4"
                      />
                      <span className="sr-only">Toggle menu</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem>Documentation</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Themes</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>GitHub</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="">Back</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Current</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Skeleton />

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
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

          <Badge variant="primary" size="base" text="Testing" />

          <Button variant="primary">Explore</Button>

          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              Make changes to your account here.
            </TabsContent>
            <TabsContent value="password">
              Change your password here.
            </TabsContent>
          </Tabs>

          <Alert variant="info">
            Something content Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Repudiandae quaerat nesciunt nobis voluptates
            quisquam praesentium facilis consequatur, dolores in quos.
          </Alert>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
