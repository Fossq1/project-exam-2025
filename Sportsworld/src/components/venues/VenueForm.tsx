import { useRef, useContext, useState, type ChangeEvent } from "react";
import { VenueContext } from "../../contexts/VenueContext";
import type { IVenueContext } from "../../interfaces/IVenueContext";
import type { IVenue } from "../../interfaces/IVenue";

const VenueForm = () => {
  const { saveVenue, venues } = useContext(VenueContext) as IVenueContext;

  const nameInput = useRef<HTMLInputElement>(null);
  const capacityInput = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);
  const [selectedVenue, setSelectedVenue] = useState<IVenue | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [isOk, setIsOk] = useState<boolean | null>(null);
  const [showVenues, setShowVenues] = useState<boolean>(false); // NY STATE

  const endpoint = "http://localhost:5177/"; // Endepunkt for bilder

  const setImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSaveVenue = async () => {
    if (!nameInput.current || !capacityInput.current || nameInput.current.value.trim() === "" || capacityInput.current.value.trim() === "") {
      setIsOk(false);
      setStatusMessage("Name and capacity are required");
      return;
    }

    const newVenue: IVenue = {
      id: selectedVenue?.id,
      name: nameInput.current.value,
      capacity: Number(capacityInput.current.value),
      image: image ? `images/venues/${image.name}` : (selectedVenue?.image || "images/venues/default-image-venues.jpg"),
    };

    const response = await saveVenue(newVenue, image ?? undefined);

    if (response.success) {
      setIsOk(true);
      setStatusMessage(selectedVenue ? "Venue updated!" : "Venue added!");
      nameInput.current.value = "";
      capacityInput.current.value = "";
      setImage(null);
      setSelectedVenue(null);
    } else {
      setIsOk(false);
      setStatusMessage("Failed to save venue");
    }
  };

  const handleSelectVenue = (venue: IVenue) => {
    setSelectedVenue(venue);
    if (nameInput.current && capacityInput.current) {
      nameInput.current.value = venue.name;
      capacityInput.current.value = venue.capacity.toString();
    }
  };

  const handleDeleteVenue = async (venueId: number) => {
    try {
      const result = await fetch(`http://localhost:5177/venues/${venueId}`, { method: "DELETE" });
      if (!result.ok) throw new Error("Failed to delete venue");

      alert("Venue deleted!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete venue");
    }
  };

  return (
    <section className="border rounded-xl px-24 grid grid-cols-3 gap-4 text-center place-items-center">

      {/* ADD / UPDATE VENUE */}
      <article className="border rounded-xl p-4">
        <h3 className="text-xl mb-4">{selectedVenue ? "Update venue" : "Add venue"}</h3>

        <article className="flex flex-col gap-2 mb-4">
          <label>Name</label>
          <input className="border p-1" ref={nameInput} type="text" />

          <label>Capacity</label>
          <input className="border p-1" ref={capacityInput} type="number" />

          <label>
            Image (optional)
            <input type="file" onChange={setImageHandler} />
          </label>

          <button
            onClick={handleSaveVenue}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            {selectedVenue ? "Update venue" : "Save venue"}
          </button>

          {isOk !== null && (
            <p className={isOk ? "text-green-600" : "text-red-600"}>
              {statusMessage}
            </p>
          )}
        </article>
      </article>

      {/* SHOW VENUES BUTTON */}
      <article className="col-span-3">
        <button
          onClick={() => setShowVenues(!showVenues)}
          className="mt-4 bg-gray-600 text-white px-4 py-2 rounded"
        >
          {showVenues ? "Hide Venues" : "Show Venues"}
        </button>
      </article>

      {/* SHOW VENUES LIST */}
      {showVenues && (
  <section className="border rounded-xl col-span-3 p-4">
    <h3 className="text-xl mt-4 mb-4">Existing Venues</h3>
    <div className="grid grid-cols-3 gap-4">
      {venues.map((venue) => (
        <article key={venue.id} className="border rounded-xl p-4 flex flex-col justify-between">
          <article>
            <h4 className="font-semibold mb-2">{venue.name}</h4>
            <p className="mb-2">Capacity: {venue.capacity}</p>
            {venue.image && (
              <img
                src={`${endpoint}${venue.image}`}
                alt={venue.name}
                className="w-full h-32 object-cover rounded"
              />
            )}
          </article>
          <article className="flex justify-between mt-4">
            <button
              onClick={() => handleSelectVenue(venue)}
              className="bg-blue-600 text-white px-2 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteVenue(venue.id!)}
              className="bg-red-600 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </article>
        </article>
      ))}
    </div>
  </section>
)}
      
    </section>
  );
};

export default VenueForm;