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
  // useEffect(() => {
  //   const fetchVideos = async () => {
  //     const res = await axios.get(
  //       `http://localhost:3000/videos/${courseId}/${videoId}`
  //     );
  //     setCourse(res.data);
  //     console.log(res.data);
  //   };
  //   fetchVideos();
  //   scrollTo(top);
  //}, [videoId]);

  //new

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/videos/${courseId}/${videoId}`
        );
        setCourse(res.data);
      } catch (err) {
        setError("Failed to load videos. Please try again later.");
        console.error(err);
      }
    };
    fetchVideos();
    window.scrollTo(0, 0); // Scroll to the top on video change
  }, [courseId, videoId]);

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
          {course
            .slice(1) // Skip the first item
            .sort((a, b) => a.course_video_number - b.course_video_number) // Sort by course_video_number
            .map((value, index) => (
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
              style={{ borderRadius: "25px", overflow: "hidden" }}
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
         <br/><br />
          <div className="description">
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          <br /><br />
          <p>
            Date Published : 01/01/2025
          </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default VideoContent;
