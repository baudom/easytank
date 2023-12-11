import Welcome from "@/components/Welcome";
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
        </Container>
    );
};

export default Page;
