import {
  Alert,
  CircularProgress,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import LandingPage from "./LandingPage";
import TopNav from "./TopNav";
import useAsyncEffect from "./hooks/useAsyncEffect";
import supabase from "./utils/supabase";
import useStore from "./store";
import { Route, Routes } from "react-router";
import UserPage from "./UserPage";
import { Status } from "./types/status";
import { useEffect } from "react";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

function App() {
  const { setSession } = useStore();

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  const { status } = useAsyncEffect({
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

  if (status === Status.Loading) {
    return <CircularProgress />;
  }

  if (status === Status.Error) {
    return (
      <Alert severity="error">
        Failed to retrieve session info. Please try again.
      </Alert>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <TopNav />
      <div className="flex justify-center">
        <div className="w-full max-w-[48rem] px-2 py-4">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/user/:userId" element={<UserPage />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
