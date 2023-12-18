import { FC } from "react";
import { IconCar } from "@tabler/icons-react";
import { ActionIcon, rem } from "@mantine/core";
import { useCarConfiguration } from "@/context/CarConfigurationContext";

const CarConfiguration: FC = () => {
    const { showModal } = useCarConfiguration();

    return (
        <ActionIcon
            size="lg"
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
