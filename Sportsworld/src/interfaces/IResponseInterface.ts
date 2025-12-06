import { type IAthlete } from "./IAthlete";
import { type IVenue } from "./IVenue";

export interface IDefaultResponse {
  success: boolean;
}

export interface IAthleteResponse {
  success: boolean;
  data: IAthlete[] | null;
}



export interface IVenuesResponse {
  success: boolean;
  data: IVenue[] | null;
}

export interface IVenueResponse {
  success: boolean;
  data: IVenue | null;
}