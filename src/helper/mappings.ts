export const mapPrice = (price: number): string => {
    return Intl.NumberFormat("de-DE", {
        currency: "EUR",
        style: "currency",
        maximumFractionDigits: 3,
        minimumFractionDigits: 2,
    }).format(price);
};
