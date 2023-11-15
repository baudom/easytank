export const BASE_URL = "https://nominatim.openstreetmap.org/search";
export const PARAM_SEARCH = "q";
export const PARAM_FORMAT = "format";
export const PARAM_FORMAT_TYPE = "json";

export type NominatimLocation = {
    place_id: number;
    licence: string;
    osm_type: string;
    osm_id: number;
    lat: string;
    lon: string;
    class: string;
    type: string;
    place_rank: number;
    importance: number;
    addresstype: string;
    name: string;
    display_name: string;
    boundingbox: [string, string, string, string];
};
