import { type IAthlete } from "./IAthlete";
import { type IDefaultResponse } from "./IResponseInterface";

export interface IAthleteContext {
  athletes: IAthlete[];
  getAthleteQuantity: () => number;
  saveAthlete: (athlete: IAthlete) => Promise<IDefaultResponse>;
  purchaseAthlete: (athleteId: number) => Promise<IDefaultResponse>;
};
