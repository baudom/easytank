"use client";

import { FC, memo, useMemo } from "react";
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
import StationBrandSelect from "@/components/StationFilter/StationBrandSelect";
import OpenClosedSwitch from "@/components/StationFilter/OpenClosedSwitch";

type StationFilterProps = {};

const StationFilter: FC<StationFilterProps> = () => {
    const { stationConfig, setStationConfig, stations } = useStationsContext();

    const brands = useMemo(
        () =>
            stations
                ?.map((s) => s.brand)
                .filter((s, i, self) => self.indexOf(s) === i),
        [stations],
    );

    const { t } = useTranslate();

    return (
        <SimpleGrid cols={{ base: 2, md: 4 }}>
            <Select
                size="md"
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
                size="md"
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
            {brands?.length ? <StationBrandSelect brands={brands} /> : null}
            <OpenClosedSwitch />
        </SimpleGrid>
    );
};

export default memo(StationFilter);
