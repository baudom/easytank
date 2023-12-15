import { StationBrand } from "@/model/index";

export const BASE_URL = "https://creativecommons.tankerkoenig.de/json/list.php";
export const PARAM_LATITUDE = "lat";
export const PARAM_LONGITUDE = "lng";
export const PARAM_RADIUS = "rad";

export const PARAM_FUEL_TYPE = "type";
export const PARAM_SORT = "sort";
export const PARAM_API_KEY = "apikey";

export type StationsResponse = {
    ok: boolean;
    license: string;
    data: "MTS-K" | string;
    status: "ok" | "error" | string;
    message?: string;
    stations: Station[];
};
// TODO: type with ok = false and req message

export type PriceType = number | null;

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
    price?: number;
    diesel: PriceType;
    e5: PriceType;
    e10: PriceType;
    isOpen: boolean;
};
