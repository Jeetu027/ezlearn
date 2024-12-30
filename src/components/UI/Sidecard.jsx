import React from 'react'
import "./Sidecard.css"

function Sidecard(props) {
  return (
    <>
        <div className="side-card">
           
                <img src="/image4.png" alt="" />
           
            <div className="course-title">
                {props.course_video_title}
            </div>
        </div>
    </>
  )
}

export default Sidecard
