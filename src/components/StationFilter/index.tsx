"use client";

import { FC, memo } from "react";
import { Select, SimpleGrid } from "@mantine/core";
import {
    FuelType,
    fuelTypes,
    fuelTypesWithTranslations,
    RadiusType,
    radiusTypes,
} from "@/model";
import { useStationsContext } from "@/context/StationsContext";
import { useTranslate } from "@tolgee/react";

type StationFilterProps = {};

const StationFilter: FC<StationFilterProps> = () => {
    const { stationConfig, setStationConfig } = useStationsContext();

    const { t } = useTranslate();

    return (
        <SimpleGrid cols={{ base: 2, md: 4 }}>
            <Select
                size="lg"
                data={fuelTypes.map((type) => ({
                    label: t(fuelTypesWithTranslations.get(type)!),
                    value: type,
                }))}
                value={stationConfig.type}
                onChange={(type) =>
                    type && setStationConfig({ type: type as FuelType })
                }
            />
            <Select
                size="lg"
                data={radiusTypes.map((rad) => ({
                    label: `${rad}km`,
                    value: `${rad}`,
                }))}
                value={`${stationConfig.radius}`}
                onChange={(radius) =>
                    radius &&
                    setStationConfig({
                        radius: Number(radius) as RadiusType,
                    })
                }
            />
        </SimpleGrid>
    );
};

export default memo(StationFilter);
