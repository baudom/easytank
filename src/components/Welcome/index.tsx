import { Box, Stack, Text, Title } from "@mantine/core";
import { FC } from "react";
import LocationSearch from "@/components/LocationSerach";
import StationsContext from "@/context/StationsContext";
import StationsList from "@/components/StationsList";
import StationFilter from "@/components/StationFilter";
import CarConfigurationContext from "@/context/CarConfigurationContext";

const Welcome: FC = () => {
    return (
        <CarConfigurationContext>
            <StationsContext>
                <Stack>
                    <Box ta="center">
                        <Title>
                            <Text
                                inherit
                                component="span"
                                variant="gradient"
                            >
                                {process.env.NEXT_PUBLIC_NAME}
                            </Text>
                        </Title>
                        <Text size="xs">
                            by {process.env.NEXT_PUBLIC_AUTHOR}
                        </Text>
                    </Box>
                    <LocationSearch />
                    <StationFilter />
                    <StationsList />
                </Stack>
            </StationsContext>
        </CarConfigurationContext>
    );
};

export default Welcome;
