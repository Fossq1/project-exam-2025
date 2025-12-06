import { type IVenue } from "./IVenue";
import type { IDefaultResponse } from "./IResponseInterface";

export interface IVenueContext {
    venues: IVenue[],
    getVenueQuantity: () => number,
    saveVenue: (venue: IVenue) => void;
}