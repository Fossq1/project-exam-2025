import { useState, createContext, type ReactNode, useEffect } from "react";
import type { IVenueContext } from "../interfaces/IVenueContext";
import VenueService from "../services/VenueService";
import type { IVenue } from "../interfaces/IVenue";
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



  
  const saveVenue = async (newVenue: IVenue): Promise<IDefaultResponse> => {
  const response = await VenueService.insertVenue(newVenue);
  if (response.success) {
    setVenuesFromService();
  }
  return response;
};

const updateVenue = async (venue: IVenue): Promise<IDefaultResponse> => {
  if (!venue.id) return { success: false }; // må ha ID for update

  const response = await VenueService.updateVenue(venue);
  if (response.success) {
    // oppdater venue i local state
    setVenuesFromService();
  }
  return response;
};


  const deleteVenue = async(venueId: number) : Promise<IDefaultResponse> => {
    try{
      const response = await VenueService.deleteVenue(venueId);
      if (response.success){
        setVenuesFromService();
        return response;
      }else{
        return {success: false}
      }
    }catch{
      return {success: false}
    }
  }


  return (
    <VenueContext.Provider
      value={{
        venues,
        getVenueQuantity,
        saveVenue,
        updateVenue,
        deleteVenue
      }}
    >
      {children}
    </VenueContext.Provider>
  );
};