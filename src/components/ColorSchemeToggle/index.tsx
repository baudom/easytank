"use client";

import {
    ActionIcon,
    Box,
    MantineColorScheme,
    rem,
    useMantineColorScheme,
} from "@mantine/core";
import { FC, useCallback } from "react";
import { IconMoon, IconSun } from "@tabler/icons-react";
import useTracking from "@/hooks/useTracking";

const iconStyle = { width: rem(18), height: rem(18) };

const ColorSchemeToggle: FC = () => {
    const { toggleColorScheme, colorScheme } = useMantineColorScheme();
    const { trackThemeChange } = useTracking();

    const onToggleColorScheme = useCallback(
        (color: MantineColorScheme) => {
            toggleColorScheme();
            const currentIsDark = color === "dark";
            void trackThemeChange(!currentIsDark);
        },
        [toggleColorScheme, trackThemeChange],
    );

    return (
        <ActionIcon
            onClick={() => onToggleColorScheme(colorScheme)}
            style={{ cursor: "pointer" }}
            variant="light"
            size="lg"
        >
            <Box darkHidden>
                <IconSun style={iconStyle} />
            </Box>
            <Box lightHidden>
                <IconMoon style={iconStyle} />
            </Box>
        </ActionIcon>
    );
};

export default ColorSchemeToggle;
