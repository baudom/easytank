import { FuelType } from "@/model";

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

export const mapPrice = (price: number): string => {
    return Intl.NumberFormat("de-DE", {
        currency: "EUR",
        style: "currency",
        maximumFractionDigits: 3,
    }).format(price);
};
