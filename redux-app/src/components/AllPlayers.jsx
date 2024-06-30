import { useState } from "react";
import { useFetchPlayersQuery } from "../api/puppyBowlApi";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";

export default function AllPlayers() {
  // When the component is first rendered, it will start the API fetch
  // It will re-render each time the fetch status changes (e.g., "loading", "data arrived", "error")
  const { data = {}, error, isLoading } = useFetchPlayersQuery();

  const navigate = useNavigate();

  // component state for player search feature
  const [searchParamter, setSearchParameter] = useState("");

  const [err, setErr] = useState(null);

  const handleClick = (id) => {
    try {
      navigate(`/player/${id}`);
    } catch (error) {
      setErr("Unable to load player, please try again!");
      console.log(error);
    }
  };

  let newData;
  if (data.data) {
    newData = data.data.players;
  }

  const playersToDisplay =
    searchParamter && newData
      ? newData.filter((player) => {
          return player.name
            .toLowerCase()
            .includes(searchParamter.toLowerCase());
        })
      : newData;

  return (
    <div className="players">
      {error && <p className="alt error bold">Something went wrong, please try again!</p>}
      {isLoading && <p className="alt loading bold">Loading Players...</p>}
      {playersToDisplay && (
        <div className="player-heading">
          <h2>Click on a player to see more details</h2>
          {err && <h2 className="error">{err}</h2>}
          <SearchBar
            searchParamter={searchParamter}
            setSearchParameter={setSearchParameter}
          />
        </div>
      )}
      {playersToDisplay &&
        playersToDisplay.map((player) => (
          <div
            key={player.id}
            className="player-card"
            onClick={() => handleClick(player.id)}
          >
            <div className="player-image-container">
              <img src={player["imageUrl"]} alt={player["name"]} />
            </div>
            <div className="player-details">
              <h2>{player["name"]}</h2>
              <p>
                <span className="bold">Breed: </span>
                {player["breed"]}
              </p>
              {player.teamId === 730 && (
                <p>
                  <span className="bold">Team: </span>
                  {"Ruff"}
                </p>
              )}
              {player.teamId === 731 && (
                <p>
                  <span className="bold">Team: </span>
                  {"Fluff"}
                </p>
              )}
              {!player.teamId && (
                <p>
                  <span className="bold">Team: </span>
                  {"Unassigned"}
                </p>
              )}
              <button className="button" onClick={() => handleClick(player.id)}>
                See more info
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
