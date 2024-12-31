import { TextField } from "@mui/material";
import Card from "../components/Card";
import { useState } from "react";
import PostContent from "../types/PostContent";

interface PostBoxProps {
  onAdd: (newPost: PostContent) => void;
}

function PostBox({ onAdd }: PostBoxProps) {
  const [url, setUrl] = useState("");

  const [text, setText] = useState("");

  return (
    <Card>
      <div className="flex flex-col gap-2 p-4">
        <TextField
          label="Song link"
          size="small"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
        <TextField
          label="Makes me think of..."
          size="small"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
      </div>
      <button
        onClick={() => {
          setUrl("");

          setText("");

          onAdd({ url: url, text: text });
        }}
        className="w-full rounded-t-none p-2 transition bg-slate-950 hover:bg-slate-700 text-white dark:bg-slate-300 hover:dark:bg-slate-50 dark:outline-slate-300 hover:dark:outline-slate-50  dark:text-black"
      >
        Post
      </button>
    </Card>
  );
}

export default PostBox;
