import { FC } from "react";
import { IconSettings } from "@tabler/icons-react";
import { ActionIcon, rem, useMantineTheme } from "@mantine/core";
import { useCarConfiguration } from "@/context/CarConfigurationContext";

const CarConfiguration: FC = () => {
    const { showModal } = useCarConfiguration();
    const { primaryColor } = useMantineTheme();

    return (
        <ActionIcon
            size="lg"
            radius="xl"
            color={primaryColor}
            variant="gradient"
            gradient={{ from: "pink", to: "yellow" }}
            onClick={showModal}
        >
            <IconSettings
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
            />
        </ActionIcon>
    );
};

export default CarConfiguration;
