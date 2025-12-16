import { useContext, useRef, useState } from "react";
import { type IAthlete } from "../../interfaces/IAthlete";
import { AthleteContext } from "../../contexts/AthleteContext";
import { type IAthleteContext } from "../../interfaces/IAthleteContext";

const endpoint = "http://localhost:5177/";

//TODO:  BUTTONS SKAL HA ONCLICK I KOMMUNIKASJON MED FINANCE

const AthleteItem = ({ athlete }: { athlete: IAthlete }) => {
  const { deleteAthlete, updateAthlete } = useContext(
    AthleteContext
  ) as IAthleteContext;

  const [isEditing, setIsEditing] = useState(false);

  const nameInput = useRef<HTMLInputElement | null>(null);
  const genderInput = useRef<HTMLInputElement | null>(null);
  const priceInput = useRef<HTMLInputElement | null>(null);

  const editCheck = () => {
    if (isEditing) {
      return (
        <article>
          <input
            defaultValue={athlete.name}
            className="text-xl border px-4"
            ref={nameInput}
            type="text"
          />
          <input
            defaultValue={athlete.gender}
            className="text-sm pb-4 px-4 border"
            ref={genderInput}
            type="text"
          />
          <h4 className="text-sm">
            {athlete.purchaseStatus ? "Purchased" : "Not Purchased"}
          </h4>
          <input
            defaultValue={athlete.price}
            className="text-xl border px-4"
            ref={priceInput}
            type="text"
          />
          <div>
            <button onClick={saveButton}>Save</button>
            <button onClick={cancelButton}>Cancel</button>
          </div>
        </article>
      );
    } else {
      return (
        <div>
          <h3 className="text-xl">{athlete.name}</h3>
          <h4 className="text-sm pb-4">{athlete.gender}</h4>
          <h4 className="text-sm">
            {athlete.purchaseStatus ? "Purchased" : "Not Purchased"}
          </h4>
          <h4 className="text-xl">{athlete.price}$</h4>
          {buyButton()}
          <div className="py-2 flex gap-2 justify-center">
            <button className="border px-2" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button
              className="border px-2"
              onClick={() => athlete.id && deleteAthlete(athlete.id)}
            >
              Delete
            </button>
          </div>
        </div>
      );
    }
  };

  const buyButton = () => {
    if (athlete.purchaseStatus) {
      return <p className="pt-8">Athlete is unavailable</p>;
    } else {
      return (
        <section className="pt-8 flex justify-evenly">
          <button className="border bg-black-500 border-green-500 p-1 px-8 rounded-lg">
            Buy
          </button>
        </section>
      );
    }
  };

  const saveButton = () => {
    const updatedAthlete: IAthlete = {
      id: athlete.id,
      name: nameInput.current?.value || athlete.name,
      gender: genderInput.current?.value || athlete.gender,
      purchaseStatus: athlete.purchaseStatus,
      price: parseFloat(priceInput.current?.value || athlete.price.toString()),
      image: athlete.image,
    };

    updateAthlete(updatedAthlete);
    setIsEditing(false);
  };

  const cancelButton = () => {
    setIsEditing(false);
  };

  return (
    <article className="duration-100 scale-85 hover:scale-88 border border-red-600 border-[5px] rounded-lg pb-8 shadow-2xl">
      <img
        className="block mx-auto h-auto w-xs pb-8 "
        src={`${endpoint}${athlete.image}`}
        alt={athlete.name}
      />
      {editCheck()}
    </article>
  );
};

export default AthleteItem;
