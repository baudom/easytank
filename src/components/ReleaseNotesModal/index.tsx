"use client";

import { FC, memo, useCallback, useEffect, useState } from "react";
import {
    Button,
    Modal,
    ScrollArea,
    TypographyStylesProvider,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { LS_LAST_VISITED_VERSION } from "@/model/constants";
import { useTranslations } from "next-intl";
import ReactMarkdown from "react-markdown";

const ReleaseNotesModal: FC = () => {
    const t = useTranslations();
    const currentVersion = process.env.NEXT_PUBLIC_VERSION;

    const [lastVisitedVersion, setLastVisitedVersion] = useLocalStorage<
        string | undefined
    >({
        key: LS_LAST_VISITED_VERSION,
        getInitialValueInEffect: false,
    });

    const [opened, setOpened] = useState(false);
    const [content, setContent] = useState<string>("");

    const fetchLatestRelease = useCallback(async () => {
        try {
            const response = await fetch("/api/releases/latest");

            if (response.ok) {
                const data = await response.json();
                setContent(data.body || "");
                setOpened(true);
            }
        } catch (error) {
            console.error("Failed to fetch release notes", error);
        }
    }, []);

    useEffect(() => {
        if (lastVisitedVersion !== currentVersion) {
            const timeout = setTimeout(() => {
                void fetchLatestRelease();
            }, 0);
            return () => clearTimeout(timeout);
        }
    }, [lastVisitedVersion, currentVersion, fetchLatestRelease]);

    const handleClose = useCallback(() => {
        setLastVisitedVersion(currentVersion);
        setOpened(false);
    }, [currentVersion, setLastVisitedVersion]);

    return (
        <Modal
            opened={opened}
            onClose={handleClose}
            title={t("label.whats-new")}
            size="lg"
            scrollAreaComponent={ScrollArea.Autosize}
        >
            <TypographyStylesProvider>
                <ReactMarkdown>{content}</ReactMarkdown>
            </TypographyStylesProvider>
            <Button
                fullWidth
                onClick={handleClose}
                mt="xl"
            >
                {t("action.ok")}
            </Button>
        </Modal>
    );
};

export default memo(ReleaseNotesModal);
