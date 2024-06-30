import { useAddPlayerMutation } from "../api/puppyBowlApi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function NewPlayerForm() {
  const [addPlayer] = useAddPlayerMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      name: "",
      breed: "",
      status: "bench",
      imageUrl: "",
      teamId: null,
    },
  });

  const navigate = useNavigate();

  const onSubmit = (data, event) => {
    if (!data.teamId) {
      data.teamId = null;
    }
    event.preventDefault();
    try {
      addPlayer(data);
      // navigate('/all-players');
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = () => {
    try {
      navigate("/all-players");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);

  return (
    <div className="form">
      <h2>Player Sign-Up Form</h2>
      <form id="new-player-form" onSubmit={handleSubmit(onSubmit)}>
        <label>
          Name:
          <input name="name" {...register("name")} />
        </label>
        <label>
          Breed:
          <input name="breed" {...register("breed")} />
        </label>
        <fieldset>
          <legend>Status:</legend>
          <label>
            <input
              type="radio"
              name="status"
              value="bench"
              {...register("status")}
              checked
            />
            Bench
          </label>
          <label>
            <input
              type="radio"
              name="status"
              value="field"
              {...register("status")}
            />
            Field
          </label>
        </fieldset>
        <label>
          Player Image:
          <input
            name="imageUrl"
            placeholder="Image Url"
            {...register("imageUrl")}
          />
        </label>
        <label>
          Team Name:
          <select name="teamId" form="new-player-form" {...register("teamId")}>
            <option value="">Select a team (optional)</option>
            <option value={730}>Ruff</option>
            <option value={731}>Fluff</option>
          </select>
        </label>
        <div className="button-group">
          <input className="button" type="submit" />
          <button className="button" onClick={() => handleClick()}>
            Return to Players
          </button>
        </div>
      </form>
    </div>
  );
}
