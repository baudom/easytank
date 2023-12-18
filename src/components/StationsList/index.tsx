"use client";

import { FC, useMemo } from "react";
import { useStationsContext } from "@/context/StationsContext";
import { Box, Grid, Loader, Stack, Text } from "@mantine/core";
import FeatureSection from "@/components/FeatureSection";
import StationCard from "@/components/StationCard";
import { T } from "@tolgee/react";

const StationsList: FC = () => {
    const { stations, loading, stationConfig } = useStationsContext();

    const filteredStations = useMemo(
        () =>
            stations?.filter((s) => {
                let result = true;
                if (stationConfig.onlyOpen) {
                    result = s.isOpen;
                }

                if (stationConfig.brands?.length) {
                    result = result && stationConfig.brands.includes(s.brand);
                }

                return result;
            }),
        [stationConfig.onlyOpen, stationConfig.brands, stations],
    );

    return useMemo(() => {
        if (loading) {
            return (
                <Stack
                    align="center"
                    gap="xs"
                >
                    <Loader type="dots" />
                    <Text>
                        <T keyName="notification.location-search-in-progress" />
                    </Text>
                </Stack>
            );
        } else if (!stations) {
            return <FeatureSection />;
        }

        return filteredStations?.length ? (
            <Box pb="lg">
                <Grid
                    mb={0}
                    pb="sm"
                >
                    {filteredStations.map((s) => (
                        <Grid.Col
                            key={s.id}
                            span={{
                                xl: 4,
                                lg: 4,
                                md: 4,
                                sm: 6,
                                xs: 6,
                            }}
                        >
                            <StationCard station={s} />
                        </Grid.Col>
                    ))}
                </Grid>
                <Text
                    size="sm"
                    ta="center"
                    c="dimmed"
                >
                    <T
                        keyName="text.n-stations-shown"
                        params={{
                            total: stations.length ?? 0,
                            count: filteredStations.length ?? 0,
                        }}
                    />
                </Text>
            </Box>
        ) : (
            <Text
                ta="center"
                size="lg"
            >
                <T
                    keyName="text.n-stations-found"
                    params={{ count: 0 }}
                />
            </Text>
        );
    }, [filteredStations, loading, stations]);
};

export default StationsList;
