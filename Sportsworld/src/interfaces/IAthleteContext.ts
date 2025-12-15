import { type IAthlete } from "./IAthlete";
import { type IDefaultResponse } from "./IResponseInterface";

export interface IAthleteContext {
  athletes: IAthlete[];
  getAthleteQuantity: () => number;
  uploadImage: (image: File) => Promise<IDefaultResponse>;
  insertAthlete: (athlete: IAthlete) => void;
}
