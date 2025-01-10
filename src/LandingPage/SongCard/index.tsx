import { Dialog, IconButton } from "@mui/material";
import Card from "../../components/Card";
import useStore from "../../store";
import { Tables } from "../../utils/database.types";
import UserInfo from "./UserInfo";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Button from "../../components/Button";
import supabase from "../../utils/supabase";

type SongCardProps = Pick<Tables<"posts">, "text" | "url" | "user_id" | "id">;

function SongCard({ url, text, user_id, id }: SongCardProps) {
  const { session } = useStore();

  const [deleted, setDeleted] = useState(false);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  if (deleted) {
    return null;
  }

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  return (
    <Card>
      <div className="w-full bg-black" style={{ height: "230px" }}>
        <iframe
          title={url}
          width="100%"
          height="100%"
          src={`https://embed.odesli.co/?url=${url}&theme=dark`}
          sandbox="allow-same-origin allow-scripts allow-presentation allow-popups allow-popups-to-escape-sandbox"
        />
      </div>
      <div className="px-4 py-2 divide">
        <div>{text}</div>
        <div className="flex flex-row-reverse justify-between items-end">
          <UserInfo userId={user_id} />
          {session?.user.id === user_id && (
            <IconButton
              type="button"
              onClick={handleDeleteClick}
              aria-description="Delete"
              size="small"
            >
              <TrashIcon className="h-4 w-4" />
            </IconButton>
          )}
        </div>
      </div>
      <Dialog
        open={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
        }}
        PaperProps={{ component: Card }}
      >
        <div className="flex flex-col p-8 gap-6 bg-white dark:bg-zinc-900">
          <h1>Delete post?</h1>
          <div className="flex gap-4 justify-between">
            <Button
              type="button"
              onClick={() => {
                setShowDeleteDialog(false);
              }}
            >
              <div className="px-2">Cancel</div>
            </Button>
            <Button
              type="reset"
              onClick={async () => {
                await supabase.from("posts").delete().eq("id", id);

                setDeleted(true);
              }}
            >
              <div className="px-2">Delete</div>
            </Button>
          </div>
        </div>
      </Dialog>
    </Card>
  );
}

export default SongCard;
