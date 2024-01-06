"use client";

import { FC, useCallback, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { ActionIcon } from "@mantine/core";
import { DEFAULT_LOCALE } from "@/model/constants";
import { LocaleType } from "@/model";
import useTracking from "@/hooks/useTracking";

const LanguageToggle: FC = () => {
    const locale = useLocale();
    const router = useRouter();
    const { trackLanguageSelect } = useTracking();
    const [, startTransition] = useTransition();

    const toggleLanguage = useCallback(() => {
        const nextLocale: LocaleType =
            locale === DEFAULT_LOCALE ? "en" : DEFAULT_LOCALE;

        void trackLanguageSelect(nextLocale);
        startTransition(() => {
            router.replace(`/${nextLocale}`);
        });
    }, [locale, router, trackLanguageSelect]);

    return (
        <ActionIcon
            onClick={toggleLanguage}
            style={{ cursor: "pointer" }}
            variant="light"
            size="lg"
        >
            {locale === "de" ? "🇩🇪" : "🇺🇸"}
        </ActionIcon>
    );
};

export default LanguageToggle;
