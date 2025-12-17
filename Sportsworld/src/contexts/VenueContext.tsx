import { useState, createContext, type ReactNode, useEffect } from "react";
import type { IVenueContext } from "../interfaces/IVenueContext";
import type { IVenue } from "../interfaces/IVenue";
import VenueService from "../services/VenueService";
import uploadImage from "../services/ImageUploadService";
import type { IDefaultResponse } from "../interfaces/IResponseInterface";

export const VenueContext = createContext<IVenueContext | null>(null);

interface Props {
  children: ReactNode;
}
// VenueProvider
export const VenueProvider = ({ children }: Props) => {
  const [venues, setVenues] = useState<IVenue[]>([]);

  useEffect(() => {
    setVenuesFromService();
  }, []);

  const setVenuesFromService = async () => {
    const response = await VenueService.getAllVenues();
    if (response.success && response.data) setVenues(response.data);
  };

  const getVenueQuantity = (): number => venues.length;

    // saveVenue used for adding venue
  const saveVenue = async (newVenue: IVenue, imageFile?: File): Promise<IDefaultResponse> => {
    try {
      if (imageFile) {
        const uploadResponse = await uploadImage(imageFile, "venues");
        if (!uploadResponse.success || !uploadResponse.path) return { success: false };
        newVenue.image = uploadResponse.path;
      } else {
        newVenue.image = "images/venues/default-image-venues.png";
      }

      const response = await VenueService.insertVenue(newVenue);
      if (response.success) setVenuesFromService();
      return response;
    } catch {
      return { success: false };
    }
  };

    // updateVenue used for updating an existing venue, checking if venue has an id
  const updateVenue = async (venue: IVenue, imageFile?: File): Promise<IDefaultResponse> => {
    try {
      if (!venue.id) return { success: false };

      if (imageFile) {
        const uploadResponse = await uploadImage(imageFile, "venues");
        if (!uploadResponse.success || !uploadResponse.path) return { success: false };
        venue.image = uploadResponse.path;
      }

      const response = await VenueService.updateVenue(venue);
      if (response.success) setVenuesFromService();
      return response;
    } catch {
      return { success: false };
    }
  };

    // deleteVenue
  const deleteVenue = async (venueId: number): Promise<IDefaultResponse> => {
    try {
      const response = await VenueService.deleteVenue(venueId);
      if (response.success) setVenuesFromService();
      return response;
    } catch {
      return { success: false };
    }
  };

  return (
    <VenueContext.Provider
      value={{ venues, getVenueQuantity, saveVenue, updateVenue, deleteVenue }}
    >
      {children}
    </VenueContext.Provider>
  );
};
