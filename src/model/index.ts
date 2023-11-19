export type StationsResponse = {
    ok: boolean;
    license: string;
    data: "MTS-K" | "string";
    status: "ok" | "error" | string;
    message?: string;
    stations: Station[];
};

type PriceType = boolean | number;

export type Station = {
    id: string;
    name: string;
    brand: string;
    street: string;
    place: string;
    houseNumber: string;
    postCode: number;
    lat: number;
    lng: number;
    dist: number;
    diesel: PriceType;
    e5: PriceType;
    e10: PriceType;
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
