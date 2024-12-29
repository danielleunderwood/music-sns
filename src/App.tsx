import "./App.css";
import SongCard from "./SongCard";

function App() {
  return (
    <>
      <div className="w-full max-w-[48rem] min-w-0">
        <SongCard
          url="https://soundcloud.com/jaiwolfmusic/track-5"
          text="This song reminded me of you! 1"
        />
      </div>
    </>
  );
}

export default App;
