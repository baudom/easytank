import { MetadataRoute } from "next";
import { localeTypes } from "@/model";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_HOMEPAGE;

    return localeTypes.map((locale) => ({
        url: `${baseUrl}${locale}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 1,
    }));
}
