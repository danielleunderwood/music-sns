import Card from "../../components/Card";
import { Tables } from "../../utils/database.types";
import UserInfo from "./UserInfo";

type SongCardProps = Pick<Tables<"posts">, "text" | "url" | "user_id">;

function SongCard({ url, text, user_id }: SongCardProps) {
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
        <div className="flex justify-end">
          <UserInfo userId={user_id} />
        </div>
      </div>
    </Card>
  );
}

export default SongCard;
