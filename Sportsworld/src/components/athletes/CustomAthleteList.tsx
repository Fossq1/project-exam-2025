import { useContext, useRef } from "react";
import { AthleteContext } from "../../contexts/AthleteContext";
import type { IAthleteContext } from "../../interfaces/IAthleteContext";
import type { IAthlete } from "../../interfaces/IAthlete";
import AthleteItem from "./AthleteItem";

const CustomAthleteList = () => {
  const { athletes, saveAthlete } = useContext(
    AthleteContext
  ) as IAthleteContext;

  const nameInput = useRef<HTMLInputElement | null>(null);
  const genderInput = useRef<HTMLInputElement | null>(null);
  const priceInput = useRef<HTMLInputElement | null>(null);

  const getAllAthleteJSX = () => {
    const allAthleteJSX = athletes.map((athlete, index) => {
      return <AthleteItem key={"Athlete" + index} athlete={athlete} />;
    });
    return allAthleteJSX;
  };

  const handleSaveAthlete = async () => {
    if (
      nameInput.current &&
      nameInput.current.value.trim() != "" &&
      genderInput.current &&
      genderInput.current.value.trim() != "" &&
      priceInput.current &&
      priceInput.current.value.trim() != ""
    ) {
      const newAthlete: IAthlete = {
        name: nameInput.current.value,
        gender: genderInput.current.value,
        price: parseFloat(priceInput.current.value),
        purchaseStatus: false,
      };
      try {
        const response = await saveAthlete(newAthlete);
      } catch {
        // TODO
      }
    }
  };
  return (
    <section className="border">
      <h1>Add your athlete</h1>
      <div>
        <label>Name</label>
        <input className="border" ref={nameInput} type="text" />
        <label>Gender</label>
        <input className="border" ref={genderInput} type="text" />
        <label>Price</label>
        <input className="border" ref={priceInput} type="text" />
      </div>
      <div>
        <button onClick={handleSaveAthlete} className="border px-4">
          Save
        </button>
      </div>
      <div className="grid px-24 grid grid-cols-4 gap-4 text-center place-items-center4">
        {getAllAthleteJSX()}
      </div>
    </section>
  );
};

export default CustomAthleteList;
