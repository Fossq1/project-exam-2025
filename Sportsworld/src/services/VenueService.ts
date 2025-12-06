// TODO MARIUS
import axios from "axios";
import type { IVenue } from "../interfaces/IVenue";

const venueEndpoint = "http://localhost:5177/venue";

const getAllVenues = async () => {
  const response = await axios.get(venueEndpoint);

  return {
    success: true,
    data: response.data,
  };
};

export default { getAllVenues };
