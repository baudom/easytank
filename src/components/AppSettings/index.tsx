"use client";

import { FC, memo } from "react";
import { Group } from "@mantine/core";
import ColorSchemeToggle from "@/components/ColorSchemeToggle";
import LanguageToggle from "@/components/LanguageToggle";

const AppSettings: FC = () => {
    return (
        <Group gap="xs">
            <ColorSchemeToggle />
            <LanguageToggle />
        </Group>
    );
};

export default memo(AppSettings);
