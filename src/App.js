import React from "react";
import VideoScene from "./components/VideoScene";
import EarthScene from "./components/EarthScene";
import TextAnimation from "./components/TextAnimation";
import AudioButton from "./components/AudioButton";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./font.css";
import "./App.css";

const App = () => {
  return (
    <>
      <VideoScene />
      <EarthScene />
      <TextAnimation />
      <AudioButton />
    </>
  );
};

export default App;
