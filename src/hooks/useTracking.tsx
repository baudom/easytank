"use client";

import { useAptabase } from "@aptabase/react";
import { FC, useCallback, useEffect } from "react";

const TRACK_LANGUAGE = "language-selector";
const TRACK_THEME = "theme-selector";

export type TrackEventKey =
    | "page-visit"
    | "detect-position"
    | "manual-search"
    | "configure-car"
    | "install-pwa";

const useTracking = () => {
    const { trackEvent: track } = useAptabase();

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

    return { trackEvent, trackLanguageSelect, trackThemeChange };
};

export const InitialTrack: FC = () => {
    const { trackEvent } = useTracking();

    useEffect(() => {
        void trackEvent("page-visit");
    }, [trackEvent]);

    return null;
};

export default useTracking;
