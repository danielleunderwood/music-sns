import { Alert, TextField } from "@mui/material";
import { useState } from "react";
import PostContent from "../types/PostContent";
import Card from "../components/Card";
import Button from "../components/Button";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

interface PostBoxProps {
  onAdd: (newPost: PostContent) => Promise<PostgrestSingleResponse<null>>;
}

function PostBox({ onAdd }: PostBoxProps) {
  const [url, setUrl] = useState("");

  const [text, setText] = useState("");

  const [error, setError] = useState("");

  const addPost = async () => {
    setError("");

    setUrl("");

    setText("");

    const result = await onAdd({ url: url, text: text });

    if (result.error) {
      setError("Failed to save post. Please try again in a few minutes.");
    }
  };

  return (
    <form onSubmit={addPost}>
      <Card>
        <div className="flex flex-col gap-2 p-4">
          <TextField
            label="Song link"
            size="small"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            required
          />
          <TextField
            label="Makes me think of..."
            size="small"
            value={text}
            onChange={(event) => setText(event.target.value)}
            required
          />
        </div>
        {error && <Alert severity="error">{error}</Alert>}
        <Button text="Post" type="submit" />
      </Card>
    </form>
  );
}

export default PostBox;
