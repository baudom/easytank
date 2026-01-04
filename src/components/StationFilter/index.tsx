"use client";

import { FC, memo, useCallback } from "react";
import { Select, SimpleGrid } from "@mantine/core";
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

    return (
        <SimpleGrid cols={{ base: 2, md: 4 }}>
            <Select
                size="lg"
                data={fuelTypes.map((type) => ({
                    label: t(fuelTypesWithTranslations.get(type)!),
                    value: type,
                }))}
                value={stationConfig.type}
                onChange={onFuelTypeChange}
            />
            <Select
                size="lg"
                data={radiusTypes.map((rad) => ({
                    label: `${rad}km`,
                    value: `${rad}`,
                }))}
                value={`${stationConfig.radius}`}
                onChange={onRadiusChange}
            />
        </SimpleGrid>
    );
};

export default memo(StationFilter);
