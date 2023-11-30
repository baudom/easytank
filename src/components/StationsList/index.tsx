"use client";

import { FC, useMemo } from "react";
import { useStationsContext } from "@/context/StationsContext";
import { Grid, Loader, Stack, Text } from "@mantine/core";
import FeatureSection from "@/components/FeatureSection";
import StationCard from "@/components/StationCard";

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
                    <Text>Tankstellen werden gesucht...</Text>
                </Stack>
            );
        } else if (!stations) {
            return <FeatureSection />;
        }

        return stations.length ? (
            <Grid>
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
                Es wurden keine Tankstellen gefunden!
            </Text>
        );
    }, [loading, stations]);
};

export default StationsList;
