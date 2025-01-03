import { Alert, CircularProgress } from "@mui/material";
import SongCard from "./SongCard";
import useAsyncEffect, { Status } from "../hooks/useAsyncEffect";
import supabase from "../utils/supabase";
import PostBox from "./PostBox";
import { useState } from "react";
import PostContent from "../types/PostContent";
import Auth from "./Auth";
import SupabaseRecord from "../types/SupabaseRecord";
import useStore from "../store";

function LandingPage() {
  const { session } = useStore();

  const [posts, setPosts] = useState<SupabaseRecord<PostContent>[]>([]);

  const { status } = useAsyncEffect({
    effect: async () => {
      const { data } = await supabase
        .from("posts")
        .select()
        .order("created_at", { ascending: false })
        .range(0, 20);

      if (!data) {
        return [];
      }

      setPosts(data as SupabaseRecord<PostContent>[]);
    },
    deps: [],
    initialValue: undefined,
  });

  return (
    <div className="flex flex-col gap-4 w-full max-w-[48rem] min-w-0">
      {session ? (
        <PostBox
          onAdd={async (newPost) => {
            const result = await supabase.from("posts").insert(newPost);

            if (!result.error) {
              // Add pseudo ID for key purposes.
              // Date.now() should be fine since user shouldn't be posting more than once a millisecond.
              setPosts([{ ...newPost, id: Date.now().toString() }, ...posts]);
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
      {posts.map(({ id, url, text }) => (
        <SongCard key={id} url={url} text={text} />
      ))}
    </div>
  );
}

export default LandingPage;
