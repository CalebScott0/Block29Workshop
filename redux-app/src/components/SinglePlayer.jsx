import { useParams, useNavigate } from "react-router-dom";
import { useGetPlayerByIdQuery } from "../api/puppyBowlApi";

export default function SinglePlayer() {
  let { player_id } = useParams();
  const { data = {}, error, isLoading } = useGetPlayerByIdQuery(player_id);
  const navigate = useNavigate();

  return (
    <div className="single-player">
      {error && <p className="alt">Something went wrong, please try again!</p>}
      {isLoading && <p className="alt">Loading Player...</p>}
      <button onClick={() => {navigate(-1)}}>Go Back</button>
    </div>
  );
}
