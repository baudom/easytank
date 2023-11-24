import { FC, useCallback } from "react";
import { IconSettings } from "@tabler/icons-react";
import { ActionIcon, Modal, rem, Text, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import CarConfigurationForm from "@/components/CarConfiguration/Form";
import { CarConfiguration } from "@/model";
import { useStationsContext } from "@/context/StationsContext";

const CarConfiguration: FC = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const { setCarConfig } = useStationsContext();
    const { primaryColor } = useMantineTheme();

    const onFormSubmit = useCallback(
        (value: CarConfiguration) => {
            setCarConfig(value);
            close();
        },
        [close, setCarConfig],
    );

    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                title={<Text size="xl">Auto konfigurieren</Text>}
            >
                <CarConfigurationForm onSubmit={onFormSubmit} />
            </Modal>
            <ActionIcon
                size="lg"
                radius="xl"
                color={primaryColor}
                variant="gradient"
                gradient={{ from: "pink", to: "yellow" }}
                onClick={open}
            >
                <IconSettings
                    style={{ width: rem(18), height: rem(18) }}
                    stroke={1.5}
                />
            </ActionIcon>
        </>
    );
};

export default CarConfiguration;
