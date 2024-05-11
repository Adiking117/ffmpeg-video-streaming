import { useState, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import VideoPlayer from "./VideoPlayer";

function App() {
  const playerRef = useRef(null);
  const [videoLink, setVideoLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    try {
      const response = await fetch(
        "http://localhost:8000/uploads",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      console.log("data",data)
      setVideoLink(data?.videoUrl)
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };


  const videoPlayerOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: videoLink,
        type: "application/x-mpegURL",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    player.on("waiting", () => {
      console.log("Player is waiting");
    });

    player.on("dispose", () => {
      console.log("Player will dispose");
    });
  };

  const handlePlay = () => {};

  return (
    <>
    <form name="fileInputForm" onSubmit={handleSubmit}>
      <input
        type="file"
        name="file"
        accept="video/*"
        style={{}}
        // onChange={handleFileChange}
      />
      <input type="submit" value="Submit"/>
      </form>
      <div>
        <h1>Video player</h1>
      </div>
      <button onClick={() => handlePlay()}>Play</button>
      <VideoPlayer options={videoPlayerOptions} onReady={handlePlayerReady} />
    </>
  );
}

export default App;
