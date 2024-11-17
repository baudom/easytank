import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "easytank | baudom",
        short_name: "easytank",
        start_url: "/",
        display: "standalone",
        orientation: "portrait-primary",
        theme_color: "#1864AB",
        background_color: "#1A1B1E",
        description:
            "Tankstellensuche powered by Tankerkoenig und OpenStreetMap",
        icons: [
            {
                src: "/favicon.ico",
                type: "image/x-icon",
                sizes: "32x32",
            },
            {
                src: "/icon-192.png",
                type: "image/png",
                sizes: "192x192",
            },
            {
                src: "/icon-192-maskable.png",
                type: "image/png",
                sizes: "192x192",
                purpose: "maskable",
            },
            {
                src: "/icon-512.png",
                type: "image/png",
                sizes: "512x512",
            },
            {
                src: "/icon-512-maskable.png",
                type: "image/png",
                sizes: "512x512",
                purpose: "maskable",
            },
            {
                src: "/icon-monochrome.png",
                type: "image/png",
                sizes: "216x216",
                purpose: "monochrome",
            },
        ],
        shortcuts: [
            {
                name: "Umgebungssuche",
                short_name: "Umgebungssuche",
                description: "Suche in der Umgebung mithilfe deines Standortes",
                url: "/?search-now",
                icons: [
                    {
                        src: "/shortcut-icon/icon-192.png",
                        type: "image/png",
                        sizes: "192x192",
                    },
                    {
                        src: "/shortcut-icon/icon-192-maskable.png",
                        type: "image/png",
                        sizes: "192x192",
                        purpose: "maskable",
                    },
                    {
                        src: "/shortcut-icon/icon-512.png",
                        type: "image/png",
                        sizes: "512x512",
                    },
                    {
                        src: "/shortcut-icon/icon-512-maskable.png",
                        type: "image/png",
                        sizes: "512x512",
                        purpose: "maskable",
                    },
                    {
                        src: "/shortcut-icon/icon-monochrome.png",
                        type: "image/png",
                        sizes: "216x216",
                        purpose: "monochrome",
                    },
                ],
            },
        ],
    };
}
