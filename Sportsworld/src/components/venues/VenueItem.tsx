//TODO MARIUS
import type { IVenue } from "../../interfaces/IVenue";

const endpoint = "http://localhost:5177/";

const VenueItem = ({venue}:{venue: IVenue}) => {

    return(
        <article>
            <h3>{venue.name} (ID: {venue.id})</h3>
            <img
                className="w-xs"
                src={`${endpoint}${venue.image}`}
                alt={venue.name}
                />
                {/*Legger til .toLocaleString for å skrive ut kapasiteten penere formatert*/}
            <p>Capacity: ≈ {venue.capacity.toLocaleString("nb-NO")} people</p>
        </article>
    )
}

export default VenueItem;