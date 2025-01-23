import React from "react";
import Banner from "./Layout";
import { Content } from "./Layout/Content";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Login from "./pages/Login";
import JobRegistration from "./pages/JobRegistration";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Banner />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/job" element={<JobRegistration />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
