import { useFetchPlayersQuery } from "../api/puppyBowlApi";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";

export default function AllPlayers() {
  // When the component is first rendered, it will start the API fetch
  // It will re-render each time the fetch status changes (e.g., "loading", "data arrived", "error")
  const { data = {}, error, isLoading } = useFetchPlayersQuery();
  const navigate = useNavigate();
  return (
    <div className="players">
      {error && <p className="alt">Something went wrong, please try again!</p>}
      {isLoading && <p className="alt">Loading Players...</p>}
      {/* <SearchBar /> */}
      {data.data &&
        data.data.players.map((player) => (
          <div key={player.id} className="player-card">
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
              <button
                className="button"
                onClick={() => navigate(`/player/${player["id"]}`)}
              >
                See more info
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
