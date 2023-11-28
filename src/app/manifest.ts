import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "easytank | baudom",
        short_name: "easytank",
        start_url: "/",
        display: "standalone",
        orientation: "portrait",
        theme_color: "transparent",
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
                src: "/icon-512.png",
                type: "image/png",
                sizes: "512x512",
            },
            {
                src: "/icon-192-maskable.png",
                type: "image/png",
                sizes: "192x192",
                purpose: "maskable",
            },
            {
                src: "/icon-512-maskable.png",
                type: "image/png",
                sizes: "512x512",
                purpose: "maskable",
            },
        ],
    };
}
