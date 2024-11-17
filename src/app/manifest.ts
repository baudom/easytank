import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        id: "/",
        start_url: "/",
        name: `${process.env.NEXT_PUBLIC_NAME} | ${process.env.NEXT_PUBLIC_AUTHOR}`,
        short_name: process.env.NEXT_PUBLIC_NAME,
        display: "standalone",
        orientation: "portrait-primary",
        theme_color: "#1864AB",
        background_color: "#1A1B1E",
        description:
            "Smarte Tankstellensuche, unterstützt durch Tankerkoenig und OpenStreetMap",
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
        screenshots: [
            {
                src: "/screenshots/desktop-landing.png",
                type: "image/png",
                sizes: "2418x1639",
                form_factor: "wide",
                label: "Desktop Landing",
            },
            {
                src: "/screenshots/desktop-filter.png",
                type: "image/png",
                sizes: "2418x1639",
                form_factor: "wide",
                label: "Desktop Filter",
            },
            {
                src: "/screenshots/desktop-car-config.png",
                type: "image/png",
                sizes: "2418x1639",
                form_factor: "wide",
                label: "Desktop Car Configuration",
            },
            {
                src: "/screenshots/mobile-landing.png",
                type: "image/png",
                sizes: "1536x2048",
                form_factor: "narrow",
                label: "Mobile Landing",
            },
            {
                src: "/screenshots/mobile-filter.png",
                type: "image/png",
                sizes: "1536x2048",
                form_factor: "narrow",
                label: "Mobile Filter",
            },
            {
                src: "/screenshots/mobile-car-config.png",
                type: "image/png",
                sizes: "1536x2048",
                form_factor: "narrow",
                label: "Mobile Car Configuration",
            },
        ],
    };
}
