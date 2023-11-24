import {
    createContext,
    FC,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import {
    Coords,
    Station,
    StationConfiguration,
    StationsResponse,
} from "@/model";
import {
    PARAM_FUEL_TYPE,
    PARAM_LATITUDE,
    PARAM_LONGITUDE,
    PARAM_RADIUS,
} from "@/model/tankerkoenig";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconCurrentLocationOff } from "@tabler/icons-react";
import { rem } from "@mantine/core";

const DEFAULT_STATION_CONFIG: StationConfiguration = {
    radius: 10,
    type: "all",
};

type ContextType = {
    loading: boolean;
    coords?: Coords;
    stations: Station[];
    stationConfig: StationConfiguration;
    setCoords: (coords: Coords) => void;
    setStationConfig: (config: Partial<StationConfiguration>) => void;
};

type StationsContextProps = {
    children: ReactNode;
};

const Context = createContext<ContextType>({
    loading: false,
    coords: undefined,
    stations: [],
    stationConfig: DEFAULT_STATION_CONFIG,
    setCoords: () => {},
    setStationConfig: (config: Partial<StationConfiguration>) => {},
});

const iconStyle = { width: rem(18), height: rem(18) };

const StationsContext: FC<StationsContextProps> = ({ children }) => {
    const [coords, setCoords] = useState<Coords | undefined>(undefined);
    const [stations, setStations] = useState<Station[]>([]);
    const [stationConfig, setStationConfig] = useState<StationConfiguration>(
        DEFAULT_STATION_CONFIG,
    );
    const [loading, { open, close }] = useDisclosure(false);

    const onFetchStations = useCallback(
        async (coords: Coords, config: StationConfiguration) => {
            const params = new URLSearchParams();
            params.append(PARAM_LATITUDE, `${coords.latitude}`);
            params.append(PARAM_LONGITUDE, `${coords.longitude}`);
            params.append(PARAM_RADIUS, `${config.radius}`);
            params.append(PARAM_FUEL_TYPE, config.type);

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

    const setStationConfigOverwrite = useCallback(
        (config: Partial<StationConfiguration>) => {
            setStationConfig((prev) => ({ ...prev, ...config }));
        },
        [],
    );

    useEffect(() => {
        if (!coords) return;
        onFetchStations(coords, stationConfig);
    }, [coords, onFetchStations, stationConfig]);

    return (
        <Context.Provider
            value={{
                loading,
                coords,
                stations,
                stationConfig,
                setStationConfig: setStationConfigOverwrite,
                setCoords,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export const useStationsContext = () => useContext<ContextType>(Context);

export default StationsContext;
