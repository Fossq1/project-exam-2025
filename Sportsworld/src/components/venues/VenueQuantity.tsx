//TODO MARIUS

import { useContext } from "react";
import type { IVenueContext } from "../../interfaces/IVenueContext";
import { VenueContext } from "../../contexts/VenueContext";

const VenueQuantity = () => {
    const {getVenueQuantity} = useContext(VenueContext) as IVenueContext;

    return (
        <section>
            <p>Number of venues: {getVenueQuantity()}</p>
        </section>
    )
}

export default VenueQuantity;