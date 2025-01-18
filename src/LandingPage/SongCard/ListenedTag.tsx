import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";
import PopupMenu from "../../components/PopupMenu";
import Tag from "../../components/Tag";
import useAsyncEffect from "../../hooks/useAsyncEffect";
import supabase from "../../utils/supabase";
import { Status } from "../../types/status";
import { useState } from "react";

interface ListenedTagProps {
  id: string;
  url: string;
}

function ListenedTag({ id, url }: ListenedTagProps) {
  const { value: remoteHasListenedResult, status } = useAsyncEffect({
    effect: async () => {
      const result = await supabase
        .from("listens")
        .select()
        .eq("url", url)
        .limit(1);

      return result;
    },
    deps: [],
    initialValue: undefined,
  });

  const [currentListenedMatchesInitial, setCurrentListenedMatchesInitial] =
    useState(true);

  if (status === Status.Loading) {
    return <div className="h-4 w-36 bg-blue-200 animate-pulse" />;
  }

  if (
    status === Status.Error ||
    !remoteHasListenedResult ||
    remoteHasListenedResult.error
  ) {
    return <div className="h-4 w-36 bg-red-200" />;
  }

  const [remoteHasListened] = remoteHasListenedResult.data;

  const hasListened = currentListenedMatchesInitial
    ? remoteHasListened
    : !remoteHasListened;

  return (
    <Tag type="listened">
      {hasListened ? "Listened" : "Haven't listened"}
      <PopupMenu
        id={`listened-status-${id}`}
        label="Set listened status"
        activator={<EllipsisHorizontalCircleIcon className="h-4" />}
        menuItems={[
          {
            label: `Move to ${hasListened ? "Haven't listened" : "Listened"}`,
            onClick: async () => {
              if (hasListened) {
                await supabase.from("listens").delete().eq("url", url);
              } else {
                await supabase.from("listens").insert({ url });
              }

              setCurrentListenedMatchesInitial(!currentListenedMatchesInitial);
            },
          },
        ]}
      />
    </Tag>
  );
}

export default ListenedTag;
