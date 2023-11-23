"use client";

import { FC, memo, useCallback, useMemo, useRef, useState } from "react";
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
import { useStationsContext } from "@/context/StationsContext";

const LocationSearch: FC = () => {
    const { primaryColor } = useMantineTheme();
    const { setCoords } = useStationsContext();

    const inputRef = useRef<HTMLInputElement>(null);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const [locations, setLocations] = useState<ComboboxData>();

    const userLocation = useMemo(
        () => (
            <UserLocation
                onLocationFound={({ latitude, longitude }) =>
                    setCoords({ latitude, longitude })
                }
            />
        ),
        [setCoords],
    );

    const onSearchLocations = useCallback(async () => {
        if (!input || !input.trim()) return;

        const params = new URLSearchParams({ [PARAM_SEARCH]: input });
        setLoading(true);

        try {
            inputRef.current?.focus();
            const response = await fetch(`/api/location?${params}`, {});
            const res: Location[] = await response.json();
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
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, [input]);

    return (
        <Autocomplete
            autoFocus
            ref={inputRef}
            radius="xl"
            size="md"
            placeholder="PLZ oder Ort"
            leftSection={userLocation}
            rightSection={
                <ActionIcon
                    loading={loading}
                    size={32}
                    radius="xl"
                    color={primaryColor}
                    variant="filled"
                    onClick={onSearchLocations}
                >
                    <IconSearch
                        style={{ width: rem(18), height: rem(18) }}
                        stroke={1.5}
                    />
                </ActionIcon>
            }
            onChange={setInput}
            data={locations}
            selectFirstOptionOnChange
            onOptionSubmit={(value) => {
                const location = JSON.parse(value) as Location;
                setCoords({
                    latitude: Number(location.lat),
                    longitude: Number(location.lon),
                });
            }}
            onKeyDownCapture={(ev) => {
                if (ev.key !== "Enter") return;
                return onSearchLocations();
            }}
        />
    );
};

export default memo(LocationSearch);
