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
      const response = await AthleteService.insertAthlete(athlete);
      //todo error-handling
      setAthletes((prev) => [...prev, athlete]);
    } else {
      console.log("Athlete was not inserted");
    }
  };

  return (
    <AthleteContext.Provider
      value={{
        athletes,
        getAthleteQuantity,
        uploadImage,
        insertAthlete,
      }}
    >
      {children}
    </AthleteContext.Provider>
  );
};
