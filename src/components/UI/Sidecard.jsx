import React from "react";
import "./Sidecard.css";
import { Link } from "react-router-dom";

function Sidecard(props) {
  return (
    <>
      <Link to={`/course/${props.course_id}/${props.course_video_number}`}>
        <div className="side-card">
          <img src="/image4.png" alt="" />

          <div className="course-title">{props.course_video_title}</div>
        </div>
      </Link>
    </>
  );
}

export default Sidecard;
