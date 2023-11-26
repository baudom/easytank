import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { Nunito as Font } from "next/font/google";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { FC, ReactNode } from "react";
import { Notifications } from "@mantine/notifications";
import Footer from "@/components/Footer";
import { theme } from "@/theme";

const font = Font({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-default",
});

export const metadata = {
    title: "My Mantine App",
};

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
