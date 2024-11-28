import React, { useEffect } from "react";
import gsap from "gsap";
import "./AudioButton.css";

const AudioButton = () => {
  useEffect(() => {
    const audio = document.getElementById("myAudio");
    const audioButtonLines = document.querySelectorAll(".audio-button__line");

    // Mute the audio by default
    audio.muted = true;

    // Variable to hold the GSAP animation
    let audioAnimation;

    // Function to toggle audio playback and animation
    const toggleAudio = () => {
      if (audio.paused) {
        audio.muted = false;
        audio.play();

        // Start the animation if it's not already running
        if (!audioAnimation || audioAnimation.paused()) {
          audioAnimation = gsap.to(audioButtonLines, {
            repeat: -1,
            yoyo: true,
            stagger: {
              amount: 0.5,
              each: 0.1,
            },
            ease: "power1.inOut",
            duration: 0.5,
            scaleY: (index) => 1 + index * 0.3, // Different scale for each line
          });
        }
      } else {
        audio.pause();

        // Stop the animation
        if (audioAnimation) {
          audioAnimation.pause(); // This pauses the animation
          gsap.to(audioButtonLines, {
            scaleY: 0.1,
            duration: 0.2,
            clearProps: "all",
          });
        }
      }
    };

    // Assign the toggleAudio function to window
    window.toggleAudio = toggleAudio;
  }, []);

  return (
    <>
      <div className="audio-button" onClick={() => window.toggleAudio()}>
        <div className="audio-button__inner">
          <div className="audio-button__line"></div>
          <div className="audio-button__line"></div>
          <div className="audio-button__line"></div>
          <div className="audio-button__line"></div>
          <div className="audio-button__line"></div>
        </div>
      </div>
      <audio id="myAudio" src="/sfx.webm"></audio>
    </>
  );
};

export default AudioButton;
