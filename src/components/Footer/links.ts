export type LinkType = {
    link: string;
    label: string;
};

const links = [
    {
        link: process.env.NEXT_PUBLIC_REPOSITORY_URL,
        label: `${process.env.NEXT_PUBLIC_NAME} v${process.env.NEXT_PUBLIC_VERSION} made with ❤️ by ${process.env.NEXT_PUBLIC_AUTHOR}`,
    },
    {
        link: "https://www.tankerkoenig.de",
        label: `Stations by Tankerkoenig`,
    },
    {
        link: "https://openstreetmap.org/copyright",
        label: `Locations by OpenStreetMap`,
    },
    { link: process.env.NEXT_PUBLIC_STATUS_URL, label: "Status" },
    {
        link: `mailto:${process.env.NEXT_PUBLIC_CONTACT_MAIL}`,
        label: "Kontakt",
        labelKey: "label.contact",
    },
];

export default links;
