import { useState, createContext, type ReactNode, useEffect, useContext } from "react";
import { type IAthlete } from "../interfaces/IAthlete";
import AthleteService from "../services/AthleteService";
import { type IAthleteContext } from "../interfaces/IAthleteContext";
import { type IDefaultResponse } from "../interfaces/IResponseInterface";

export const AthleteContext = createContext<IAthleteContext | null>(null);

export const useAthleteContext = () => {
  const context = useContext(AthleteContext);
  if(!context) {
    throw new Error("useAthleteContext must be used inside AthleteProvider");
  }
  return context;
};

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

  const purchaseAthlete = async (athleteId: number): Promise<IDefaultResponse> => {
    const selectedAthlete = athletes.find(athlete => athlete.id === athleteId);

    if (!selectedAthlete){
      return {
        success: false
      };
    }

    //creates a new object with isPurchases = true
    const updatedAthlete: IAthlete = {
      ...selectedAthlete,
      purchaseStates: true
    };

    const response = await AthleteService.updateAthlete(athleteId, updatedAthlete);

    if (response.success){
      setAthletes(prev =>
        prev.map( athlete => (athlete.id === athleteId ? updatedAthlete : athlete))
      );
    }
    return response;
  }
  

  return (
    <AthleteContext.Provider
      value={{
        athletes,
        getAthleteQuantity,
        saveAthlete,
        purchaseAthlete
      }}
    >
      {children}
    </AthleteContext.Provider>
  );
};
