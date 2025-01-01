import { useState } from "react";
import supabase from "../utils/supabase";
import { Alert, TextField } from "@mui/material";
import Button from "../components/Button";
import Card from "../components/Card";
import { AuthOtpResponse } from "@supabase/supabase-js";

export default function Auth() {
  const [email, setEmail] = useState("");

  const [authResponse, setAuthResponse] = useState<AuthOtpResponse>();

  const handleLogin: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();

    const response = await supabase.auth.signInWithOtp({ email });

    setAuthResponse(response);
  };

  return (
    <Card>
      <div className="flex flex-col items-center p-4">
        <h1>Want to make a post?</h1>
        <h2>Enter your email to receive a login link.</h2>
        <TextField
          onChange={(event) => setEmail(event.target.value)}
          fullWidth
          size="small"
          label="Email"
          value={email}
          disabled={Boolean(authResponse?.data)}
        />
      </div>
      {authResponse &&
        (authResponse?.error ? (
          <Alert severity="error">
            Failed to send email. Please try again in a few minutes.
          </Alert>
        ) : (
          <Alert severity="success">Email sent!</Alert>
        ))}
      <Button onClick={handleLogin} text="Send" />
    </Card>
  );
}
