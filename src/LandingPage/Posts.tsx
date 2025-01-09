import useAsyncEffect from "../hooks/useAsyncEffect";
import supabase from "../utils/supabase";
import { Status } from "../types/status";
import { Alert, CircularProgress } from "@mui/material";
import SongCard from "./SongCard";

interface PostsProps {
  /** A UUID. */
  userId?: string;
}

function Posts({ userId }: PostsProps) {
  const { value: posts, status } = useAsyncEffect({
    effect: async () => {
      const query = supabase.from("posts").select();

      if (userId) {
        query.eq("user_id", userId);
      }

      const { data } = await query
        .order("created_at", { ascending: false })
        .range(0, 20);

      if (!data) {
        return [];
      }

      return data;
    },
    deps: [],
    initialValue: undefined,
  });

  if (status === Status.Loading) {
    return (
      <div className="flex justify-center w-full">
        <CircularProgress />
      </div>
    );
  }

  if (status === Status.Error || !posts) {
    return (
      <Alert severity="error">Failed to load posts. Please try again.</Alert>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {posts.map(({ id, url, text, user_id }) => (
        <SongCard key={id} url={url} text={text} user_id={user_id} />
      ))}
    </div>
  );
}

export default Posts;
