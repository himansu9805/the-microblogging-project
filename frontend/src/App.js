import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import Navbar from "./components/Navbar";
// import { Footer } from "./components/Footer";
import "./assets/styles/common.scss";

function App() {
  return (
    <div className="mx-8 md:mx-20">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/signup"} element={<Home />} />
          <Route path={"/login"} element={<Home />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
