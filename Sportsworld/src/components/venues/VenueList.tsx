import { useContext, useEffect, useState } from "react";
import type { IVenue } from "../../interfaces/IVenue";
import VenueItem from "./VenueItem";
import type { IVenueContext } from "../../interfaces/IVenueContext";
import { VenueContext } from "../../contexts/VenueContext";

// List of venues
const VenueList = () => {
  const { venues } = useContext(VenueContext) as IVenueContext;

  const [filterText, setFilterText] = useState("");
  // State for filtering athletes
  // State for error-messages
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [filteredVenues, setFilteredVenues] = useState<IVenue[]>(venues);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  useEffect(() => {
    const filtered = venues.filter((venue) =>
      venue.name.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilteredVenues(filtered);

    if (filterText.trim() !== "" && filtered.length === 0) {
      setErrorMessage("No venue found with that name");
    } else {
      setErrorMessage(null);
    }
  }, [filterText, venues]);

  // Looping through filteredvenues to update the list of displayed venues
  const getVenueJSX = () => {
    const venueJSX = filteredVenues.map((venue, index) => {
      return <VenueItem key={"venue" + index} venue={venue} />;
    });
    return venueJSX;
  };

  // Layout for venueList
  return (
    <section>
      <div className="p-4">
        <p> Filter by name:</p>
        {errorMessage && (
          <p className="text-red-500 font-semibold text-center mb-4">
            {errorMessage}
          </p>
        )}
        <input
          className="border border-white-500 rounded-sm"
          value={filterText}
          type="text"
          onChange={handleFilterChange}
        />
      </div>
      <section
        className=" grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-6
            px-4"
      >
        {getVenueJSX()}
      </section>
    </section>
  );
};

export default VenueList;
