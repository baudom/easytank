import { Station } from "@/model/tankerkoenig";

export const createGoogleMapsLink = ({ lat, lng, ...rest }: Station) => {
    const queryStr = `${rest.name} ${rest.street} ${rest.houseNumber} ${rest.postCode} ${rest.place}`;
    const url = new URL("https://www.google.com/maps/search/?api=1");
    url.searchParams.append("query", queryStr);
    return url.toString();
};

export const getStationThumb = ({ brand }: Station) => {
    // TODO: copyright?
    return null;

    if (brand.startsWith("EDEKA")) {
        return "https://verbund.edeka/verbund/presse/mediathek/edeka_preview-logo.jpg?impolicy=4x3";
    }

    switch (brand) {
        case "AVIA":
        case "AVIA XPress":
            return "https://www.avia.de/favicon.ico";
        case "OMV":
            return "https://www.omv.de/favicon.ico";
        case "ESSO":
            return "https://www.esso.de/-/media/favicons/brands/esso/esso_favicon_16x16px_144dpi.png";
        case "RAN":
            return "https://www.ran-tankstellen.de/favicon.ico";
        case "JET":
            return "https://www.jet.de/favicon.ico";
        case "ARAL":
            return "https://www.aral.de/apps/settings/wcm/designs/refresh/aral/favicon.ico";
        case "Shell":
            return "https://www.shell.de/favicon.ico";
        case "BayWa":
            return "https://www.baywa-mobility.de/images/icons/apple-touch-icon.png";
        case "TotalEnergies":
            return "https://totalenergies.de/sites/all/themes/custom/totalenergy_theme/favicon.ico";
    }

    return null;
};
