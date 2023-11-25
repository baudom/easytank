import { Station } from "@/model/tankerkoenig";

export const fuelTypes = ["e5", "e10", "diesel", "all"] as const;
export type FuelType = (typeof fuelTypes)[number];

export const radiusTypes = [1, 5, 10, 15, 25] as const;
export type RadiusType = (typeof radiusTypes)[number];

export type StationBrand =
    | string
    | "OMV"
    | "AVIA XPress"
    | "AVIA"
    | "ESSO"
    | "RAN"
    | "JET"
    | "ARAL"
    | "BayWa"
    | "Shell"
    | "TotalEnergies";

export type Location = {
    licence: string;
    lat: string;
    lon: string;
    name: string;
    display_name: string;
};

export type Coords = Pick<GeolocationCoordinates, "latitude" | "longitude">;

export type StationFilter = {
    radius: RadiusType;
    type: FuelType;
};

export type CarConfiguration = {
    averageConsumption100Km: number;
    refillVolume: number;
    inclusiveReturnTravel: boolean;
};

export type StationWithEfficiency = Station & {
    efficiency?: number;
};
