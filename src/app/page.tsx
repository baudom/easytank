import Welcome from "@/components/Welcome";
import ColorSchemeToggle from "@/components/ColorSchemeToggle";
import { FC } from "react";
import Footer from "@/components/Footer";

const Page: FC = () => {
    return (
        <>
            <Welcome />
            <ColorSchemeToggle />
            <Footer />
        </>
    );
};

export default Page;
