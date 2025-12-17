import { useContext, useEffect, useState } from "react";
import type { IVenue } from "../../interfaces/IVenue";
import VenueItem from "./VenueItem";
import type { IVenueContext } from "../../interfaces/IVenueContext";
import { VenueContext } from "../../contexts/VenueContext";

// List of venues
const VenueList = () => {

const {venues} = useContext(VenueContext) as IVenueContext;

const [filterText, setFilterText] = useState("");

const [filteredVenues, setFilteredVenues] = 
    useState<IVenue[]>(venues);

const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
};

useEffect( () => {
    const filtered = venues.filter((venue => 
        venue.name.toLowerCase().includes(filterText.toLowerCase())
    ));
    setFilteredVenues(filtered);
}, [filterText,venues]);


    // Looping through filteredvenues to update the list of displayed venues
    const getVenueJSX = () => {
        const venueJSX = filteredVenues.map( (venue, index) => {
            return(
                <VenueItem
                    key={"venue" + index}
                    venue={venue}
                />
            )
        } );
        return venueJSX;
    }
    
        // Layout for venueList
    return(
        <section>
            <header className="flex justify-center py-4">
                <h2>List of all venues: </h2>
                <p> Filter by name:</p>
                <input 
                value={filterText}
                className="border border-white-500"
                type="text"
                onChange={handleFilterChange}
                />
            </header>
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
    )
}

export default VenueList;

