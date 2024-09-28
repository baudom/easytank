"use client";

import { useCallback } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { LS_ALLOW_TRACKING } from "@/model/constants";

const TRACK_LANGUAGE = "language-selector";
const TRACK_THEME = "theme-selector";

export type TrackEventKey =
    | "detect-position"
    | "manual-search"
    | "configure-car"
    | "install-pwa";

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
        (
            key?: TrackEventKey | typeof TRACK_LANGUAGE | typeof TRACK_THEME,
            props?: object,
        ) => {
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

    return {
        trackEvent,
        trackLanguageSelect,
        trackThemeChange,
        allowTracking,
        setAllowTracking,
    };
};

export default useTracking;
