import { createTheme, ThemeProvider } from "@mui/material";
import LandingPage from "./LandingPage";
import TopNav from "./TopNav";
import useAsyncEffect from "./hooks/useAsyncEffect";
import supabase from "./utils/supabase";
import useStore from "./store";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

function App() {
  const { setSession } = useStore();

  useAsyncEffect({
    effect: async () => {
      const sessionData = await supabase.auth.getSession();

      setSession(sessionData.data.session);

      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });
    },
    deps: [],
    initialValue: null,
  });

  return (
    <ThemeProvider theme={theme}>
      <TopNav />
      <div className="px-2 md:px-12 py-4">
        <LandingPage />
      </div>
    </ThemeProvider>
  );
}

export default App;
