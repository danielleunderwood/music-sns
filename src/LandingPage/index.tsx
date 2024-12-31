import { Alert, CircularProgress } from "@mui/material";
import SongCard from "./SongCard";
import useAsyncEffect, { Status } from "../hooks/useAsyncEffect";
import supabase from "../utils/supabase";
import PostBox from "./PostBox";
import { useState } from "react";
import PostContent from "../types/PostContent";

function LandingPage() {
  const [posts, setPosts] = useState<PostContent[]>([]);

  const { status } = useAsyncEffect({
    effect: async () => {
      const { data } = await supabase.from("posts").select();

      setPosts(data as PostContent[]);
    },
    deps: [],
    initialValue: undefined,
  });

  return (
    <div className="flex flex-col gap-4 w-full max-w-[48rem] min-w-0">
      <PostBox onAdd={(newPost) => setPosts([newPost, ...posts])} />
      {status === Status.Error && (
        <Alert severity="error">Failed to load posts. Please try again.</Alert>
      )}
      {status === Status.Loading && (
        <div className="flex justify-center w-full">
          <CircularProgress />
        </div>
      )}
      {posts.map(({ url, text }) => (
        <SongCard key={text} url={url} text={text} />
      ))}
    </div>
  );
}

export default LandingPage;
