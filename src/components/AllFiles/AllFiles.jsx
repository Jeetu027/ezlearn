import React from "react";
import Navbar from "../NavBar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import DiscoverCourse from "../Course/DiscoverCourse";
import MyCourse from "../Course/MyCourse";
import Footer from "../Footer/Footer";
import VideoContent from "../VideoContent/VideoContent";

function AllFiles() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<DiscoverCourse />} />
          <Route path="/mycourses" element={<MyCourse />} />
          <Route path="/course/:courseId" element={<VideoContent />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default AllFiles;
