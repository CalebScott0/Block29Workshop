import { useParams, useNavigate } from "react-router-dom";
import { useGetPlayerByIdQuery } from "../api/puppyBowlApi";

export default function SinglePlayer() {
  let { player_id } = useParams();
  const { data = {}, error, isLoading } = useGetPlayerByIdQuery(player_id);
  const navigate = useNavigate();
  if (error) {
    return <p className="alt">Something went wrong, please try again!</p>;
  }
  if (isLoading) {
    return <p className="alt">Loading Player...</p>;
  }
  if (data.data) {
    const { name, id, breed, imageUrl, team, status } = data.data.player;

    return (
      <div className="single-player">
        <div className="single-player-card">
          <h2>{name}</h2>
          <p>
            <span className="bold">Player Id: </span>
            {id}
          </p>
          <div className="single-player-image-container">
            <img src={imageUrl} alt={name}></img>
          </div>
          <div className="single-player-details">
            <p>
              <span className="bold">Breed: </span>
              {breed} 
            </p>
              <p>
                <span className="bold">Team: </span>
                {team ? team["name"] : "Unassigned"}
              </p>
              {team && <p><span className="bold">Team Score: </span>{team['score']}</p>}
          </div>
           <p>
                <span className="bold">Player Status: </span>
                {team ? status.charAt(0).toUpperCase().concat(status.slice(1)) : ("Team Unassigned")}
              </p>
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
}
