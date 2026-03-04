import { getRequestConfig } from "next-intl/server";
import { LocaleType, localeTypes } from "@/model";

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    if (!locale || !localeTypes.includes(locale as any)) {
        locale = "de" as LocaleType;
    }

    return {
        locale,
        messages: (await import(`../../i18n/${locale}.json`)).default,
    };
});
