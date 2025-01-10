import supabase from "../utils/supabase";
import PostCreationBox from "./PostCreationBox";
import Auth from "./Auth";
import useStore from "../store";
import Posts from "./Posts";
import { useState } from "react";
import { Tables } from "../utils/database.types";
import SongCard from "./SongCard";

function LandingPage() {
  const { session } = useStore();

  const [posts, setPosts] = useState<
    Pick<Tables<"posts">, "text" | "url" | "id">[]
  >([]);

  return (
    <div className="flex flex-col gap-4">
      {session ? (
        <PostCreationBox
          onAdd={async (newPost) => {
            const result = await supabase
              .from("posts")
              .insert(newPost)
              .select();

            if (!result.error) {
              const [newPost] = result.data;

              // Add pseudo ID for key purposes.
              // Date.now() should be fine since user shouldn't be posting more than once a millisecond.
              setPosts([newPost, ...posts]);
            }

            return result;
          }}
        />
      ) : (
        <Auth />
      )}
      <div className="flex flex-col gap-2">
        {posts.map(({ id, url, text }) => (
          <SongCard
            key={id}
            id={id}
            url={url}
            text={text}
            user_id={session?.user.id ?? ""}
          />
        ))}
        <Posts />
      </div>
    </div>
  );
}

export default LandingPage;
