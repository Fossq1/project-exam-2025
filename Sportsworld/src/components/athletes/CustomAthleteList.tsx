import { useContext, useRef, useState, type ChangeEvent } from "react";
import { AthleteContext } from "../../contexts/AthleteContext";
import type { IAthleteContext } from "../../interfaces/IAthleteContext";
import type { IAthlete } from "../../interfaces/IAthlete";
import AthleteItem from "./AthleteItem";

const CustomAthleteList = () => {
  const { athletes, saveImage, insertAthlete } = useContext(
    AthleteContext
  ) as IAthleteContext;

  // Lager state for error-handling
  const [statusMessage, setStatusMessage] = useState("Enter name and capacity");
  const [statusMessageColor, setstatusMessageColor] = useState<boolean | null>(
    null
  );

  // Håndterer bildeopplastning

  const [image, setImage] = useState<File | null>(null);

  const setImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files != null) {
      const file = files[0];
      setImage(file);
    }
  };

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
    setStatusMessage("");

    if (!nameInput.current || nameInput.current.value.trim() === "") {
      setStatusMessage("Name is required");
      return;
    }

    if (!genderInput.current || genderInput.current.value.trim() === "") {
      setStatusMessage("Gender is required");
      return;
    }

    if (!priceInput.current || priceInput.current.value.trim() === "") {
      setStatusMessage("Price is required");
      setstatusMessageColor(false);
      return;
    }

    if (!image) {
      setStatusMessage("Error, you have to select an image");
      return;
    }

    try {
      const imageResponse = await saveImage(image);

      if (!imageResponse.success) {
        setStatusMessage("Failed to upload image");
        return;
      } else {
        setStatusMessage("Added athlete");
        setstatusMessageColor(true);
      }

      const newAthlete: IAthlete = {
        name: nameInput.current.value,
        gender: genderInput.current.value,
        price: Number(priceInput.current.value),
        purchaseStatus: false,
        image: imageResponse.path,
      };

      const athleteResponse = await insertAthlete(newAthlete);

      if (!athleteResponse.success) {
        setStatusMessage("Failed to save athlete");
        return;
      }
    } catch {
      setStatusMessage("Unexpected error occurred");
    }
  };
  return (
    <section
      className="
    max-w-7xl
    mx-auto
    px-4
    py-8
    grid
    grid-cols-1
    gap-12
    "
    >
      <article
        className="
    border
    rounded-xl
    p-6
    w-full
    max-w-md
    mx-auto
    shadow-lg
  "
      >
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Add your athlete
        </h1>

        <div className="flex flex-col gap-3">
          <label className="text-left">Name</label>
          <input className="border p-2 rounded" ref={nameInput} type="text" />

          <label className="text-left">Gender</label>
          <input className="border p-2 rounded" ref={genderInput} type="text" />

          <label className="text-left">Price</label>
          <input className="border p-2 rounded" ref={priceInput} type="text" />

          <label className="text-left">Image</label>
          <input
            onChange={setImageHandler}
            type="file"
            className="p-4 border rounded-sm "
          />

          {statusMessageColor !== null && (
            <p
              className={`text-center ${
                statusMessageColor ? "text-green-600" : "text-red-600"
              }`}
            >
              {statusMessage}
            </p>
          )}

          <button
            onClick={handleSaveAthlete}
            className="
        mt-4
        bg-green-600
        hover:bg-green-700
        text-white
        py-2
        rounded
        transition
      "
          >
            Save
          </button>
        </div>
      </article>

      <section className="w-full">
        <div
          className="
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-4
      gap-6
    "
        >
          {getAllAthleteJSX()}
        </div>
      </section>
    </section>
  );
};

export default CustomAthleteList;
