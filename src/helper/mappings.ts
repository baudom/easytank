import { FuelType } from "@/model/tankerkoenig";

export const mapFuelTypeToString = (type: FuelType): string => {
    switch (type) {
        case "diesel":
            return "Diesel";
        case "e5":
            return "Super E5";
        case "e10":
            return "Super E10";
        case "all":
            return "Alle";
    }
};
