"use client";

import { FC, useEffect, useState } from "react";
import { Anchor } from "@mantine/core";
import { T } from "@tolgee/react";

type BeforeInstallPromptEvent = Event & {
    prompt?: () => void;
};

// useRef won't work, due translation change value is thrown away
// and 'beforeinstallprompt' won't be triggered again.
let pwaPromptRef: BeforeInstallPromptEvent | null = null;

const InstallPWAButton: FC = () => {
    const [supportsPwa, setSupportsPwa] = useState(false);

    useEffect(() => {
        const handler = (e: BeforeInstallPromptEvent) => {
            setSupportsPwa(true);
            pwaPromptRef = e;
        };

        window.addEventListener("beforeinstallprompt", handler);
        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);

    return supportsPwa || pwaPromptRef ? (
        <Anchor<"a">
            variant="gradient"
            fw="bold"
            size="xs"
            onClick={() => pwaPromptRef?.prompt?.()}
        >
            <T keyName="action.install-app" />
        </Anchor>
    ) : null;
};

export default InstallPWAButton;
