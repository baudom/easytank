"use client";

import { createTheme } from "@mantine/core";

export const theme = createTheme({
    fontFamily: "var(--font-default)",
    defaultRadius: "lg",
    colors: {
        dark: [
            "#C1C2C5",
            "#A6A7AB",
            "#909296",
            "#5c5f66",
            "#373A40",
            "#2C2E33",
            "#25262b",
            "#1A1B1E",
            "#141517",
            "#101113",
        ],
    },
    defaultGradient: { from: "pink", to: "yellow" },
    /* Put your mantine theme override here */
});
