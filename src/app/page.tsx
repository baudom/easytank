import Welcome from "@/components/Welcome";
import ColorSchemeToggle from "@/components/ColorSchemeToggle";
import { FC } from "react";
import { Container } from "@mantine/core";

const Page: FC = () => {
    return (
        <Container
            pt="xl"
            size="lg"
        >
            <Welcome />
            <ColorSchemeToggle />
        </Container>
    );
};

export default Page;
