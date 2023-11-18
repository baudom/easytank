"use client";

import { FC, memo, useEffect, useState } from "react";
import { useDebouncedState } from "@mantine/hooks";
import {
    ActionIcon,
    Autocomplete,
    ComboboxData,
    rem,
    useMantineTheme,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import UserLocation from "@/components/LocationSerach/UserLocation";
import { PARAM_SEARCH } from "@/model/nominatim";
import { Location } from "@/model";

type Coords = Pick<GeolocationCoordinates, "latitude" | "longitude">;

const LocationSearch: FC = () => {
    const theme = useMantineTheme();
    const [coords, setCoords] = useState<Coords | undefined>(undefined);
    const [input, setInput] = useDebouncedState("", 500);
    const [loading, setLoading] = useState(false);
    const [locations, setLocations] = useState<ComboboxData>();

    useEffect(() => {
        console.log("COORDS CHANGED TO ", JSON.stringify(coords));
    }, [coords]);

    useEffect(() => {
        if (!input || !input.trim()) return;

        const params = new URLSearchParams({ [PARAM_SEARCH]: input });
        setLoading(true);
        try {
            fetch(`/api/location?${params}`, {})
                .then((res) => res.json() as Promise<Location[]>)
                .then((res) => {
                    if (!res || !res.length) {
                        setLocations([]);
                    } else {
                        setLocations(
                            res.map((e) => ({
                                value: JSON.stringify({
                                    lat: e.lat,
                                    lon: e.lon,
                                }),
                                label: e.display_name,
                            })),
                        );
                    }
                });
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, [input]);

    return (
        <Autocomplete
            radius="xl"
            size="md"
            placeholder="PLZ oder Ort"
            leftSection={
                <UserLocation
                    onLocationFound={({ latitude, longitude }) =>
                        setCoords({ latitude, longitude })
                    }
                />
            }
            rightSection={
                <ActionIcon
                    loading={loading}
                    size={32}
                    radius="xl"
                    color={theme.primaryColor}
                    variant="filled"
                >
                    <IconSearch
                        style={{ width: rem(18), height: rem(18) }}
                        stroke={1.5}
                    />
                </ActionIcon>
            }
            onChange={setInput}
            data={locations}
            onOptionSubmit={(value) => {
                const location = JSON.parse(value) as Location;
                setCoords({
                    latitude: Number(location.lat),
                    longitude: Number(location.lon),
                });
            }}
        />
    );
};

export default memo(LocationSearch);
