import React from "react";
import Banner from "./Layout";
import { Content } from "./Layout/Content";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Banner />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
