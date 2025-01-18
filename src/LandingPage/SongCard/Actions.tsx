import { useState } from "react";
import { Tables } from "../../utils/database.types";
import { Dialog, IconButton } from "@mui/material";
import { TrashIcon } from "@heroicons/react/24/solid";
import Button from "../../components/Button";
import Card from "../../components/Card";
import supabase from "../../utils/supabase";
import useStore from "../../store";

interface ActionsProps extends Pick<Tables<"posts">, "id" | "user_id"> {
  onDelete: () => void;
}

function Actions({ id, user_id, onDelete }: ActionsProps) {
  const { session } = useStore();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  if (user_id !== session?.user.id) {
    return null;
  }

  return (
    <>
      <IconButton
        type="button"
        onClick={handleDeleteClick}
        aria-description="Delete"
        size="small"
      >
        <TrashIcon className="h-4 w-4" />
      </IconButton>
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

                onDelete();
              }}
            >
              <div className="px-2">Delete</div>
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default Actions;
