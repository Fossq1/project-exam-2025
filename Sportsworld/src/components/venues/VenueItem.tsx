//TODO MARIUS
import type { IVenue } from "../../interfaces/IVenue";

const endpoint = "http://localhost:5177/";

const VenueItem = ({venue}:{venue: IVenue}) => {

    return(
        <article 
        className="duration-100 scale-85 hover:scale-88 border border-red-600 border-[5px] rounded-lg pb-8 shadow-2xl"
        >
            <h2 className="text-xl">{venue.name}</h2>
            <img
                className="block mx-auto h-auto w-xs pb-8"
                src={`${endpoint}${venue.image}`}
                alt={venue.name}
                />
            <h3>{venue.name} (ID: {venue.id})</h3>


                {/*Legger til .toLocaleString for å skrive ut kapasiteten penere formatert*/}
            <p>Capacity: ≈ {venue.capacity.toLocaleString("nb-NO")} people</p>
        </article>
    )
}

export default VenueItem;