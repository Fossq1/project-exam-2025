import VenueQuantity from "../components/venues/VenueQuantity";
import VenueList from "../components/venues/VenueList";

    // Page displaying amount of venues and a list of venues ( can be filtered through the inputField )
const VenuePage = () => {
    return(
        <>
            <header>
                <h1 className="text-4xl py-4 px-4">Venues</h1>
            </header>
            <VenueQuantity/>
            <VenueList/>
        </>
    )
}

export default VenuePage;
