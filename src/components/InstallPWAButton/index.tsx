"use client";

import { FC, useEffect, useRef, useState } from "react";
import { Anchor } from "@mantine/core";

type BeforeInstallPromptEvent = Event & {
    prompt?: () => void;
};

const InstallPWAButton: FC = () => {
    const [supportsPwa, setSupportsPwa] = useState(false);
    const pwaPromptRef = useRef<BeforeInstallPromptEvent | null>(null);

    useEffect(() => {
        const handler = (e: BeforeInstallPromptEvent) => {
            e.preventDefault();
            setSupportsPwa(true);
            pwaPromptRef.current = e;
        };

        window.addEventListener("beforeinstallprompt", handler);
        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);

    return supportsPwa ? (
        <Anchor<"a">
            c="dimmed"
            size="xs"
            onClick={() => pwaPromptRef.current?.prompt?.()}
        >
            App installieren
        </Anchor>
    ) : null;
};

export default InstallPWAButton;