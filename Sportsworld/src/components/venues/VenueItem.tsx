//TODO MARIUS
import type { IVenue } from "../../interfaces/IVenue";

const endpoint = "http://localhost:5177/";

const VenueItem = ({venue}:{venue: IVenue}) => {

    return(
        <article>
            <h3>{venue.name} (ID: {venue.id})</h3>
            <img
                src={`${endpoint}${venue.image}`}
                alt={venue.name}
                style={{width: "300px"}}
                />
            <p>Capacity: {venue.capacity} people</p>
        </article>
    )
}

export default VenueItem;