import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { localeTypes } from "@/model";

export default getRequestConfig(async ({ locale }) => {
    // Validate that the incoming `locale` parameter is valid
    if (!localeTypes.includes(locale as any)) notFound();

    return {
        messages: (await import(`../i18n/${locale}.json`)).default,
    };
});
