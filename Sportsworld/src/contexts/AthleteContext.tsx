import { useState, createContext, type ReactNode, useEffect } from "react";
import { type IAthlete } from "../interfaces/IAthlete";
import AthleteService from "../services/AthleteService";
import { type IAthleteContext } from "../interfaces/IAthleteContext";
import { type IDefaultResponse } from "../interfaces/IResponseInterface";

export const AthleteContext = createContext<IAthleteContext | null>(null);

interface Props {
  children: ReactNode;
}

export const AthleteProvider = ({ children }: Props) => {
  const [athletes, setAthletes] = useState<IAthlete[]>([]);
  useEffect(() => {
    setAthletesFromService();
  }, []);

  const setAthletesFromService = async () => {
    const response = await AthleteService.getAllAthletes();
    if (response.success && response.data != null) {
      setAthletes(response.data);
    }
  };

  const getAthleteQuantity = (): number => {
    return athletes.length;
  };

  const uploadImage = async (image: File) => {
    try {
      const response = await AthleteService.uploadImage(image);
      if (response.success) {
        console.log("Image was uploaded successfully");
        setAthletesFromService();
      } else {
        console.log("Failed to upload image");
      }
      return response;
    } catch (error) {
      console.error("Error uploading image and athlete");
      return { success: false };
    }
  };

  const insertAthlete = async (athlete: IAthlete) => {
    if (athlete) {
      try {
        const response = await AthleteService.insertAthlete(athlete);
        //todo error-handling
        await setAthletesFromService();
        return response;
      } catch (error) {
        console.log("Error setting athlete");
        return { success: false };
      }
    } else {
      console.log("Athlete was not set");
      return { success: false };
    }
  };

  const deleteAthlete = async (athleteId: number) => {
    try {
      const response = await AthleteService.deleteAthlete(athleteId);
      if (response.success) {
        console.log("Athlete was deleted");
        await setAthletesFromService();
      } else {
        console.log("Error occured while trying to delete athlete");
      }
      return response;
    } catch (error) {
      console.error("Could not delete athlete");
      return { success: false };
    }
  };

  const updateAthlete = async (editedAthlete: IAthlete) => {
    try {
      const response = await AthleteService.updateAthlete(editedAthlete);
      if (response.success) {
        console.log("Athlete was edited");
        await setAthletesFromService();
      } else {
        console.log("Error occured while editing athlete");
      }
      return response;
    } catch (error) {
      console.error("Could not edit athlete");
      return { success: false };
    }
  };

  return (
    <AthleteContext.Provider
      value={{
        athletes,
        getAthleteQuantity,
        uploadImage,
        insertAthlete,
        deleteAthlete,
        updateAthlete,
      }}
    >
      {children}
    </AthleteContext.Provider>
  );
};
