import { FC } from "react";
import { Stack } from "@mantine/core";
import ColorSchemeToggle from "@/components/ColorSchemeToggle";
import LanguageToggle from "@/components/LanguageToggle";

const AppSettings: FC = () => {
    return (
        <Stack style={{ position: "absolute", top: "2vw", right: "2vw" }}>
            <ColorSchemeToggle />
            <LanguageToggle />
        </Stack>
    );
};

export default AppSettings;
