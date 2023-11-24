import { FuelType, RadiusType } from "@/model/tankerkoenig";

export type StationsResponse = {
    ok: boolean;
    license: string;
    data: "MTS-K" | "string";
    status: "ok" | "error" | string;
    message?: string;
    stations: Station[];
};

export type PriceType = boolean | number;

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

export type Station = {
    id: string;
    name: string;
    brand: StationBrand;
    street: string;
    place: string;
    houseNumber: string;
    postCode: number;
    lat: number;
    lng: number;
    dist: number;
    diesel?: PriceType;
    price?: number;
    e5?: PriceType;
    e10?: PriceType;
    isOpen: boolean;
};

export type Location = {
    licence: string;
    lat: string;
    lon: string;
    name: string;
    display_name: string;
};

export type Coords = Pick<GeolocationCoordinates, "latitude" | "longitude">;

export type StationConfiguration = {
    radius: RadiusType;
    type: FuelType;
};

export type CarConfiguration = {
    averageConsumption100Km: number;
    totalTankVolume: number;
    neededTankVolume: number;
    inclusiveReturnTravel: boolean;
};
