"use client";

import { FC, useMemo } from "react";
import { useStationsContext } from "@/context/StationsContext";
import { Box, Grid, Loader, Stack, Text } from "@mantine/core";
import FeatureSection from "@/components/FeatureSection";
import StationCard from "@/components/StationCard";
import { useTranslations } from "next-intl";
import { sortByNumberAsc } from "@/helper/sortings";

const StationsList: FC = () => {
    const t = useTranslations();
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

                    if (stationConfig?.onlyRydSupported) {
                        passes.push(s.isRydSupportedBrand);
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
            stationConfig.type,
            stationConfig.brands,
            stationConfig?.onlyRydSupported,
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
                    <Text>{t("notification.station-search-in-progress")}</Text>
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
                    {t("text.n-stations-shown", {
                        total: stations.length ?? 0,
                        count: filteredStations.length ?? 0,
                    })}
                </Text>
            </Box>
        ) : (
            <Text
                ta="center"
                size="lg"
            >
                {t("text.n-stations-found", { count: 0 })}
            </Text>
        );
    }, [filteredStations, loading, stations, t]);
};

export default StationsList;
