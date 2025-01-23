import React from "react";
import Banner from "./Layout";
import { Content } from "./Layout/Content";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Login from "./pages/Login";
import JobRegistration from "./pages/JobRegistration";
import Specificjob from "./pages/Specificjob";
import ProfilePage from "./pages/ProfilePage";
import Apply from "./pages/Apply";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/job" element={<Banner />} />
        <Route path="/" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<JobRegistration />} />
        <Route path="/jobapply" element={<Specificjob />} />
        <Route path="/dashboard" element={<ProfilePage />} />
        <Route path="/apply" element={<Apply />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
