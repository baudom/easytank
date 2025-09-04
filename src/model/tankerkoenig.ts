import { StationBrand } from "@/model/index";

export const BASE_URL = "https://creativecommons.tankerkoenig.de/json/list.php";
export const PARAM_LATITUDE = "lat";
export const PARAM_LONGITUDE = "lng";
export const PARAM_RADIUS = "rad";

export const PARAM_FUEL_TYPE = "type";
export const PARAM_SORT = "sort";
export const PARAM_API_KEY = "apikey";

export type StationSuccessResponse = {
    ok: true;
    license: string;
    data: "MTS-K" | string;
    stations: Station[];
};

export type StationErrorResponse = {
    ok: false;
    message: string;
};

export type StationsResponse = StationSuccessResponse | StationErrorResponse;

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
    isRydSupportedBrand: boolean;
};
