//TODO MARIUS
import { useState, createContext, type ReactNode, useEffect } from "react";
import type { IVenueContext } from "../interfaces/IVenueContext";
import VenueService from "../services/VenueService";
import type { IVenue } from "../interfaces/IVenue";

export const VenueContext = createContext<IVenueContext | null>(null);

interface Props {
  children: ReactNode;
}

export const VenueProvider = ({children} : Props ) => {

        const [venues, setVenues] = useState<IVenue[]>([
            {id: 99, name: "Venue from context", capacity: 20, image:''}
        ])

  useEffect(() => {
    setVenuesFromService();
  }, []);

  const setVenuesFromService = async () => {
    const response = await VenueService.getAllVenues();
    if (response.success === true && response.data != null) {
      setVenues(response.data);
    }
  };

  const getVenueQuantity = (): number => {
    return venues.length;
  };

  const saveVenue = (venue: IVenue) => {
    setVenues((prev) => [...prev, venue]);
  };

  return (
    <VenueContext.Provider
      value={{
        venues,
        getVenueQuantity,
        saveVenue,
      }}
    >
      {children}
    </VenueContext.Provider>
  );
};
