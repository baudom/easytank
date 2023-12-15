"use client";

import { FC, useMemo } from "react";
import { useStationsContext } from "@/context/StationsContext";
import { Grid, Loader, Stack, Text } from "@mantine/core";
import FeatureSection from "@/components/FeatureSection";
import StationCard from "@/components/StationCard";
import { T } from "@tolgee/react";

const StationsList: FC = () => {
    const { stations, loading } = useStationsContext();
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

        return stations.length ? (
            <Grid
                mb={0}
                pb="lg"
            >
                {stations.map((s) => (
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
    }, [loading, stations]);
};

export default StationsList;
