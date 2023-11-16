export type LinkType = {
    link: string;
    label: string;
};

const links = [
    {
        link: process.env.NEXT_PUBLIC_AUTHOR_URL,
        label: `${process.env.NEXT_PUBLIC_NAME} v${process.env.NEXT_PUBLIC_VERSION} made with ❤️ by ${process.env.NEXT_PUBLIC_AUTHOR}`,
    },
    {
        link: "https://www.paypal.com/paypalme/dominikbaurecht",
        label: `Donate with PayPal`,
    },
    {
        link: "https://www.tankerkoenig.de",
        label: `Stations by Tankerkoenig`,
    },
    {
        link: "https://openstreetmap.org/copyright",
        label: `Locations by OpenStreetMap`,
    },
    { link: "https://status.baudom.de/status/easytank", label: "Status" },
];

export default links;
