import {
    createContext,
    FC,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { Coords, Station, StationsResponse } from "@/model";
import { PARAM_LATITUDE, PARAM_LONGITUDE } from "@/model/tankerkoenig";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconCurrentLocationOff } from "@tabler/icons-react";
import { rem } from "@mantine/core";

type ContextType = {
    loading: boolean;
    coords?: Coords;
    stations: Station[];
    setCoords: (coords: Coords) => void;
};

type StationsContextProps = {
    children: ReactNode;
};

const Context = createContext<ContextType>({
    loading: false,
    coords: undefined,
    stations: [],
    setCoords: () => {},
});

const iconStyle = { width: rem(18), height: rem(18) };

const StationsContext: FC<StationsContextProps> = ({ children }) => {
    const [coords, setCoords] = useState<Coords | undefined>(undefined);
    const [stations, setStations] = useState<Station[]>([]);
    const [loading, { open, close }] = useDisclosure(false);

    const handleFetch = useCallback(
        async (coords: Coords) => {
            const params = new URLSearchParams();
            params.append(PARAM_LATITUDE, `${coords.latitude}`);
            params.append(PARAM_LONGITUDE, `${coords.longitude}`);
            // TODO: Append other params
            // params.append(PARAM_RADIUS, "");
            // params.append(PARAM_FUEL_TYPE, "");

            open();
            const notificationId = notifications.show({
                loading: true,
                title: "Tankstellen werden gesucht...",
                message: undefined,
                autoClose: false,
                withCloseButton: false,
            });

            try {
                const response = await fetch(`/api/stations?${params}`, {});
                const res: StationsResponse = await response.json();
                setStations(res && res.stations.length ? res.stations : []);

                notifications.update({
                    id: notificationId,
                    color: "green",
                    title: "Suche erfolgreich.",
                    message: `Es wurden ${res.stations.length} Tankstellen gefunden!`,
                    icon: <IconCheck style={iconStyle} />,
                    loading: false,
                    autoClose: 4000,
                    withCloseButton: true,
                });
            } catch (e) {
                console.error(e);
                notifications.update({
                    id: notificationId,
                    color: "red",
                    title: "Suche fehlgeschlagen.",
                    message: "Bitte versuche es erneut!",
                    icon: <IconCurrentLocationOff style={iconStyle} />,
                    loading: false,
                    autoClose: 4000,
                    withCloseButton: true,
                });
            } finally {
                close();
            }
        },
        [close, open],
    );

    useEffect(() => {
        if (!coords) return;
        handleFetch(coords);
    }, [coords, handleFetch]);

    return (
        <Context.Provider value={{ loading, coords, stations, setCoords }}>
            {children}
        </Context.Provider>
    );
};

export const useStationsContext = () => useContext<ContextType>(Context);

export default StationsContext;
