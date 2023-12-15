"use client";

import { FC, useCallback, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { ActionIcon } from "@mantine/core";
import { DEFAULT_LOCALE } from "@/model/constants";
import { LocaleType } from "@/model";

const LanguageToggle: FC = () => {
    const locale = useLocale();
    const router = useRouter();
    const [, startTransition] = useTransition();

    const toggleLanguage = useCallback(() => {
        const nextLocale: LocaleType =
            locale === DEFAULT_LOCALE ? "en" : DEFAULT_LOCALE;
        startTransition(() => {
            router.replace(`/${nextLocale}`);
        });
    }, [locale, router]);

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
