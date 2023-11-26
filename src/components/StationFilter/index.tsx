import { FC, memo } from "react";
import { Group, Select } from "@mantine/core";
import { FuelType, fuelTypes, RadiusType, radiusTypes } from "@/model";
import { mapFuelTypeToString } from "@/helper/mappings";
import { useStationsContext } from "@/context/StationsContext";

type StationFilterProps = {};

const StationFilter: FC<StationFilterProps> = () => {
    const { stationConfig, setStationConfig } = useStationsContext();

    return (
        <Group wrap="nowrap">
            <Select
                size="md"
                data={fuelTypes.map((type) => ({
                    label: mapFuelTypeToString(type),
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
        </Group>
    );
};

export default memo(StationFilter);
