import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "../globals.css";
import { Nunito as Font } from "next/font/google";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { FC, ReactNode } from "react";
import { Notifications } from "@mantine/notifications";
import Footer from "@/components/Footer";
import { theme } from "@/theme";
import { getStaticData } from "@/tolgee/shared";
import { notFound } from "next/navigation";
import { TolgeeNextProvider } from "@/tolgee/client";
import { DEFAULT_LOCALE, NOTIFICATION_TIMEOUT } from "@/model/constants";
import { LocaleType, localeTypes } from "@/model";
import AppSettings from "@/components/AppSettings";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `${process.env.NEXT_PUBLIC_NAME} | ${process.env.NEXT_PUBLIC_AUTHOR}`,
        description:
            "Smarte Tankstellensuche, unterstützt durch Tankerkoenig und OpenStreetMap",
        authors: [
            {
                name: process.env.NEXT_PUBLIC_AUTHOR,
                url: process.env.NEXT_PUBLIC_AUTHOR_URL,
            },
        ],
        openGraph: {
            locale: "de_DE",
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
    };
}

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

    const locales = await getStaticData([locale]);

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
                <link
                    rel="icon"
                    href="/favicon.ico"
                />
                <link
                    rel="apple-touch-icon"
                    href="/apple-touch-icon.png"
                />
                <meta
                    name="theme-color"
                    content="#1864AB"
                />
            </head>
            <body style={{ minHeight: "100vh" }}>
                <TolgeeNextProvider
                    locale={locale}
                    locales={locales}
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
                </TolgeeNextProvider>
            </body>
        </html>
    );
};

export default Layout;
