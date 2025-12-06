//TODO MARIUS
import type { IVenue } from "../../interfaces/IVenue";

const VenueItem = ({venue}:{venue: IVenue}) => {
    return(
        <article>
            <h3>{venue.name} ({venue.id})</h3>
        </article>
    )
}

export default VenueItem;