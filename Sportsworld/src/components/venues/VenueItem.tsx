import type { IVenue } from "../../interfaces/IVenue";

const endpoint = "http://localhost:5177/";

const VenueItem = ({venue}:{venue: IVenue}) => {

    return(
       <article
  className="
    border-4 border-red-600
    rounded-xl
    shadow-2xl
    p-6
    transition-transform duration-150
    hover:scale-105
  "
>
  <h2 className="text-2xl font-semibold text-center mb-4">
    {venue.name}
  </h2>

  {/* Image wrapper responsive with breakpoints for phone/tablet/pc */}
  <div className="w-full h-48 sm:h-56 md:h-64 overflow-hidden rounded-lg mb-4">
    <img
      src={`${endpoint}${venue.image}`}
      alt={venue.name}
      className="w-full h-full object-cover"
    />
  </div>

  <h3 className="text-lg font-medium">
    {venue.name} (ID: {venue.id})
  </h3>

  <p className="text-xl mt-2">
    Capacity: ≈ {venue.capacity.toLocaleString("nb-NO")} people
  </p>
</article>
    )
}

export default VenueItem;