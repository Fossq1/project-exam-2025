import { useRef, useContext, useState } from "react";
import type { IVenueContext } from "../../interfaces/IVenueContext";
import { VenueContext } from "../../contexts/VenueContext";
import type { IVenue } from "../../interfaces/IVenue";

const VenueForm = () => {

    const [statusMessage, setStatusMessage] = useState<string>("");
    
    const [isOk, setIsOk] = useState<boolean | null>(null);

    return(
        <section>
            <h3>Show Venues?</h3>
            <div>
                <label>Navn</label>
            </div>
        </section>
    )

}

export default VenueForm;