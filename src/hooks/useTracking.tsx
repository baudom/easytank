"use client";

import { useAptabase } from "@aptabase/react";
import { useCallback } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { LS_ALLOW_TRACKING } from "@/model/constants";

const TRACK_LANGUAGE = "language-selector";
const TRACK_THEME = "theme-selector";

export type TrackEventKey =
    | "page-visit"
    | "detect-position"
    | "manual-search"
    | "configure-car"
    | "install-pwa";

const useTracking = () => {
    const client = useAptabase();
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
            key: TrackEventKey | typeof TRACK_LANGUAGE | typeof TRACK_THEME,
            props?: Parameters<typeof client.trackEvent>[1],
        ) => {
            if (!allowTracking) return;
            void client.trackEvent(key, props);
        },
        [allowTracking, client],
    );

    const trackEvent = useCallback(
        (key: TrackEventKey) => {
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
