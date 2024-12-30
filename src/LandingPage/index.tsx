import { TextField } from "@mui/material";
import Card from "../components/Card";
import SongCard from "./SongCard";
import { useState } from "react";

interface PostContent {
  url: string;
  text: string;
}

function LandingPage() {
  const [posts, setPosts] = useState<PostContent[]>([
    {
      url: "https://soundcloud.com/jaiwolfmusic/track-5",
      text: "This song reminded me of you!",
    },
  ]);

  const [postUrl, setPostUrl] = useState("");

  const [postText, setPostText] = useState("");

  return (
    <div className="flex flex-col gap-4 w-full max-w-[48rem] min-w-0">
      <Card>
        <div className="flex flex-col gap-2 p-4">
          <TextField
            label="Song link"
            size="small"
            value={postUrl}
            onChange={(event) => setPostUrl(event.target.value)}
          />
          <TextField
            label="Makes me think of..."
            size="small"
            value={postText}
            onChange={(event) => setPostText(event.target.value)}
          />
        </div>
        <button
          onClick={() => {
            setPosts([{ url: postUrl, text: postText }, ...posts]);

            setPostUrl("");

            setPostText("");
          }}
          className="w-full rounded-t-none p-2 transition bg-slate-950 hover:bg-slate-700 text-white dark:bg-slate-300 hover:dark:bg-slate-50 dark:outline-slate-300 hover:dark:outline-slate-50  dark:text-black"
        >
          Post
        </button>
      </Card>
      {posts.map(({ url, text }) => (
        <SongCard key={text} url={url} text={text} />
      ))}
    </div>
  );
}

export default LandingPage;
