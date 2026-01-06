import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "../globals.css";
import { Nunito as Font } from "next/font/google";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { FC, ReactNode } from "react";
import { Notifications } from "@mantine/notifications";
import Footer from "@/components/Footer";
import { theme } from "@/theme";
import { notFound } from "next/navigation";
import { DEFAULT_LOCALE, NOTIFICATION_TIMEOUT } from "@/model/constants";
import { LocaleType, localeTypes } from "@/model";
import AppSettings from "@/components/AppSettings";
import { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

export async function generateMetadata({
    params: { locale = DEFAULT_LOCALE },
}: Props): Promise<Metadata> {
    const t = await getTranslations({ locale, namespace: "metadata" });

    return {
        metadataBase: new URL(process.env.NEXT_PUBLIC_HOMEPAGE),
        alternates: {
            canonical: `/${locale}`,
            languages: {
                de: "/de",
                en: "/en",
            },
        },
        title: `${process.env.NEXT_PUBLIC_NAME} | ${process.env.NEXT_PUBLIC_AUTHOR}`,
        description: t("description"),
        authors: [
            {
                name: process.env.NEXT_PUBLIC_AUTHOR,
                url: process.env.NEXT_PUBLIC_AUTHOR_URL,
            },
        ],
        openGraph: {
            locale: locale === "de" ? "de_DE" : "en_US",
            type: "website",
            images: ["/icon-512-maskable.png"],
        },
        keywords: [
            "easytank",
            "baudom",
            "Tankstellensuche",
            "Tankstellen",
            "Tankerkoenig",
        ],
        robots: {
            index: true,
            follow: true,
        },
        icons: {
            icon: "/favicon.ico",
            apple: "/apple-touch-icon.png",
        },
        verification: {
            google: process.env.GOOGLE_VERIFICATION_ID,
        },
    };
}

export const viewport: Viewport = {
    themeColor: "#1864AB",
};

const font = Font({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-default",
});

type Props = {
    children: ReactNode;
    params: { locale?: string };
};

const Layout: FC<Props> = async ({
    children,
    params: { locale = DEFAULT_LOCALE },
}) => {
    if (!localeTypes.includes(locale as LocaleType)) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <html
            lang={locale}
            className={font.variable}
        >
            <head>
                <ColorSchemeScript defaultColorScheme="dark" />
                <script
                    defer
                    src={process.env.TRACKING_API_HOST}
                    data-website-id={process.env.TRACKING_API_KEY}
                    data-auto-track="false"
                />
            </head>
            <body style={{ minHeight: "100vh" }}>
                <NextIntlClientProvider
                    locale={locale}
                    messages={messages}
                >
                    <MantineProvider
                        theme={theme}
                        defaultColorScheme="dark"
                    >
                        <AppSettings />
                        <Notifications
                            position="top-right"
                            autoClose={NOTIFICATION_TIMEOUT}
                            limit={2}
                            transitionDuration={500}
                        />
                        {children}
                        <Footer />
                    </MantineProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
};

export default Layout;
