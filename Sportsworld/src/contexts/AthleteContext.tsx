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

  const saveAthlete = async (
    newAthlete: IAthlete
  ): Promise<IDefaultResponse> => {
    const response = await AthleteService.postAthlete(newAthlete);
    if (response.success) {
      setAthletes((prev) => [newAthlete, ...prev]);
    }
    return response;
  };
  return (
    <AthleteContext.Provider
      value={{
        athletes,
        getAthleteQuantity,
        saveAthlete,
      }}
    >
      {children}
    </AthleteContext.Provider>
  );
};
