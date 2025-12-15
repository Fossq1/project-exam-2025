import { useState, useRef, type ChangeEvent, useContext } from "react";
import { VenueContext } from "../contexts/VenueContext";
import { type IVenueContext } from "../interfaces/IVenueContext";
import { type IVenue } from "../interfaces/IVenue";

const AddVenuePage = () => {
  const { saveVenue } = useContext(VenueContext) as IVenueContext;

  const [image, setImage] = useState<File | null>(null);
  const nameInput = useRef<HTMLInputElement | null>(null);
  const capacityInput = useRef<HTMLInputElement | null>(null);

  const setImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) setImage(files[0]);
  };

  const handleSaveVenue = async () => {
    if (
      nameInput.current &&
      nameInput.current.value.trim() !== "" &&
      capacityInput.current &&
      capacityInput.current.value.trim() !== ""
    ) {
      const newVenue: IVenue = {
        name: nameInput.current.value,
        capacity: parseInt(capacityInput.current.value),
        image: "", // blir satt hvis bilde lastes opp
      };

      const response = await saveVenue(newVenue, image ?? undefined);

      if (response.success) {
        // Tømmer inputfeltene hvis lagring går bra
        nameInput.current.value = "";
        capacityInput.current.value = "";
        setImage(null);
        alert("Venue saved!");
      } else {
        alert("Failed to save venue");
      }
    } else {
      alert("Please fill in all required fields");
    }
  };

  return (
    <section className="border p-4 max-w-lg mx-auto">
      <h1 className="text-2xl mb-4">Add New Venue</h1>
      <div className="flex flex-col gap-2 mb-4">
        <label>Name</label>
        <input className="border p-1" ref={nameInput} type="text" />

        <label>Capacity</label>
        <input className="border p-1" ref={capacityInput} type="number" />

        <label>
          Image (optional)
          <input className="border p-1" type="file" onChange={setImageHandler} />
        </label>
      </div>
      <button
        onClick={handleSaveVenue}
        className="border px-4 py-2 bg-green-500 text-white rounded"
      >
        Save Venue
      </button>
    </section>
  );
};

export default AddVenuePage;