import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./VideoContent.css";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import {
  ChapterTitle,
  MediaPlayer,
  MediaProvider,
  Title,
} from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import axios from "axios";
import Sidecard from "../UI/Sidecard";

function VideoContent() {
  const { courseId } = useParams();
  const [course, setCourse] = useState([]);

  // Fetch videos from server
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`http://localhost:3000/videos/${courseId}`);
      setCourse(res.data);
      console.log(res.data);
    };
    fetchVideos();
    scrollTo(top);
  }, []);

  const courseVideo = course.length > 0 ? course[0]?.course_video_link : "";

  // Check if the video exists before using it in the src URL
  const videoSrc = courseVideo
    ? `http://localhost:3000/video/${courseVideo.split("/").pop()}`
    : "";

  return (
    <>
      <div className="side-content">
          <div className="sc-video">
            {course.map((value2,index)=>(
              <Sidecard course_video_title={value2.course_video_title}/>
            ))}
            
          </div>
      </div>
      <div className="main-flex">
        <div className="video">
          {videoSrc && (
            <MediaPlayer
              preload="none"
              src={videoSrc}
              className="z-0"
              media={{
                disableCast: true, // Explicitly disable cast functionality
              }}
            >
              <MediaProvider />
              <DefaultVideoLayout
                slots={{ googleCastButton: null }}
                // thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt"
                // thumbnails={videoSrc}
                icons={defaultLayoutIcons}
                noKeyboardAnimations="true"
                noAudioGain="true"
                noModal="true"
              />
            </MediaPlayer>
          )}
        </div>
      </div>
    </>
  );
}

export default VideoContent;
