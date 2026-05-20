"use client";

import { FC, memo, useCallback, useEffect, useMemo, useState } from "react";
import {
    Group,
    rem,
    SegmentedControl,
    Select,
    SimpleGrid,
    Skeleton,
} from "@mantine/core";
import {
    FuelType,
    fuelTypes,
    fuelTypesWithTranslations,
    RadiusType,
    radiusTypes,
} from "@/model";
import { useStationsContext } from "@/context/StationsContext";
import { useTranslations } from "next-intl";
import useTracking from "@/hooks/useTracking";

type StationFilterProps = {};

const StationFilter: FC<StationFilterProps> = () => {
    const { stationConfig, setStationConfig } = useStationsContext();
    const { trackFuelTypeChange, trackRadiusChange } = useTracking();
    const t = useTranslations();
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        const id = requestAnimationFrame(() => setHydrated(true));
        return () => cancelAnimationFrame(id);
    }, []);

    const onFuelTypeChange = useCallback(
        (fuelType: string | null) => {
            if (!fuelType) return;

            const value = fuelType as FuelType;
            setStationConfig({ type: value });
            trackFuelTypeChange(value);
        },
        [setStationConfig, trackFuelTypeChange],
    );

    const onRadiusChange = useCallback(
        (radius: string | null) => {
            if (radius == null) return;

            const value = Number(radius) as RadiusType;
            setStationConfig({ radius: value });
            trackRadiusChange(value);
        },
        [setStationConfig, trackRadiusChange],
    );

    const fuelData = useMemo(
        () =>
            fuelTypes.map((type) => ({
                label: t(fuelTypesWithTranslations.get(type)!),
                value: type,
            })),
        [t],
    );

    const radiusData = useMemo(
        () =>
            radiusTypes.map((rad) => ({
                label: `${rad}km`,
                value: `${rad}`,
            })),
        [],
    );

    if (!hydrated) {
        return (
            <>
                <SimpleGrid
                    cols={2}
                    hiddenFrom="md"
                >
                    <Skeleton height={rem(50)} />
                    <Skeleton height={rem(50)} />
                </SimpleGrid>
                <Group
                    grow
                    visibleFrom="md"
                >
                    <Skeleton height={rem(50)} />
                    <Skeleton height={rem(50)} />
                </Group>
            </>
        );
    }

    return (
        <>
            <SimpleGrid
                cols={2}
                hiddenFrom="md"
            >
                <Select
                    size="lg"
                    data={fuelData}
                    value={stationConfig.type}
                    onChange={onFuelTypeChange}
                />
                <Select
                    size="lg"
                    data={radiusData}
                    value={`${stationConfig.radius}`}
                    onChange={onRadiusChange}
                />
            </SimpleGrid>

            <Group
                grow
                visibleFrom="md"
            >
                <SegmentedControl
                    fullWidth
                    size="lg"
                    data={fuelData}
                    value={stationConfig.type}
                    onChange={onFuelTypeChange}
                />
                <SegmentedControl
                    fullWidth
                    size="lg"
                    data={radiusData}
                    value={`${stationConfig.radius}`}
                    onChange={onRadiusChange}
                />
            </Group>
        </>
    );
};

export default memo(StationFilter);
