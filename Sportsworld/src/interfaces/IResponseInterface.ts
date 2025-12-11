import { type IAthlete } from "./IAthlete";
import { type IVenue } from "./IVenue";
import { type IFinance } from "./IFinance";

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

export interface IFinancesResponse {
  success: boolean; 
  data: IFinance[] | null; 
}

export interface IFinanceResponse {
  success: boolean;
  data: IFinance;
}
