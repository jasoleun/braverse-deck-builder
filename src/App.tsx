import { AppShell } from "@mantine/core";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import "./App.css";
import AsideContent from "./components/AsideContent";
import HeaderContent from "./components/HeaderContent";
import MainContent from "./components/MainContent";

function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 400,
          breakpoint: "xl",
        }}
        aside={{
          width: 600,
          breakpoint: "lg",
        }}
        padding="md"
      >
        <AppShell.Header>
          <HeaderContent/>
        </AppShell.Header>
        <AppShell.Main>
          <MainContent/>
        </AppShell.Main>
        <AppShell.Navbar p="md"></AppShell.Navbar>
        <AppShell.Aside p="md">
          <AsideContent/>
        </AppShell.Aside>
        <AppShell.Footer hiddenFrom="md">Footer</AppShell.Footer>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
