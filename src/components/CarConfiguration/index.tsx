import { FC } from "react";
import { IconCar } from "@tabler/icons-react";
import { ActionIcon, rem, useMantineTheme } from "@mantine/core";
import { useCarConfiguration } from "@/context/CarConfigurationContext";

const CarConfiguration: FC = () => {
    const { showModal } = useCarConfiguration();
    const { primaryColor } = useMantineTheme();

    return (
        <ActionIcon
            size="lg"
            color={primaryColor}
            variant="gradient"
            onClick={showModal}
        >
            <IconCar
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
            />
        </ActionIcon>
    );
};

export default CarConfiguration;
