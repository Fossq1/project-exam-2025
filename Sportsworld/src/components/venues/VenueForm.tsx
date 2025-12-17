import { useRef, useContext, useState, type ChangeEvent } from "react";
import { VenueContext } from "../../contexts/VenueContext";
import type { IVenueContext } from "../../interfaces/IVenueContext";
import type { IVenue } from "../../interfaces/IVenue";

// Handling all inputs for CRUD

const VenueForm = () => {
  const { venues, saveVenue, updateVenue, deleteVenue } = useContext(
    VenueContext
  ) as IVenueContext;

  const nameInput = useRef<HTMLInputElement>(null);
  const capacityInput = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<File | null>(null);
  const [selectedVenue, setSelectedVenue] = useState<IVenue | null>(null);
  const [statusMessage, setStatusMessage] = useState("Enter name and capacity");
  const [statusMessageColor, setstatusMessageColor] = useState<boolean | null>(
    null
  ); // false = red text color, true = green text color

  const endpoint = "http://localhost:5177/";

  const setImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) setImage(e.target.files[0]);
  };

  // Resetting the inputfields when the button is pressed && putting the statusmessage after 2.5 seconds
  const resetForm = () => {
    setTimeout(() => {
      setStatusMessage("Enter name and capacity or choose a venue to edit");
      setstatusMessageColor(true);
    }, 2500);

    if (nameInput.current) nameInput.current.value = "";
    if (capacityInput.current) capacityInput.current.value = "";
    setImage(null);
    setSelectedVenue(null);
  };

  // SaveVenue (Add/update venue is handled here)
  const handleSaveVenue = async () => {
    if (
      !nameInput.current ||
      !capacityInput.current ||
      nameInput.current.value.trim() === "" ||
      capacityInput.current.value.trim() === ""
    ) {
      setstatusMessageColor(false);
      setStatusMessage(
        "Please enter name and capacity or choose a venue to edit"
      );
      return;
    }
    //Checking to see if a venue is selected, if no venue is selected insert new venue
    try {
      if (!selectedVenue) {
        // New venue, using Omit to "create" the venue without an id, the id is set from the database when the setvenuesFromService is called
        const newVenue: Omit<IVenue, "id"> = {
          name: nameInput.current.value,
          capacity: Number(capacityInput.current.value),
          image: "", // Is set in context via saveVenue
        };

        const response = await saveVenue(newVenue, image ?? undefined);
        if (!response.success) throw new Error("Failed to save venue");
        setStatusMessage("Venue added!");
      } else {
        // Update existing venue, checking that the selected venue has an id
        if (!selectedVenue.id) throw new Error("Missing venue id for update");

        const updatedVenue: IVenue = {
          id: selectedVenue.id,
          name: nameInput.current.value,
          capacity: Number(capacityInput.current.value),
          image: selectedVenue.image, // Is set in context via saveVenue
        };

        const response = await updateVenue(updatedVenue, image ?? undefined);
        if (!response.success) throw new Error("Failed to update venue");
        setStatusMessage("Venue updated!");
      }

      setstatusMessageColor(true);
      resetForm();
    } catch (error) {
      console.error(error);
      setstatusMessageColor(false);
      setStatusMessage("Failed to save venue");
    }
  };

  const handleSelectVenue = (venue: IVenue) => {
    setSelectedVenue(venue);
    setStatusMessage("Click 'Update venue' to submit your changes");
    setstatusMessageColor(true);

    if (nameInput.current) nameInput.current.value = venue.name;
    if (capacityInput.current)
      capacityInput.current.value = venue.capacity.toString();
  };

  const handleDeleteVenue = async () => {
    if (!selectedVenue?.id) return;

    try {
      const response = await deleteVenue(selectedVenue.id);
      if (!response.success) throw new Error("Failed to delete venue");

      setStatusMessage("Venue deleted!");
      setstatusMessageColor(false);
      resetForm();
    } catch (error) {
      console.error(error);
      setStatusMessage("Failed to delete venue");
      setstatusMessageColor(false);
    }
  };

  return (
    <section
      className=" max-w-7xl
    mx-auto
    px-4
    py-8
    grid
    grid-cols-1
    gap-12"
    >
      {/* input fields + file upload for adding a new venue / updating an existing venue */}
      <article
        className="
    border
    rounded-xl
    p-6
    w-full
    max-w-md
    mx-auto
  "
      >
        <h3 className="text-2xl font-semibold mb-6 text-center">
          {selectedVenue ? "Update venue" : "Add venue"}
        </h3>

        <div className="flex flex-col gap-3">
          <label className="text-left">Name</label>
          <input className="border p-2 rounded" ref={nameInput} type="text" />

          <label className="text-left">Capacity</label>
          <input
            className="border p-2 rounded"
            ref={capacityInput}
            type="number"
          />

          <label className="text-left">
            Image (optional)
            <input type="file" onChange={setImageHandler} className="mt-1" />
          </label>

          {/* Current image preview */}
          {selectedVenue?.image && !image && (
            <div className="mt-4">
              <h4 className="mb-2 font-medium text-left">Current image</h4>

              <div className="w-full h-40 overflow-hidden rounded-lg">
                <img
                  src={`${endpoint}${selectedVenue.image}`}
                  alt="Selected venue"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          <button
            onClick={handleSaveVenue}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white py-2 rounded transition"
          >
            {selectedVenue ? "Update venue" : "Add new venue"}
          </button>

          {selectedVenue && (
            <button
              onClick={handleDeleteVenue}
              className="bg-red-600 hover:bg-red-700 text-white py-2 rounded transition"
            >
              Delete selected venue
            </button>
          )}

          {statusMessageColor !== null && (
            <p
              className={`text-center ${
                statusMessageColor ? "text-green-600" : "text-red-600"
              }`}
            >
              {statusMessage}
            </p>
          )}
        </div>
      </article>

      {/* List of existing venues */}
      <section className="rounded-xl p-6 w-full">
        <h3 className="text-xl font-bold text-center mb-4">Existing Venues</h3>
        <div
          className="grid
                        grid-cols-1
                        sm:grid-cols-2
                        lg:grid-cols-3
                        xl:grid-cols-4
                        gap-6"
        >
          {venues.map((venue) => (
            <article
              key={venue.id}
              className=" border
                          rounded-xl
                          p-4
                          flex
                          flex-col
                          h-full
                          "
            >
              <div>
                <h4 className="font-semibold">{venue.name}</h4>
                <p>Capacity: {venue.capacity.toLocaleString("nb-NO")}</p>

                {venue.image && (
                  <img
                    src={`${endpoint}${venue.image}`}
                    alt={venue.name}
                    className="w-full h-32 object-cover rounded"
                  />
                )}
              </div>
              {/*Button handling selectVenue */}
              <button
                onClick={() => handleSelectVenue(venue)}
                className="mt-2 bg-blue-600 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
};

export default VenueForm;
