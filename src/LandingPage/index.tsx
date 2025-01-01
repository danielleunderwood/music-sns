import { Alert, CircularProgress } from "@mui/material";
import SongCard from "./SongCard";
import useAsyncEffect, { Status } from "../hooks/useAsyncEffect";
import supabase from "../utils/supabase";
import PostBox from "./PostBox";
import { useState } from "react";
import PostContent from "../types/PostContent";
import Auth from "./Auth";
import { Session } from "@supabase/supabase-js";

function LandingPage() {
  const [posts, setPosts] = useState<PostContent[]>([]);

  const [session, setSession] = useState<Session | null>(null);

  const { status } = useAsyncEffect({
    effect: async () => {
      const { data } = await supabase
        .from("posts")
        .select()
        .order("created_at", { ascending: false })
        .range(0, 20);

      setPosts(data as PostContent[]);
    },
    deps: [],
    initialValue: undefined,
  });

  useAsyncEffect({
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

  return (
    <div className="flex flex-col gap-4 w-full max-w-[48rem] min-w-0">
      {session ? (
        <PostBox
          onAdd={async (newPost) => {
            const result = await supabase.from("posts").insert(newPost);

            if (!result.error) {
              setPosts([newPost, ...posts]);
            }

            return result;
          }}
        />
      ) : (
        <Auth />
      )}

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
