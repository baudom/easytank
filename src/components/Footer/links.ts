import { ACTION_RELEASE_NOTES } from "@/model/constants";

export type LinkType = {
    link: string;
    label: string;
    labelKey?: string;
    action?: string;
};

const links: LinkType[] = [
    {
        link: process.env.NEXT_PUBLIC_REPOSITORY_URL as string,
        label: `${process.env.NEXT_PUBLIC_NAME} made with ❤️ by ${process.env.NEXT_PUBLIC_AUTHOR}`,
    },
    {
        link: "#",
        label: `Release v${process.env.NEXT_PUBLIC_VERSION}`,
        action: ACTION_RELEASE_NOTES,
    },
    {
        link: "https://www.tankerkoenig.de",
        label: `Stations by Tankerkoenig`,
    },
    {
        link: "https://openstreetmap.org/copyright",
        label: `Locations by OpenStreetMap`,
    },
    { link: process.env.NEXT_PUBLIC_STATUS_URL as string, label: "Status" },
    {
        link: `mailto:${process.env.NEXT_PUBLIC_CONTACT_MAIL}`,
        label: "Kontakt",
        labelKey: "label.contact",
    },
];

export default links;
