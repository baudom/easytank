import { useLocale } from "next-intl";

import { getStaticData, TolgeeBase } from "./shared";
import { createServerInstance } from "@tolgee/react/server";
import { localeTypes } from "@/model";

export const { getTolgee, getTranslate, T } = createServerInstance({
    getLocale: useLocale,
    createTolgee: async (locale) =>
        TolgeeBase().init({
            // load all languages on the server
            staticData: await getStaticData([...localeTypes]),
            observerOptions: {
                fullKeyEncode: true,
            },
            language: locale,
            // using custom fetch to avoid aggressive caching
            fetch: (input, init) => {
                return fetch(input, {
                    ...init,
                    next: { revalidate: 60 * 15 },
                });
            },
        }),
});
