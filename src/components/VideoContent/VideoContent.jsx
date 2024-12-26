import React from 'react'
import { useParams } from 'react-router-dom'

function VideoContent() {

    const videonum = useParams();


  return (
    <div>
      {videonum.courseId}
    </div>
  )
}

export default VideoContent
