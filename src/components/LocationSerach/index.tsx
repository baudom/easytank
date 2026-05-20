"use client";

import { FC, memo, useCallback, useEffect, useRef, useState } from "react";
import {
    ActionIcon,
    Autocomplete,
    Box,
    ComboboxData,
    Group,
    Pill,
    rem,
    Stack,
    useMantineTheme,
} from "@mantine/core";
import {
    IconCheck,
    IconCurrentLocationOff,
    IconSearch,
} from "@tabler/icons-react";
import UserLocation from "@/components/LocationSerach/UserLocation";
import { PARAM_SEARCH } from "@/model/nominatim";
import { LastSearchTermType, Location } from "@/model";
import { useStationsContext } from "@/context/StationsContext";
import { useTranslations } from "next-intl";
import StationFilterButton from "@/components/StationFilter/Button";
import CarConfigurationButton from "@/components/CarConfiguration/Button";
import { notifications } from "@mantine/notifications";
import { useDebouncedValue, useHotkeys } from "@mantine/hooks";
import { NOTIFICATION_TIMEOUT } from "@/model/constants";
import useTracking from "@/hooks/useTracking";
import { useSearchParams } from "next/navigation";

const iconStyle = { width: rem(18), height: rem(18) };
const DEBOUNCE_TIMEOUT = 500;

const LocationSearch: FC = () => {
    const { primaryColor } = useMantineTheme();
    const { setCoords, stationConfig, setStationConfig } = useStationsContext();
    const t = useTranslations();
    const { trackEvent } = useTracking();
    const userLocationRef = useRef<HTMLButtonElement>(null);

    const inputRef = useRef<HTMLInputElement>(null);
    const [input, setInput] = useState("");
    const [locations, setLocations] = useState<ComboboxData>();
    const [loading, setLoading] = useState(false);

    const searchParams = useSearchParams();
    const isRestored = useRef(false);
    const [hydrated, setHydrated] = useState(false);

    const [debouncedInput, cancelDebounce] = useDebouncedValue(
        input,
        DEBOUNCE_TIMEOUT,
    );

    useHotkeys([
        [
            "mod+K",
            () => {
                inputRef.current?.focus();
                inputRef.current?.select();
            },
        ],
    ]);

    useEffect(() => {
        setHydrated(true);
        setTimeout(() => {
            if (!isRestored.current) {
                inputRef.current?.focus();
            }
        }, 100);
    }, []);

    const onSearchLocations = useCallback(
        async (manual = false) => {
            if (!debouncedInput || !debouncedInput.trim()) return;

            if (manual) void trackEvent("manual-search");
            setLoading(true);

            let notificationId: string | undefined;
            if (manual) {
                notificationId = notifications.show({
                    loading: true,
                    title: t("notification.location-search-in-progress"),
                    message: undefined,
                    autoClose: false,
                    withCloseButton: false,
                });
            }

            try {
                if (manual) inputRef.current?.focus();
                const params = new URLSearchParams({
                    [PARAM_SEARCH]: debouncedInput,
                });
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
                        res.map((cur) => ({
                            value: JSON.stringify(cur),
                            label: cur.display_name,
                        })),
                    );
                }

                if (notificationId) {
                    notifications.update({
                        id: notificationId,
                        color: "green",
                        title: t("notification.search-successful"),
                        message: t("text.n-places-found", {
                            count: res.length,
                        }),
                        icon: <IconCheck style={iconStyle} />,
                        loading: false,
                        autoClose: NOTIFICATION_TIMEOUT,
                        withCloseButton: true,
                    });
                }
            } catch (e) {
                console.error(e);
                if (notificationId) {
                    notifications.update({
                        id: notificationId,
                        color: "red",
                        title: t("notification.search-failed"),
                        message: t("text.please-retry"),
                        icon: <IconCurrentLocationOff style={iconStyle} />,
                        loading: false,
                        autoClose: NOTIFICATION_TIMEOUT,
                        withCloseButton: true,
                    });
                }
            } finally {
                setLoading(false);
            }
        },
        [debouncedInput, t, trackEvent],
    );

    useEffect(() => {
        void onSearchLocations(false);
    }, [debouncedInput, onSearchLocations]);

    useEffect(() => {
        if (!hydrated) return;
        if (isRestored.current) return;

        if (searchParams.has("search-now")) {
            userLocationRef?.current?.click?.();
        } else if (stationConfig.appStartAction === "currentLocation") {
            userLocationRef?.current?.click?.();
        } else if (
            stationConfig.appStartAction === "lastSearchTerm" &&
            stationConfig.lastSearchTerm?.input &&
            stationConfig.lastSearchTerm?.latitude &&
            stationConfig.lastSearchTerm?.longitude
        ) {
            const {
                input: lastInput,
                latitude,
                longitude,
            } = stationConfig.lastSearchTerm;
            setInput(lastInput);
            setCoords({ latitude, longitude });
        }

        isRestored.current = true;
    }, [
        hydrated,
        searchParams,
        setCoords,
        stationConfig.lastSearchTerm,
        stationConfig.appStartAction,
    ]);

    const handleSelectLocation = useCallback(
        (locationName: string, lat: number, lon: number) => {
            inputRef.current?.blur();
            setInput(locationName);

            let newHistory = stationConfig.searchHistory || [];
            if (stationConfig.saveSearchHistory) {
                const newEntry: LastSearchTermType = {
                    input: locationName,
                    latitude: lat,
                    longitude: lon,
                };
                newHistory = [
                    newEntry,
                    ...newHistory.filter((e) => e.input !== newEntry.input),
                ].slice(0, 5);
            }

            setStationConfig({
                lastSearchTerm: {
                    input: locationName,
                    latitude: lat,
                    longitude: lon,
                },
                searchHistory: newHistory,
            });
            setCoords({
                latitude: lat,
                longitude: lon,
            });

            // cancel debounce after setting value to input
            setTimeout(cancelDebounce, DEBOUNCE_TIMEOUT / 2);
        },
        [
            cancelDebounce,
            setCoords,
            setStationConfig,
            stationConfig.saveSearchHistory,
            stationConfig.searchHistory,
        ],
    );

    const handleRemoveHistoryItem = useCallback(
        (input: string) => {
            setStationConfig({
                searchHistory: (stationConfig.searchHistory || []).filter(
                    (e) => e.input !== input,
                ),
            });
        },
        [setStationConfig, stationConfig.searchHistory],
    );

    return (
        <Stack gap="xs">
            <Group>
                <UserLocation
                    ref={userLocationRef}
                    onLocationFound={({ latitude, longitude }) =>
                        setCoords({ latitude, longitude })
                    }
                />
                <Autocomplete
                    style={{ flex: 1 }}
                    ref={inputRef}
                    value={input}
                    size="lg"
                    placeholder={t("label.search-placeholder")}
                    rightSection={
                        <ActionIcon
                            loading={loading}
                            size="lg"
                            color={primaryColor}
                            variant="transparent"
                            onClick={() => onSearchLocations(true)}
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
                        handleSelectLocation(
                            location.display_name,
                            Number(location.lat),
                            Number(location.lon),
                        );
                    }}
                    onClick={() => inputRef.current?.select()}
                    onKeyDownCapture={(ev) => {
                        if (ev.key !== "Enter") return;
                        return onSearchLocations(true);
                    }}
                />
                <Box visibleFrom="md">
                    <StationFilterButton />
                </Box>
                <Box visibleFrom="md">
                    <CarConfigurationButton />
                </Box>
            </Group>

            {stationConfig.saveSearchHistory &&
                stationConfig.searchHistory?.length > 0 && (
                    <Pill.Group>
                        {stationConfig.searchHistory.map((item) => (
                            <Pill
                                key={item.input}
                                withRemoveButton
                                onRemove={() =>
                                    handleRemoveHistoryItem(item.input)
                                }
                                onClick={() =>
                                    handleSelectLocation(
                                        item.input,
                                        item.latitude,
                                        item.longitude,
                                    )
                                }
                                style={{ cursor: "pointer" }}
                                bg="var(--mantine-color-gray-light)"
                            >
                                {item.input.split(",")[0]}
                            </Pill>
                        ))}
                    </Pill.Group>
                )}
        </Stack>
    );
};

export default memo(LocationSearch);
