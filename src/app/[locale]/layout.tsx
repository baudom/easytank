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

export const metadata = {
    title: "easytank | baudom",
    description: "Tankstellensuche powered by Tankerkoenig und OpenStreetMap",
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

    const locales = await getStaticData([locale]);

    return (
        <html
            lang={locale}
            className={font.variable}
        >
            <head>
                <ColorSchemeScript defaultColorScheme="dark" />
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
                <meta
                    name="og:image"
                    content="/icon-512-maskable.png"
                />
                <meta
                    name="og:image:alt"
                    content="Tankstellensuche powered by Tankerkoenig und OpenStreetMap"
                />
            </head>
            <body>
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
