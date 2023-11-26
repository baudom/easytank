import Welcome from "@/components/Welcome";
import ColorSchemeToggle from "@/components/ColorSchemeToggle";
import { FC } from "react";
import { Container } from "@mantine/core";

const Page: FC = () => {
    return (
        <Container
            style={{ flex: 1, width: "100%" }}
            pt="xl"
            size="lg"
        >
            <Welcome />
            <ColorSchemeToggle />
        </Container>
    );
};

export default Page;
