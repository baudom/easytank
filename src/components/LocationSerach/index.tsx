"use client";

import {
    FC,
    memo,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import {
    ActionIcon,
    Autocomplete,
    ComboboxData,
    Group,
    rem,
    useMantineTheme,
    useMatches,
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
import CarConfigurationButton from "@/components/CarConfiguration/Button";
import { useTranslate } from "@tolgee/react";
import StationFilterButton from "@/components/StationFilter/Button";
import { notifications } from "@mantine/notifications";
import { useDebouncedValue, useHotkeys } from "@mantine/hooks";
import { NOTIFICATION_TIMEOUT } from "@/model/constants";
import useTracking from "@/hooks/useTracking";
import { useSearchParams } from "next/navigation";

const iconStyle = { width: rem(18), height: rem(18) };
const DEBOUNCE_TIMEOUT = 500;

const LocationSearch: FC = () => {
    const { primaryColor } = useMantineTheme();
    const { setCoords } = useStationsContext();
    const { t } = useTranslate();
    const { trackEvent } = useTracking();
    const userLocationRef = useRef<HTMLButtonElement>(null);

    const inputRef = useRef<HTMLInputElement>(null);
    const [input, setInput] = useState("");
    const [locations, setLocations] = useState<ComboboxData>();
    const [loading, setLoading] = useState(false);

    const searchParams = useSearchParams();

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
    const isSmallDevice = useMatches({
        base: true,
        md: false,
    });

    const userLocation = useMemo(
        () => (
            <UserLocation
                ref={userLocationRef}
                onLocationFound={({ latitude, longitude }) =>
                    setCoords({ latitude, longitude })
                }
            />
        ),
        [setCoords],
    );

    const onSearchLocations = useCallback(async () => {
        if (!debouncedInput || !debouncedInput.trim()) return;

        void trackEvent("manual-search");
        const params = new URLSearchParams({ [PARAM_SEARCH]: debouncedInput });
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
                autoClose: NOTIFICATION_TIMEOUT,
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
                autoClose: NOTIFICATION_TIMEOUT,
                withCloseButton: true,
            });
        } finally {
            setLoading(false);
        }
    }, [debouncedInput, t, trackEvent]);

    useEffect(() => {
        void onSearchLocations();
    }, [debouncedInput, onSearchLocations]);

    useEffect(() => {
        if (!searchParams.has("search-now")) return;

        userLocationRef?.current?.click?.();
    }, [searchParams]);

    return (
        <Group>
            {!isSmallDevice ? userLocation : null}
            <Autocomplete
                style={{ flex: 1 }}
                autoFocus
                ref={inputRef}
                size="lg"
                placeholder={t("label.search-placeholder")}
                leftSection={isSmallDevice ? userLocation : null}
                rightSection={
                    <ActionIcon
                        loading={loading}
                        size="lg"
                        color={primaryColor}
                        variant="transparent"
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

                    // cancel debounce after setting value to input
                    setTimeout(cancelDebounce, DEBOUNCE_TIMEOUT / 2);
                }}
                onKeyDownCapture={(ev) => {
                    if (ev.key !== "Enter") return;
                    return onSearchLocations();
                }}
            />
            <StationFilterButton />
            <CarConfigurationButton />
        </Group>
    );
};

export default memo(LocationSearch);
