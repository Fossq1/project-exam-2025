// TODO MARIUS
import { useContext, useEffect, useState } from "react";
import type { IVenue } from "../../interfaces/IVenue";
import VenueItem from "./VenueItem";
import type { IVenueContext } from "../../interfaces/IVenueContext";
import { VenueContext } from "../../contexts/VenueContext";


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



    const getVenueJSX = () => {
        const venueJSX = venues.map( (venue, index) => {
            return(
                <VenueItem
                    key={"venue" + index}
                    venue={venue}
                />
            )
        } );
        return venueJSX;
    }
    
    return(
        <section>
            <header>
                <h2>List of all venues:</h2>
                <p>Filter by name:</p>
                <input 
                value={filterText}
                className="border border-white-500"
                type="text"
                onChange={handleFilterChange}
                />
            </header>
            <section 
            className="px-24 grid grid-cols-3 gap-4 text-center place-items-center4"
            >
                {getVenueJSX()}
            </section>
        </section>
    )
}

export default VenueList;

