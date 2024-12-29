import Card from "./components/Card";

interface SongCardProps {
  url: string;
  text: string;
}

function SongCard({ url, text }: SongCardProps) {
  return (
    <Card>
      <div style={{ height: "230px" }}>
        <iframe
          className="rounded-t-xl"
          width="100%"
          height="100%"
          src={`https://embed.odesli.co/?url=${url}&theme=dark`}
          sandbox="allow-same-origin allow-scripts allow-presentation allow-popups allow-popups-to-escape-sandbox"
        />
      </div>
      {text}
    </Card>
  );
}

export default SongCard;
