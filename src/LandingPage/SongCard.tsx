import Card from "../components/Card";
import { Tables } from "../utils/database.types";

type SongCardProps = Pick<Tables<"posts">, "text" | "url">;

function SongCard({ url, text }: SongCardProps) {
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
      <div className="px-4 py-2">{text}</div>
    </Card>
  );
}

export default SongCard;
