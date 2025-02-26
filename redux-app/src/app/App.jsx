import { useState } from "react";
import "./App.css";
import HomePage from "../components/HomePage";
import AllPlayers from "../components/AllPlayers";
import NavBar from "../components/NavBar";
import NewPlayerForm from "../components/NewPlayerForm";
import SinglePlayer from "../components/SinglePlayer";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
  
      <NavBar />
      <Routes>
        <Route path = "/" element={<HomePage />}></Route>
        <Route path = "/all-players" element={<AllPlayers />}></Route>
        <Route path="/player/:player_id" element={<SinglePlayer />}></Route>
        <Route path = "/new-player-form" element={<NewPlayerForm />}></Route>
      </Routes>
    </div>
  );
}

export default App;
