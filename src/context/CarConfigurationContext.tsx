"use client";

import { CarConfiguration } from "@/model";
import { createContext, FC, memo, ReactNode, useContext } from "react";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import { Modal, Text } from "@mantine/core";
import CarConfigurationForm from "@/components/CarConfiguration/Form";
import { LS_CAR_CONFIGURATION_KEY } from "@/model/constants";

type CarConfigurationContextProps = {
    children: ReactNode;
};

const DEFAULT_CAR_CONFIGURATION: CarConfiguration = {
    inclusiveReturnTravel: false,
};

type ContextType = {
    carConfig: CarConfiguration;
    setCarConfig: (config: CarConfiguration) => void;
    resetCarConfig: () => void;
    showModal: () => void;
    hideModal: () => void;
};

const Context = createContext<ContextType>({
    carConfig: DEFAULT_CAR_CONFIGURATION,
    setCarConfig: (config: CarConfiguration) => {},
    resetCarConfig: () => {},
    showModal: () => {},
    hideModal: () => {},
});

const CarConfigurationContext: FC<CarConfigurationContextProps> = ({
    children,
}) => {
    const [carConfig, setCarConfig, resetCarConfig] = useLocalStorage({
        key: LS_CAR_CONFIGURATION_KEY,
        defaultValue: DEFAULT_CAR_CONFIGURATION,
    });
    const [configModalShown, { open, close }] = useDisclosure(false);

    return (
        <Context.Provider
            value={{
                carConfig,
                setCarConfig,
                resetCarConfig,
                showModal: open,
                hideModal: close,
            }}
        >
            <Modal
                opened={configModalShown}
                onClose={close}
                title={<Text size="xl">Auto konfigurieren</Text>}
            >
                <CarConfigurationForm
                    onSubmit={(v) => {
                        setCarConfig(v);
                        close();
                    }}
                />
            </Modal>
            {children}
        </Context.Provider>
    );
};

export const useCarConfiguration = () => useContext<ContextType>(Context);

export default memo(CarConfigurationContext);
