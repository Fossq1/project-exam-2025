import { useState, createContext, type ReactNode, useEffect } from "react";
import type { IVenueContext } from "../interfaces/IVenueContext";
import VenueService from "../services/VenueService";
import type { IVenue } from "../interfaces/IVenue";
import uploadImage from "../services/ImageUploadService";
import type { IDefaultResponse } from "../interfaces/IResponseInterface";

export const VenueContext = createContext<IVenueContext | null>(null);

interface Props {
  children: ReactNode;
}

export const VenueProvider = ({ children }: Props) => {
  const [venues, setVenues] = useState<IVenue[]>([]);

  useEffect(() => {
    setVenuesFromService();
  }, []);

  const setVenuesFromService = async () => {
    const response = await VenueService.getAllVenues();
    if (response.success && response.data != null) {
      setVenues(response.data);
    }
  };

  const getVenueQuantity = (): number => venues.length;



  
  const saveVenue = async (newVenue: IVenue, imageFile?: File): Promise<IDefaultResponse> => {
  if (imageFile) {
    const uploadResponse = await uploadImage(imageFile, "venues");
    if (!uploadResponse.success) return { success: false };
    newVenue.image = `images/venues/${imageFile.name}`;
  } else {
    // Setter default image hvis ingen fil lastes opp
    newVenue.image = "images/venues/default-image-venues.png";
  }

  const response = await VenueService.insertVenue(newVenue);
  if (response.success) {
    setVenues((prev) => [...prev, newVenue]);
  }

  return response;
};
const updateVenue = async (venue: IVenue, imageFile?: File): Promise<IDefaultResponse> => {
  if (!venue.id) return { success: false }; // må ha ID for update

  if (imageFile) {
    const uploadResponse = await uploadImage(imageFile, "venues");
    if (!uploadResponse.success) return { success: false };
    venue.image = `images/venues/${imageFile.name}`;
  }

  const response = await VenueService.updateVenue(venue);
  if (response.success) {
    // oppdater venue i local state
    setVenues((prev) => prev.map(venue => venue.id === venue.id ? venue : venue));
  }
  return response;
};

  return (
    <VenueContext.Provider
      value={{
        venues,
        getVenueQuantity,
        saveVenue,
        updateVenue
      }}
    >
      {children}
    </VenueContext.Provider>
  );
};