// TODO MARIUS
import VenueQuantity from "../components/venues/VenueQuantity";
import VenueList from "../components/venues/VenueList";


const VenuePage = () => {
    return(
        <>
            <header>
                <h1>Venues</h1>
            </header>
            <VenueList/>
            <VenueQuantity/>
        </>
    )
}

export default VenuePage;