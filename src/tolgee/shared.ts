import { DevTools, Tolgee } from "@tolgee/web";
import { FormatIcu } from "@tolgee/format-icu";
import { localeTypes } from "@/model";
import { DEFAULT_LOCALE } from "@/model/constants";

export async function getStaticData(languages: string[]) {
    const result: Record<string, any> = {};
    for (const lang of languages) {
        result[lang] = (await import(`../../i18n/${lang}.json`)).default;
    }
    return result;
}

export function TolgeeBase() {
    return Tolgee()
        .use(FormatIcu())
        .use(DevTools())
        .updateDefaults({
            apiKey: process.env.NEXT_PUBLIC_TOLGEE_API_KEY,
            apiUrl: process.env.NEXT_PUBLIC_TOLGEE_API_URL,
            availableLanguages: [...localeTypes],
            defaultLanguage: DEFAULT_LOCALE,
        });
}
