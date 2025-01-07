import React from "react";
import Navbar from "../NavBar/Navbar";
import { BrowserRouter, Routes, Route, useLocation,useMatch  } from "react-router-dom";
import Home from "../Home/Home";
import DiscoverCourse from "../Course/DiscoverCourse";
import MyCourse from "../Course/MyCourse";
import Footer from "../Footer/Footer";
import VideoContent from "../VideoContent/VideoContent";

function AllFiles() {
  return (
    <div>
      <BrowserRouter>
        <MainContent />
      </BrowserRouter>
    </div>
  );
}

function MainContent() {
  
  const isCoursePage = useMatch("/course/:courseId/:videoId");

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<DiscoverCourse />} />
        <Route path="/mycourses" element={<MyCourse />} />
        <Route path="/course/:courseId/:videoId" element={<VideoContent />} />
      </Routes>
      {!isCoursePage && <Footer />}
    </>
  );
}

export default AllFiles;
        