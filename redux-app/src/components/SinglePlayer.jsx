import { useParams } from "react-router-dom";
import { useGetPlayerByIdQuery } from "../api/puppyBowlApi";

export default function SinglePlayer() {
  let { player_id } = useParams();
  const { data = {}, error, isLoading } = useGetPlayerByIdQuery(player_id);

  return (
    <div className="single-player">
      {error && <p className="alt">Something went wrong, please try again!</p>}
      {isLoading && <p className="alt">Loading Players...</p>}
    </div>
  );
}
// https://reactrouter.com/en/main/components/link
