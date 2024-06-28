import { useFetchPlayersQuery } from "../api/puppyBowlApi";
import SearchBar from './SearchBar'

export default function AllPlayers() {
  // When the component is first rendered, it will start the API fetch
  // It will re-render each time the fetch status changes (e.g., "loading", "data arrived", "error")
  const { data = {}, error, isLoading } = useFetchPlayersQuery();

  return (
    <div className="players">
      {error && <p>Something went wrong, please try again!</p>}
      {isLoading && <p>Loading Players...</p>}
      {/* <SearchBar /> */}
      {data.data &&
        data.data.players.map((player) => (
          <div key={player.id} className="player-card">
            <div className="player-image-container">
              <img src={player["imageUrl"]} alt={player["name"]} />
            </div>
            <div className="player-details">
              <h2>{player["name"]}</h2>
              <p><span className="bold">Breed: </span>{player["breed"]}</p>
              <p><span className="bold">Status: </span>{player["status"]}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
