import { useContext } from "react";
import type { IVenueContext } from "../../interfaces/IVenueContext";
import { VenueContext } from "../../contexts/VenueContext";

    // Amount of venues 
const VenueQuantity = () => {
    const {getVenueQuantity} = useContext(VenueContext) as IVenueContext;

    return (
        <section>
            <p className="font-bold px-4" >Number of venues: {getVenueQuantity()}</p>
        </section>
    )
}

export default VenueQuantity;