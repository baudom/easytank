import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./globals.css";
import { Nunito as Font } from "next/font/google";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { FC, ReactNode } from "react";
import { Notifications } from "@mantine/notifications";
import Footer from "@/components/Footer";
import { theme } from "@/theme";

export const metadata = {
    title: "My Mantine App",
};

const font = Font({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-default",
});

type Props = {
    children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
    return (
        <html
            lang="de"
            className={font.variable}
        >
            <head>
                <ColorSchemeScript />
                <link
                    rel="icon"
                    href="/favicon.ico"
                />
            </head>
            <body>
                <MantineProvider theme={theme}>
                    <Notifications
                        position="top-right"
                        autoClose={4000}
                    />
                    {children}
                    <Footer />
                </MantineProvider>
            </body>
        </html>
    );
};

export default Layout;
