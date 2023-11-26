"use client";

import { ActionIcon, Box, rem, useMantineColorScheme } from "@mantine/core";
import { FC } from "react";
import { IconMoon, IconSun } from "@tabler/icons-react";

const iconStyle = { width: rem(18), height: rem(18) };

const ColorSchemeToggle: FC = () => {
    const { toggleColorScheme } = useMantineColorScheme();

    return (
        <ActionIcon
            onClick={toggleColorScheme}
            style={{
                cursor: "pointer",
                position: "absolute",
                top: "2vw",
                right: "2vw",
            }}
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
