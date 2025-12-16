import { useRef, useContext, useState, type ChangeEvent } from "react";
import { VenueContext } from "../../contexts/VenueContext";
import type { IVenueContext } from "../../interfaces/IVenueContext";
import type { IVenue } from "../../interfaces/IVenue";
import uploadImage from "../../services/ImageUploadService";

const VenueForm = () => {
  const { venues, saveVenue, updateVenue, deleteVenue } =
    useContext(VenueContext) as IVenueContext;
  
    const nameInput = useRef<HTMLInputElement>(null);
    const capacityInput = useRef<HTMLInputElement>(null);

    const [image, setImage] = useState<File | null>(null);
    const [selectedVenue, setSelectedVenue] = useState<IVenue | null>(null);
    const [statusMessage, setStatusMessage] = useState("Enter name and capacity");
    const [statusMessageColor, setstatusMessageColor] = useState<boolean | null>(null); // False = rød, True = grønn

    const endpoint = "http://localhost:5177/";

  const setImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setImage(e.target.files[0]);
    }
  };


  // resetter statusmeldingen etter 2,5 sekunder og tømmer inputfeltene
  const resetForm = () => {
    setTimeout(() => {
   setStatusMessage("Enter name and capacity or chose a venue to edit")
   setstatusMessageColor(true)
  }, 2500);
  if (nameInput.current) nameInput.current.value = "";
  if (capacityInput.current) capacityInput.current.value = "";
  setImage(null);
  setSelectedVenue(null);
  };

  const handleSaveVenue = async () => {
    if (
      !nameInput.current ||
      !capacityInput.current ||
      nameInput.current.value.trim() === "" ||
      capacityInput.current.value.trim() === "" 

    ) {
      setstatusMessageColor(false); // false er her lik rød
      setStatusMessage("Please enter name and capacity or chose a venue to edit");
      return;
    }

    try {
      if (!selectedVenue) {

        let imagePath = "images/venues/default-image-venues.jpg";

        if (image){
          const uploadResult = await uploadImage(image, "venues");
          if(!uploadResult.success || !uploadResult.path){
            throw new Error("Image upload failed")
          }
          imagePath = uploadResult.path;
        }



        const newVenue: Omit<IVenue, "id"> = {
          name: nameInput.current.value,
          capacity: Number(capacityInput.current.value),
          image: imagePath
        };

        const response = await saveVenue(newVenue);

        if (!response.success) throw new Error();
        setStatusMessage("Venue added!");
      }

      else {

          let imagePath = selectedVenue.image;

          if(image){
            const uploadresult = await uploadImage(image, "venues");
            if(!uploadresult.success || !uploadresult.path){
              throw new Error("Image upload failed")
            }
            imagePath = uploadresult.path;
          }

        if (selectedVenue.id == null) {
          throw new Error("Missing venue id on update");
        }

        const updatedVenue: IVenue = {
          id: selectedVenue.id,
          name: nameInput.current.value,
          capacity: Number(capacityInput.current.value),
          image: imagePath
        };

        const response = await updateVenue(updatedVenue);

        if (!response.success) throw new Error();
        setStatusMessage("Venue updated!");
      }

      setstatusMessageColor(true);
      resetForm();
    } catch (err) {
      console.error(err);
      setstatusMessageColor(false);
      setStatusMessage("Failed to save venue");
    }
  };

  // Funksjon for å velge venue til sletting/oppdatering

  const handleSelectVenue = (venue: IVenue) => {
    setSelectedVenue(venue);
    setStatusMessage("Click update venue to submit your changes")
    setstatusMessageColor(true); // true er lik grønn

    if (nameInput.current) nameInput.current.value = venue.name;
    if (capacityInput.current)
      capacityInput.current.value = venue.capacity.toString();
  };


    // Sletting av venue
  const handleDeleteVenue = async () => {
    if (!selectedVenue?.id) return;

    try {
      const response = await deleteVenue(selectedVenue.id);
      setStatusMessage("Venue deleted!")
      setstatusMessageColor(false);
      if (!response.success) throw new Error();
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="border border-red-600 border-[5px] rounded-lg pb-8 px-12 grid grid-cols-1 gap-4 text-center place-items-center">
      {/* Skjema for å legge til  / oppdatere venues */}
      <article className="border rounded-xl p-4 place-items-center" >
        <h3 className="text-xl mb-4">
          {selectedVenue ? "Update venue" : "Add venue"}
        </h3>

        <div className="flex flex-col gap-2 mb-4">
          <label>Name</label>
          <input className="border p-1" ref={nameInput} type="text" />

          <label>Capacity</label>
          <input className="border p-1" ref={capacityInput} type="number" />

          <label>
            Image (optional)
            <input type="file" onChange={setImageHandler} />
          </label>


          {/*Hvis et bilde er valgt for editing, så vises bildet */}
             {selectedVenue?.image && !image && (
            <div className="mt-2">
              <h4>Current Image:</h4>
              <img
                src={`${endpoint}${selectedVenue.image}`}
                alt="Selected venue"
                className="h-xs rounded"
              />
            </div>
          )}

          <button
            onClick={handleSaveVenue}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            {selectedVenue ? "Update venue" : "Add new venue"}
          </button>

          {selectedVenue && (
            <button
              onClick={handleDeleteVenue}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete selected venue
            </button>
          )}

          {statusMessageColor !== null && (
            <p className={statusMessageColor ? "text-green-600" : "text-red-600"}>
              {statusMessage}
            </p>
          )}
        </div>
      </article>

      {/* Knapp for å vise / skjule eksisterende venues */}
    

      {/* Listen med venues og tilhørende edit knapp */}
    
        <section className="border rounded-xl p-4">
          <h3 className="text-xl mb-4">Existing Venues</h3>

          <div className="grid grid-cols-3 gap-4">
            {venues.map((venue) => (
              <article
                key={venue.id}
                className="border rounded-xl p-4 flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-semibold">{venue.name}</h4>
                  <p>Capacity: {venue.capacity}</p>

                  {venue.image && (
                    <img
                      src={`${endpoint}${venue.image}`}
                      alt={venue.name}
                      className="w-full h-32 object-cover rounded"
                    />
                  )}
                </div>

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
