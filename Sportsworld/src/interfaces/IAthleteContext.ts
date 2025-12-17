import { type IAthlete } from "./IAthlete";
import {
type IDefaultResponse,
type ImageUploadResponse,
} from "./IResponseInterface";

// Creating interface for context

export interface IAthleteContext {
athletes: IAthlete[];
getAthleteQuantity: () => number;
saveImage: (image: File) => Promise<ImageUploadResponse>;
insertAthlete: (athlete: IAthlete) => Promise<IDefaultResponse>;
deleteAthlete: (id: number) => Promise<IDefaultResponse>;
updateAthlete: (athlete: IAthlete) => Promise<IDefaultResponse>;
purchaseAthlete: (athleteId: number) => Promise<IDefaultResponse>;
}



