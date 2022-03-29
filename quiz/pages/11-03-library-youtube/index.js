import ReactPlayer from "react-player";

export default function LibraryYoutubePage() {
  return (
    <ReactPlayer
      url="https://www.youtube.com/watch?v=v224EdAkZr8"
      width={800}
      height={600}
      playing={true}
      muted={true}
    />
  );
}
