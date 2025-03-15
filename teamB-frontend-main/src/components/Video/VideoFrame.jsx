import React, { useState } from "react";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

const VideoFrame = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const videoURL = "https://www.youtube.com/embed/dQw4w9WgXcQ"; //Example HIHI

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    const iframe = document.querySelector("iframe");
    const message = isPlaying ? "pause" : "play";
    iframe.contentWindow.postMessage(`{"event":"command","func":"${message}Video","args":""}`, "*");
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    const iframe = document.querySelector("iframe");
    const message = isMuted ? "unMute" : "mute";
    iframe.contentWindow.postMessage(`{"event":"command","func":"${message}","args":""}`, "*");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
      <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`${videoURL}?enablejsapi=1`}
          title="Video Player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="flex justify-center items-center space-x-4 mt-4">
        <button
          onClick={togglePlay}
          className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300"
        >
          {isPlaying ? (
            <>
              <FaPause className="w-4 h-4" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <FaPlay className="w-4 h-4" />
              <span>Play</span>
            </>
          )}
        </button>

        <button
          onClick={toggleMute}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
        >
          {isMuted ? (
            <>
              <FaVolumeMute className="w-4 h-4" />
              <span>Unmute</span>
            </>
          ) : (
            <>
              <FaVolumeUp className="w-4 h-4" />
              <span>Mute</span>
            </>
          )}
        </button>
      </div>

      <div className="mt-4 text-center">
        <h2 className="text-xl font-bold text-gray-800">Introduction Video</h2>
        <p className="text-gray-600 mt-2">
          Watch this video to learn more about our Charity Organization.
        </p>
      </div>
    </div>
  );
};

export default VideoFrame;