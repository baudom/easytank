"use client";

import { useCallback } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { LS_ALLOW_TRACKING } from "@/model/constants";
import { FuelType, RadiusType } from "@/model";

const TRACK_LANGUAGE = "language-selector";
const TRACK_THEME = "theme-selector";
const TRACK_FUEL_TYPE = "select-fuel-type";
const TRACK_RADIUS = "select-radius";

export type TrackEventKey =
    | "detect-position"
    | "manual-search"
    | "configure-car"
    | "install-pwa"
    | "apply-filter-or-sort";

export type InternalTrackEventKey =
    | TrackEventKey
    | typeof TRACK_LANGUAGE
    | typeof TRACK_THEME
    | typeof TRACK_FUEL_TYPE
    | typeof TRACK_RADIUS;

const useTracking = () => {
    const [allowTracking, setAllowTracking] = useLocalStorage<
        boolean | undefined
    >({
        key: LS_ALLOW_TRACKING,
        defaultValue: undefined,
        deserialize: (v) => v === "true",
        getInitialValueInEffect: false, // prevent setting default value even if value is present
    });

    const track = useCallback(
        (key?: InternalTrackEventKey, props?: object) => {
            if (!allowTracking) return;
            void umami.track(key, props);
        },
        [allowTracking],
    );

    const trackEvent = useCallback(
        (key?: TrackEventKey) => {
            void track(key);
        },
        [track],
    );

    const trackLanguageSelect = useCallback(
        (language: string) => {
            void track(TRACK_LANGUAGE, { language });
        },
        [track],
    );

    const trackThemeChange = useCallback(
        (isDark: boolean) => {
            void track(TRACK_THEME, { isDark });
        },
        [track],
    );

    const trackFuelTypeChange = useCallback(
        (type: FuelType) => {
            void track(TRACK_FUEL_TYPE, { type });
        },
        [track],
    );

    const trackRadiusChange = useCallback(
        (radius: RadiusType) => {
            void track(TRACK_RADIUS, { radius });
        },
        [track],
    );

    return {
        trackEvent,
        trackLanguageSelect,
        trackThemeChange,
        trackFuelTypeChange,
        trackRadiusChange,
        allowTracking,
        setAllowTracking,
    };
};

export default useTracking;
