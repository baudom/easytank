"use client";

import { Text, Title } from "@mantine/core";
import { FC } from "react";
import LocationSearch from "@/components/LocationSerach";
import StationsContext from "@/context/StationsContext";

const Welcome: FC = () => {
    return (
        <StationsContext>
            <Title ta={"center"}>
                <Text
                    inherit
                    variant="gradient"
                    component="span"
                    gradient={{ from: "pink", to: "yellow" }}
                >
                    {process.env.NEXT_PUBLIC_NAME}
                </Text>
                <LocationSearch />
            </Title>
        </StationsContext>
    );
};

export default Welcome;
