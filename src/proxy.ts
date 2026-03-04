import createMiddleware from "next-intl/middleware";
import { DEFAULT_LOCALE } from "@/model/constants";
import { localeTypes } from "@/model";

export default createMiddleware({
    locales: localeTypes,
    defaultLocale: DEFAULT_LOCALE,
});

export const config = {
    // Skip all paths that should not be internationalized
    matcher: ["/((?!api|_next|.*\\..*).*)"],
};
