import { useState, createContext, type ReactNode, useEffect, useContext } from "react";
import { type IAthlete } from "../interfaces/IAthlete";
import AthleteService from "../services/AthleteService";
import uploadImage from "../services/ImageUploadService";
import { type IAthleteContext } from "../interfaces/IAthleteContext";
import type { IDefaultResponse } from "../interfaces/IResponseInterface";
export const AthleteContext = createContext<IAthleteContext | null>(null);

export const useAthleteContext = () => {
 const context = useContext(AthleteContext);
 if(!context) {
   throw new Error("useAthleteContext must be used inside AthleteProvider");
 }
 return context;
};

// Creating Props interface requiring a children prop, which can be any React content.
interface Props {
children: ReactNode;
}



// Creating provider for components to give context for performing CRUD operations and uploading images
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


// Method returns an imageUrl which is needed by components as we are using GUID for image-storage.
const saveImage = async (image: File) => {
try {
const uploadResponse = await uploadImage(image, "athletes");
// Checking if api-call failed
if (!uploadResponse.success || !uploadResponse.path) {
return { success: false, path: "" };
} else {
return { success: true, path: uploadResponse.path };
}
} catch {
return { success: false, path: "" };
}
};





const insertAthlete = async (athlete: IAthlete) => {
if (athlete) {
try {
const response = await AthleteService.insertAthlete(athlete);
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
// Updating the athletes-state after deleting athlete
setAthletesFromService();
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
// Updating the athletes-state after deleting athlete
setAthletesFromService();
} else {
console.log("Error occured while editing athlete");
}
return response;
} catch (error) {
console.error("Could not edit athlete");
return { success: false };
}
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
     purchaseStatus: true
   };

   const response = await AthleteService.updateAthlete(updatedAthlete);

   if (response.success){
     setAthletes(prev =>
       prev.map( athlete => (athlete.id === athleteId ? updatedAthlete : athlete))
     );
   }
   return response;
 }

 // Returning the provider and the methods and states accessible.

return (
<AthleteContext.Provider
value={{
athletes,
saveImage,
getAthleteQuantity,
insertAthlete,
deleteAthlete,
updateAthlete,
purchaseAthlete,
}}
>
{children}
</AthleteContext.Provider>
);
};



