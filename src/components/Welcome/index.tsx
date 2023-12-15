import { Anchor, Box, Stack, Text, Title } from "@mantine/core";
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
                        <Anchor<"a">
                            c="dimmed"
                            href={process.env.NEXT_PUBLIC_AUTHOR_URL}
                            target="_blank"
                            size="xs"
                        >
                            by {process.env.NEXT_PUBLIC_AUTHOR}
                        </Anchor>
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
