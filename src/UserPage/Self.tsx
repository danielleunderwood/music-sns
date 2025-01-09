import { Alert, CircularProgress, TextField } from "@mui/material";
import Card from "../components/Card";
import supabase from "../utils/supabase";
import Button from "../components/Button";
import { FormEvent, useState } from "react";
import useStore from "../store";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import useProfile from "./useProfile";
import { Status } from "../types/status";
import Image from "../components/Image";
import Posts from "../LandingPage/Posts";

function Self() {
  const { session } = useStore();

  const link = window.location.toString();

  const [displayName, setDisplayName] = useState("");

  const [saveResult, setSaveResult] = useState<PostgrestSingleResponse<null>>();

  const { value, status } = useProfile(session?.user.id ?? "");

  if (status === Status.Loading) {
    return <CircularProgress />;
  }

  if (status === Status.Error || !value) {
    return <Alert severity="error">Could not load profile</Alert>;
  }

  if (!value.invite_code) {
    return (
      <Alert severity="info">
        Your account is private and cannot be seen by others.
      </Alert>
    );
  }

  const saveChanges = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!session) {
      return;
    }

    const result = await supabase
      .from("profiles")
      .update({ display_name: displayName })
      .eq("id", session.user.id);

    setSaveResult(result);
  };

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <form onSubmit={(event) => saveChanges(event)}>
          <div className="flex flex-col sm:flex-row p-2 gap-2">
            <div className="w-full sm:w-40 aspect-square">
              <Image
                src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${link}`}
                alt="QR code"
              />
            </div>
            <div className="flex flex-col gap-2">
              <TextField
                label="Display name"
                value={displayName || value.display_name}
                onChange={(event) => {
                  setDisplayName(event.target.value);

                  setSaveResult(undefined);
                }}
              />
              <div className="text-sm text-gray-500">
                To invite someone to view your posts, you can have them scan the
                QR code, or you can
                <button
                  type="button"
                  onClick={async () => {
                    await navigator.clipboard.writeText(link);
                  }}
                  className="px-1 font-bold text-blue-600 dark:text-blue-400 transition rounded-full hover:bg-green-100 hover:dark:bg-green-900"
                >
                  click here
                </button>
                to copy a link you can send them.
              </div>
            </div>
          </div>
          {saveResult &&
            (saveResult.error ? (
              <Alert severity="error">Failed to save. Please try again.</Alert>
            ) : (
              <Alert severity="success">Saved!</Alert>
            ))}
          <Button type="submit">Save changes</Button>
        </form>
      </Card>
      <Posts userId={session?.user.id} />
    </div>
  );
}

export default Self;
