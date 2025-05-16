import { createTheme, ThemeProvider } from "@mui/material";
import TopNav from "./TopNav";
import App from "./App";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

function Layout() {
  return (
    <ThemeProvider theme={theme}>
      <TopNav />
      <div className="flex justify-center">
        <div className="w-full max-w-[48rem] px-2 py-4">
          <App />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Layout;
