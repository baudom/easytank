"use client";

import { Space, Text, Title } from "@mantine/core";
import { FC } from "react";
import LocationSearch from "@/components/LocationSerach";
import StationsContext from "@/context/StationsContext";
import StationsList from "@/components/StationsList";
import StationFilter from "@/components/StationFilter";

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
                <Space h="md" />
                <LocationSearch />
                <Space h="md" />
                <StationFilter />
                <Space h="md" />
                <StationsList />
            </Title>
        </StationsContext>
    );
};

export default Welcome;
