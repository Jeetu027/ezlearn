import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./VideoContent.css";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { ChapterTitle, MediaPlayer, MediaProvider, Title } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import axios from "axios";

function VideoContent() {
  const videonum = useParams();
  const [videos, setVideos] = useState([]);

  // Fetch videos from server
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get("http://localhost:3000/videos");
      setVideos(res.data);
      // console.log(res.data[0].course_video);
    };
    fetchVideos();
  }, []);

  const courseVideo = videos.length > 0 ? videos[0]?.course_video : "";

  // Check if the video exists before using it in the src URL
  const videoSrc = courseVideo ? `http://localhost:3000/video/${courseVideo.split('/').pop()}` : '';

  return (
    <>
      <div className="main-flex">
        <div className="main-grid">
          <div className="main-video">
            <div className="video">
              {/* Ensure the videoSrc is a valid URL before passing it to MediaPlayer */}
              {videoSrc && (
                <MediaPlayer
                  preload="none"
                  src={videoSrc}
                  media={{
                    disableCast: true, // Explicitly disable cast functionality
                  }}  
                >
                  <MediaProvider />
                  <DefaultVideoLayout
                    slots={{ googleCastButton: null }}
                    thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"
                    icons={defaultLayoutIcons}
                    noKeyboardAnimations="true"
                    noAudioGain="true"
                    noModal="true"
                  />
                </MediaPlayer>
              )}
            </div>
          </div>
          <div className="side-content">
            <div className="side-flex">
              <div className="bar"></div>
              <div className="sc-video"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoContent;
