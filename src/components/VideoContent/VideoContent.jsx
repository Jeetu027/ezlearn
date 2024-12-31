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
import Footer from "../Footer/Footer";

function VideoContent() {
  const { courseId, videoId } = useParams();
  const [course, setCourse] = useState([]);
  // const [coursenumber,setCoursenumber] = useState(0);

  // Fetch videos from server
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(
        `http://localhost:3000/videos/${courseId}/${videoId}`
      );
      setCourse(res.data);
      console.log(res.data);
    };
    fetchVideos();
    scrollTo(top);


  }, [videoId]);
  const coursenumber = course.length > 0 ? course[0]?.course_video_number : "";
  const courseVideo = course.length > 0 ? course[0]?.course_video_link : "";
  

  // Check if the video exists before using it in the src URL
  const videoSrc = courseVideo
    ? `http://localhost:3000/video/${courseVideo.split("/").pop()}`
    : "";

  return (
    <>
      <div className="side-content">
        <div className="sc-video">
          {course.slice(1).map((value, index) => (
            <Sidecard
              course_video_title={value.course_video_title}
              course_video_number={value.course_video_number}
              course_id={courseId}
              key={value.course_video_id}
            />
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
        <div className="videoDetail">
          <div className="videoTitle">
            {`${coursenumber} . `}
            {course[0]?.course_video_title}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default VideoContent;
