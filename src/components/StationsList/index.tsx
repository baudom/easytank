"use client";

import { FC, useMemo } from "react";
import { useStationsContext } from "@/context/StationsContext";
import { Box, Grid, Loader, Stack, Text } from "@mantine/core";
import FeatureSection from "@/components/FeatureSection";
import StationCard from "@/components/StationCard";
import { T } from "@tolgee/react";
import { sortByNumberAsc } from "@/helper/sortings";

const StationsList: FC = () => {
    const { stations, loading, stationConfig } = useStationsContext();

    const filteredStations = useMemo(
        () =>
            stations
                ?.filter((s) => {
                    const passes = [];
                    if (stationConfig.onlyOpen) {
                        passes.push(s.isOpen);
                    }

                    if (
                        stationConfig.onlyAvailable &&
                        stationConfig.type !== "all"
                    ) {
                        // @ts-ignore
                        passes.push(typeof s[stationConfig.type] === "number");
                    }

                    if (stationConfig.brands?.length) {
                        passes.push(stationConfig.brands.includes(s.brand));
                    }

                    return passes.every(Boolean);
                })
                .sort((a, b) => {
                    if (!stationConfig.order) return 0;

                    if (stationConfig.order === "price" && a.price && b.price) {
                        return sortByNumberAsc(a.price, b.price);
                    } else if (
                        stationConfig.order === "refillPrice" &&
                        a.refillPrice &&
                        b.refillPrice
                    ) {
                        return sortByNumberAsc(a.refillPrice, b.refillPrice);
                    } else if (stationConfig.order === "distance") {
                        return sortByNumberAsc(a.dist, b.dist);
                    }

                    return 0;
                }),
        [
            stations,
            stationConfig.onlyOpen,
            stationConfig.onlyAvailable,
            stationConfig.brands,
            stationConfig.type,
            stationConfig.order,
        ],
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
                        <T keyName="notification.station-search-in-progress" />
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
