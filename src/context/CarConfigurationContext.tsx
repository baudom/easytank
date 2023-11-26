import { CarConfiguration } from "@/model";
import {
    createContext,
    FC,
    memo,
    ReactNode,
    useContext,
    useState,
} from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Text } from "@mantine/core";
import CarConfigurationForm from "@/components/CarConfiguration/Form";

type CarConfigurationContextProps = {
    children: ReactNode;
};

const DEFAULT_CAR_CONFIGURATION: CarConfiguration = {
    inclusiveReturnTravel: false,
};

type ContextType = {
    carConfig: CarConfiguration;
    setCarConfig: (config: CarConfiguration) => void;
    showModal: () => void;
    hideModal: () => void;
};

const Context = createContext<ContextType>({
    carConfig: DEFAULT_CAR_CONFIGURATION,
    setCarConfig: (config: CarConfiguration) => {},
    showModal: () => {},
    hideModal: () => {},
});

const CarConfigurationContext: FC<CarConfigurationContextProps> = ({
    children,
}) => {
    const [configModalShown, { open, close }] = useDisclosure(false);
    const [carConfig, setCarConfig] = useState<CarConfiguration>(
        DEFAULT_CAR_CONFIGURATION,
    );

    return (
        <Context.Provider
            value={{
                carConfig,
                setCarConfig,
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
