import { Alert } from "@mui/material";
import LandingPage from "./LandingPage";
import { Route, Routes } from "react-router";
import UserPage from "./UserPage";
import { Status } from "./types/status";
import useSession from "./hooks/useSession";

function App() {
  const { status } = useSession();

  if (status === Status.Loading) {
    return <div className="bg-gray-500 animate-pulse"></div>;
  }

  if (status === Status.Error) {
    return (
      <Alert severity="error">
        Failed to retrieve session info. Please try again.
      </Alert>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<LandingPage />}
      />
      <Route
        path="/user/:userId"
        element={<UserPage />}
      />
    </Routes>
  );
}

export default App;
