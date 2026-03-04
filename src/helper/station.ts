import { Station } from "@/model/tankerkoenig";

export const createGoogleMapsLink = ({ lat, lng, ...rest }: Station) => {
    const queryStr = `${rest.name} ${rest.street} ${rest.houseNumber} ${rest.postCode} ${rest.place}`;
    const url = new URL("https://www.google.com/maps/search/?api=1");
    url.searchParams.append("query", queryStr);
    return url.toString();
};

export const getStationBrandColor = (brand: string) => {
    const brandLower = brand.toLowerCase();
    if (brandLower.includes("aral")) return "#005096";
    if (brandLower.includes("shell")) return "#fbce07";
    if (brandLower.includes("total")) return "#ed1c24";
    if (brandLower.includes("esso")) return "#ee2b2b";
    if (brandLower.includes("jet")) return "#ffd300";
    if (brandLower.includes("avia")) return "#e4002b";
    if (brandLower.includes("omv")) return "#006fb4";
    if (brandLower.includes("baywa")) return "#008c4f";
    if (brandLower.includes("hem")) return "#00af3f";
    if (brandLower.includes("star")) return "#e30613";
    if (brandLower.includes("edeka")) return "#ffed00";
    if (brandLower.includes("ran")) return "#e30613";
    if (brandLower.includes("agip") || brandLower.includes("eni"))
        return "#ffd800";
    if (brandLower.includes("raiffeisen")) return "#00843d";
    if (brandLower.includes("westfalen")) return "#004b90";
    if (brandLower.includes("q1")) return "#e30613";
    if (brandLower.includes("tamoil")) return "#e2001a";
    if (brandLower.includes("orlen")) return "#e2001a";
    if (brandLower.includes("globus")) return "#ef7d00";
    if (brandLower.includes("sprint")) return "#005cb9";
    if (brandLower.includes("hoyer")) return "#e30613";
    if (brandLower.includes("markant")) return "#e30613";
    if (brandLower.includes("bft")) return "#00539c";
    if (brandLower.includes("team")) return "#e30613";
    if (brandLower.includes("calpam")) return "#004f9f";
    if (brandLower.includes("mundorf")) return "#e30613";
    if (brandLower.includes("pinoil")) return "#2b7d2b";

    return "gray";
};
