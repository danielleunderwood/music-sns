import { Alert, TextField } from "@mui/material";
import { useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { Tables } from "../utils/database.types";

interface PostCreationBoxProps {
  onAdd: (
    newPost: Pick<Tables<"posts">, "text" | "url">,
  ) => Promise<PostgrestSingleResponse<Tables<"posts">[]>>;
}

function PostCreationBox({ onAdd }: PostCreationBoxProps) {
  const [url, setUrl] = useState("");

  const [text, setText] = useState("");

  const [error, setError] = useState("");

  const addPost = async () => {
    setError("");

    setUrl("");

    setText("");

    const linksResult = await fetch(
      `https://api.song.link/v1-alpha.1/links?url=${encodeURIComponent(url)}`,
    );

    if (linksResult.status > 300) {
      if (linksResult.status < 500) {
        setError("Failed to retrieve song information. Cannot post.");

        return;
      }

      setError(
        "Failed to retrieve song information. Please try again in a few minutes.",
      );

      return;
    }

    const addResult = await onAdd({ url: url, text: text });

    if (addResult.error) {
      setError("Failed to save post. Please try again in a few minutes.");
    }
  };

  return (
    <form action={addPost}>
      <Card>
        <div className="flex flex-col gap-2 p-4">
          <TextField
            label="Song link"
            size="small"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            autoComplete="off"
            required
          />
          <TextField
            label="Makes me think of..."
            size="small"
            value={text}
            onChange={(event) => setText(event.target.value)}
            autoComplete="off"
            required
          />
        </div>
        {error && <Alert severity="error">{error}</Alert>}
        <Button type="submit">Post</Button>
      </Card>
    </form>
  );
}

export default PostCreationBox;
