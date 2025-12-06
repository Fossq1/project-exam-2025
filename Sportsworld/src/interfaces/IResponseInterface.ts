import { type IAthlete } from "./IAthlete";

export interface IDefaultResponse {
  success: boolean;
}

export interface IAthleteResponse {
  success: boolean;
  data: IAthlete[] | null;
}
