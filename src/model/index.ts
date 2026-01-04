import { Station } from "@/model/tankerkoenig";

export const fuelTypes = ["e5", "e10", "diesel", "all"] as const;
export type FuelType = (typeof fuelTypes)[number];

export const fuelTypesWithTranslations = new Map<FuelType, string>([
    ["e5", "fuel.e5"],
    ["e10", "fuel.e10"],
    ["diesel", "fuel.diesel"],
    ["all", "label.all"],
]);

export const radiusTypes = [1, 5, 10, 15, 25] as const;
export type RadiusType = (typeof radiusTypes)[number];

export const localeTypes = ["de", "en"] as const;
export type LocaleType = (typeof localeTypes)[number];

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

export const stationOrderTypes = ["price", "refillPrice", "distance"] as const;
export type StationOrderType = (typeof stationOrderTypes)[number];

type LastSearchTermType = Coords & {
    input: string;
};

export type StationFilter = {
    radius: RadiusType;
    type: FuelType;
    brands: string[];
    onlyOpen: boolean;
    onlyAvailable: boolean;
    onlyRydSupported: boolean;
    lastSearchTerm: Partial<LastSearchTermType> | null;
    order: StationOrderType;
};

export type CarConfiguration = {
    averageConsumption100Km?: number;
    refillVolume?: number;
    inclusiveReturnTravel: boolean;
    rydFuelDiscount?: number;
};

export type CalculatedStation = Station & {
    refillPrice?: number;
};
