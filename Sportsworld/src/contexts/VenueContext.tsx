//TODO MARIUS
import { useState, createContext } from "react";
import type { FC, ReactNode } from "react";
import type { IVenue } from "../interfaces/IVenue";

export const VenueContext = createContext<IVenue | null>(null);



