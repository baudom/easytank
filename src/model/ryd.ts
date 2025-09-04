export const isRydSupportedBrand = (brand?: string): boolean => {
    if (!brand?.trim()) return false;

    const supportedBrands = [
        "aral",
        "ran",
        "esso",
        "shell",
        "hem",
        "totalenergies",
        "jet",
        "avia",
        "q1",
        "sprint",
        "team",
        "allguth",
        "omv",
        "oil!",
        "westfalen",
        "markant",
        "bk",
        "raiffeisen",
        "bft",
        "starkstelle",
        "pin",
        "baywa",
    ];

    return supportedBrands.some(
        (s_brand) =>
            brand?.toLowerCase() === s_brand ||
            brand?.toLowerCase().startsWith(s_brand),
    );
};

export const calculateDiscount = (
    refillVolume: number,
    fuelDiscount: number,
) => {
    return refillVolume * fuelDiscount;
};
