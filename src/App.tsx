import { AppShell } from "@mantine/core";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import "./App.css";
import Aside from "./components/Aside";
import Header from "./components/Header";
import Main from "./components/Main";
import Navbar from "./components/Navbar";

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
        <Header />
        <Navbar />
        <Main />
        <Aside />
        <AppShell.Footer hiddenFrom="md">Footer</AppShell.Footer>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
