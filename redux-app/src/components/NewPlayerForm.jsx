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

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);

  return (
    <div className="new-player-form">
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
            Bench
            <input
              type="radio"
              name="status"
              value="bench"
              {...register("status")}
              checked
            />
          </label>
          <label>
            Field
            <input
              type="radio"
              name="status"
              value="field"
              {...register("status")}
            />
          </label>
        </fieldset>
        <label>
          Player Image:
          <input name="imageUrl" {...register("imageUrl")} />
        </label>
        <label>
          Team Name (optional):
          <select name="teamId" form="new-player-form" {...register("teamId")}>
            <option value="">Select a team (optional)</option>
            <option value={730}>Ruff</option>
            <option value={731}>Fluff</option>
          </select>
        </label>
        <input type="submit" />
      </form>
    </div>
  );
}
