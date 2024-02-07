"use client";

import { FC, memo, useCallback, useMemo, useRef, useState } from "react";
import {
    ActionIcon,
    Autocomplete,
    ComboboxData,
    Group,
    rem,
    useMantineTheme,
} from "@mantine/core";
import {
    IconCheck,
    IconCurrentLocationOff,
    IconSearch,
} from "@tabler/icons-react";
import UserLocation from "@/components/LocationSerach/UserLocation";
import { PARAM_SEARCH } from "@/model/nominatim";
import { Location } from "@/model";
import { useStationsContext } from "@/context/StationsContext";
import CarConfiguration from "@/components/CarConfiguration";
import { useTranslate } from "@tolgee/react";
import StationSortButton from "@/components/StationFilter/StationSortButton";
import { notifications } from "@mantine/notifications";

const iconStyle = { width: rem(18), height: rem(18) };

const LocationSearch: FC = () => {
    const { primaryColor } = useMantineTheme();
    const { setCoords } = useStationsContext();
    const { t } = useTranslate();

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
        const notificationId = notifications.show({
            loading: true,
            title: t("notification.location-search-in-progress"),
            message: undefined,
            autoClose: false,
            withCloseButton: false,
        });

        try {
            inputRef.current?.focus();
            const response = await fetch(`/api/location?${params}`, {});
            if (!response.ok) {
                const res: Response = await response.json();
                throw new Error(JSON.stringify(res));
            }

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

            notifications.update({
                id: notificationId,
                color: "green",
                title: t("notification.search-successful"),
                message: t("text.n-places-found", {
                    count: res.length,
                }),
                icon: <IconCheck style={iconStyle} />,
                loading: false,
                autoClose: 4000,
                withCloseButton: true,
            });
        } catch (e) {
            console.error(e);
            notifications.update({
                id: notificationId,
                color: "red",
                title: t("notification.search-failed"),
                message: t("text.please-retry"),
                icon: <IconCurrentLocationOff style={iconStyle} />,
                loading: false,
                autoClose: 4000,
                withCloseButton: true,
            });
        } finally {
            setLoading(false);
        }
    }, [input, t]);

    return (
        <Group>
            <Autocomplete
                style={{ flex: 1 }}
                autoFocus
                ref={inputRef}
                size="lg"
                placeholder={t("label.search-placeholder")}
                leftSection={userLocation}
                rightSection={
                    <ActionIcon
                        loading={loading}
                        size="lg"
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
                    inputRef.current?.blur();
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
            <StationSortButton />
            <CarConfiguration />
        </Group>
    );
};

export default memo(LocationSearch);
