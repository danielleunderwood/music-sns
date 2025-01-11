import { useState } from "react";
import supabase from "../utils/supabase";
import { Alert, TextField } from "@mui/material";
import Button from "../components/Button";
import Card from "../components/Card";
import { AuthOtpResponse } from "@supabase/supabase-js";

export default function Auth() {
  const [email, setEmail] = useState("");

  const [authResponse, setAuthResponse] = useState<AuthOtpResponse>();

  const handleLogin: (formData: FormData) => Promise<void> = async () => {
    const response = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: import.meta.env.VITE_ENVIRONMENT_URL,
      },
    });

    setAuthResponse(response);
  };

  return (
    <form action={handleLogin}>
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
            required
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
        <Button type="submit">Send</Button>
      </Card>
    </form>
  );
}
