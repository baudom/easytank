import { FC } from "react";
import { IconCar } from "@tabler/icons-react";
import { ActionIcon, Tooltip, rem } from "@mantine/core";
import { useCarConfiguration } from "@/context/CarConfigurationContext";
import { useTranslate } from "@tolgee/react";

const CarConfigurationButton: FC = () => {
    const { showModal } = useCarConfiguration();
    const { t } = useTranslate();

    return (
        <Tooltip label={t("label.configure-car")}>
            <ActionIcon
                size="xl"
                variant="gradient"
                onClick={showModal}
            >
                <IconCar
                    style={{ width: rem(18), height: rem(18) }}
                    stroke={1.5}
                />
            </ActionIcon>
        </Tooltip>
    );
};

export default CarConfigurationButton;
