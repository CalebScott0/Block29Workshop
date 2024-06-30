import { useAddPlayerMutation } from "../api/puppyBowlApi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
export default function NewPlayerForm() {
  
  const [err, setErr] = useState(null);
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
    event.preventDefault();
    if (!data.teamId) {
      data.teamId = null;
    }
    try {
      addPlayer(data);
    } catch (error) {
      console.log(error);
      setErr("Unable to add player, please try again!");
    }
  };
  const handleClick = () => {
    try {
      navigate("/all-players");
    } catch (error) {
      console.log(error);
      setErr("Trouble loading all players, please try again!");
    }
  };

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);

  return (
    <div className="form">
      <h2>Player Sign-Up Form</h2>
      {err && <h2 className="error">{err}</h2>}
      <form id="new-player-form" onSubmit={handleSubmit(onSubmit)}>
        <label>
          Name:
          <input name="name" {...register("name", {
            required: "Player name is required",
            pattern: {
              value: /^[a-z]+$/gi,
              message: "Player name should only contain letters"
            }
          })} />
        </label>
        {errors.name && <p className="form-error">{errors.name.message}</p>}
        <label>
          Breed:
          <input name="breed" {...register("breed", {
            required: "Breed is required",
            pattern: {
              value: /^[a-z]+$/gi,
              message: "Breed should contain only letters"
            }
          })} />
        </label>
        {errors.breed && <p className="form-error">{errors.breed.message}</p>}
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
            {...register("imageUrl", {
              required: "Enter a image url for your player",
            })}
          />
        </label>
        {errors.imageUrl && <p className="form-error">{errors.imageUrl.message}</p>}
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
