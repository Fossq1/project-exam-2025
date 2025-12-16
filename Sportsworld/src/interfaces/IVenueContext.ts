import { type IVenue } from "./IVenue";
import type { IDefaultResponse } from "./IResponseInterface";

export interface IVenueContext {
    venues: IVenue[];
    getVenueQuantity: () => number;
    saveVenue: (venue: IVenue, imageFile?: File) => Promise<IDefaultResponse>;
    updateVenue: (venue: IVenue, imageFile?: File) => Promise<IDefaultResponse>;
    deleteVenue: (venueId: number) => Promise<IDefaultResponse>;
}