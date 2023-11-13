export type ListResponse = {
    ok: boolean;
    license: string;
    data: "MTS-K" | "string";
    status: "ok" | string;
    stations: Station[];
};

export type Station = {
    id: string;
    name: string;
    brand: string;
    street: string;
    place: string;
    lat: number;
    lng: number;
    dist: number;
    diesel: number;
    e5: number;
    e10: number;
    isOpen: boolean;
    houseNumber: string;
    postCode: number;
};
