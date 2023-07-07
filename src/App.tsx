import { Routes, Route, Link, useLocation } from "react-router-dom";
import React from "react";

// pages
import Home from "./pages/Home";
import Create from "./pages/Create";
import Update from "./pages/Update";

// Components
import Title from "./components/Title";

function App() {
  const location = useLocation();

  return (
    <>
      <nav>
        <Title text="Supa Smoothies" />
        <Link to="/" className={`${location.pathname === "/" ? "active" : ""}`}>
          Home
        </Link>
        <Link
          to="/create"
          className={`${location.pathname === "/create" ? "active" : ""}`}
        >
          Create New Smoothie
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<Update />} />
      </Routes>
    </>
  );
}

export default App;
