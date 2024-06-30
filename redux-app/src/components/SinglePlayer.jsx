import { useParams, useNavigate } from "react-router-dom";
import { useGetPlayerByIdQuery } from "../api/puppyBowlApi";
import { useDeletePlayerMutation } from "../api/puppyBowlApi";
import { useState } from "react";
export default function SinglePlayer() {
  const [err, setErr] = useState(null);
  let { player_id } = useParams();

  const { data = {}, error, isLoading } = useGetPlayerByIdQuery(player_id);

  const navigate = useNavigate();

  const [deletePlayer] = useDeletePlayerMutation();

  const handleReturn = () => {
    try {
      navigate(-1);
    } catch (error) {
      setErr("Trouble loading all players, please try again!");
    }
  };

  const handleDelete = async (id) => {
    const result = await confirm(
      "Are you sure you want to delete this player?"
    );
    if (result) {
      try {
        deletePlayer(id);
        navigate("/all-players");
      } catch (error) {
        setErr("Unable to remove player, please try again!");
        console.log(error);
      }
    } else {
      return;
    }
  };

  if (error) {
    return <p className="alt error bold">Something went wrong, please try again!</p>;
  }
  if (isLoading) {
    return <p className="alt loading bold">Loading Player...</p>;
  }
  if (data.data) {
    const { name, id, breed, imageUrl, team, status } = data.data.player;

    return (
      <div className="single-player">
        {err && <h2 className="error">{err}</h2>}
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
            {team && (
              <p>
                <span className="bold">Team Score: </span>
                {team["score"]}
              </p>
            )}
          </div>
          <p>
            <span className="bold">Player Status: </span>
            {team
              ? status.charAt(0).toUpperCase().concat(status.slice(1))
              : "Team Unassigned"}
          </p>
          <div className="button-group">
            <button
              className="button"
              onClick={() => 
                handleReturn()
              }
            >
              Go Back
            </button>
            <button className="button" onClick={() => handleDelete(id)}>
              Delete Player
            </button>
          </div>
        </div>
      </div>
    );
  }
}
