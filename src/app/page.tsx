import Welcome from "@/components/Welcome";
import ColorSchemeToggle from "@/components/ColorSchemeToggle";
import { FC } from "react";
import { Container } from "@mantine/core";

const Home: FC = () => {
    return (
        <Container>
            <Welcome />
            <ColorSchemeToggle />
        </Container>
    );
};

export default Home;
