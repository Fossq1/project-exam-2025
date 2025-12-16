import axios from "axios";
import type { IVenue } from "../interfaces/IVenue";
import type { IDefaultResponse } from "../interfaces/IResponseInterface";

const venueEndpoint = "http://localhost:5177/venue";

const getAllVenues = async (): Promise<{ success: boolean; data?: IVenue[] }> => {
  try {
    const response = await axios.get(venueEndpoint);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error fetching venues:", error);
    return { success: false };
  }
};

const insertVenue = async (venue: IVenue): Promise<IDefaultResponse> => {
  try {
    const response = await axios.post(venueEndpoint, venue);
    console.log("Venue saved:", response.data);
    return { success: true };
  } catch (error) {
    console.error("Error inserting venue:", error);
    return { success: false };
  }
};



const updateVenue = async (venue: IVenue): Promise<IDefaultResponse> => {
  try {
    const response = await axios.put(`${venueEndpoint}/${venue.id}`, venue)
    console.log("Venue updated:", response.data)
    return { success: true };
  } catch {
    return { success: false };
  }
};
export default { getAllVenues, insertVenue, updateVenue };