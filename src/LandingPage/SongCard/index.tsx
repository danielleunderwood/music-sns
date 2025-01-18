import Card from "../../components/Card";
import { Tables } from "../../utils/database.types";
import UserInfo from "./UserInfo";
import Actions from "./Actions";
import Tag from "../../components/Tag";
import useStore from "../../store";
import ListenedTag from "./ListenedTag";
import { useState } from "react";

type SongCardProps = Pick<Tables<"posts">, "text" | "url" | "user_id" | "id">;

function SongCard({ url, text, user_id, id }: SongCardProps) {
  const { session } = useStore();

  const [visible, setVisible] = useState(true);

  const handleDeletion = () => {
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

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
      <div className="px-4 py-2">
        <div className="flex gap-2">
          <Tag type="poster">
            <UserInfo userId={user_id} />
          </Tag>
          {session?.user.id !== user_id && <ListenedTag id={id} url={url} />}
        </div>
        <div>{text}</div>
        <Actions id={id} user_id={user_id} onDelete={handleDeletion} />
      </div>
    </Card>
  );
}

export default SongCard;
