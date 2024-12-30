import { createTheme, ThemeProvider } from "@mui/material";
import "./App.css";
import LandingPage from "./LandingPage";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LandingPage />
    </ThemeProvider>
  );
}

export default App;
