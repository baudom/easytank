export const isRydSupportedStation = (name?: string): boolean => {
    if (!name?.trim()) return false;

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
        (brand) =>
            brand.includes(name.toLowerCase()) ||
            name.toLowerCase().includes(brand),
    );
};

export const calculateDiscount = (
    refillVolume: number,
    fuelDiscount: number,
) => {
    return refillVolume * fuelDiscount;
};
