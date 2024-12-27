import React from "react";
import { useParams } from "react-router-dom";
import "./VideoContent.css";

function VideoContent() {
  const videonum = useParams();

  return (
    <>
      <div className="main-flex">
        <div className="main-grid">
          <div className="main-video">
            <div className="video">

            </div>
          </div>
          <div className="side-content">
            <div className="side-flex">
              <div className="bar">

              </div>
              <div className="sc-video">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoContent;
