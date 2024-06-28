import { useState } from "react";
import "./App.css";
import HomePage from "../components/HomePage";
import AllPlayers from "../components/AllPlayers";
import NavBar from "../components/NavBar";
import NewPlayerForm from "../components/NewPlayerForm";
import SearchBar from "../components/SearchBar";
import SinglePlayer from "../components/SinglePlayer";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/all-players">All Players</Link>
    </nav>
      <Routes>
        <Route path = "/" element={<HomePage />}></Route>
        <Route path = "/all-players" element={<AllPlayers />}></Route>
        {/* <NavBar /> */}
        {/* <NewPlayerForm /> */}
        {/* <SearchBar /> */}
        {/* <SinglePlayer /> */}
      </Routes>
    </>
  );
}

export default App;
