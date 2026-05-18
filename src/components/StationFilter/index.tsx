"use client";

import { FC, memo, useCallback, useMemo } from "react";
import { Group, SegmentedControl, Select, SimpleGrid } from "@mantine/core";
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
