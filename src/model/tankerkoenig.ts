export const BASE_URL = "https://creativecommons.tankerkoenig.de/json/list.php";
export const PARAM_LATITUDE = "lat";
export const PARAM_LONGITUDE = "lng";
export const PARAM_RADIUS = "rad";
export const radiusTypes = [1, 5, 10, 15, 25] as const;
export type RadiusType = (typeof radiusTypes)[number];

export const PARAM_FUEL_TYPE = "type";
export const PARAM_SORT = "sort";
export const fuelTypes = ["e5", "e10", "diesel", "all"] as const;
export type FuelType = (typeof fuelTypes)[number];
export const PARAM_API_KEY = "apikey";
