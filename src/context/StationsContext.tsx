import {
    createContext,
    FC,
    memo,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { CalculatedStation, Coords, StationFilter } from "@/model";
import {
    PARAM_FUEL_TYPE,
    PARAM_LATITUDE,
    PARAM_LONGITUDE,
    PARAM_RADIUS,
    Station,
    StationsResponse,
} from "@/model/tankerkoenig";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconCurrentLocationOff } from "@tabler/icons-react";
import { rem } from "@mantine/core";
import { useCarConfiguration } from "@/context/CarConfigurationContext";

const DEFAULT_STATION_CONFIG: StationFilter = {
    radius: 10,
    type: "diesel",
};

type ContextType = {
    loading: boolean;
    coords?: Coords;
    stations: CalculatedStation[];
    stationConfig: StationFilter;
    setCoords: (coords: Coords) => void;
    setStationConfig: (config: Partial<StationFilter>) => void;
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
    setStationConfig: (config: Partial<StationFilter>) => {},
});

const iconStyle = { width: rem(18), height: rem(18) };

const StationsContext: FC<StationsContextProps> = ({ children }) => {
    const [loading, { open, close }] = useDisclosure(false);
    const [coords, setCoords] = useState<Coords | undefined>(undefined);
    const [stations, setStations] = useState<CalculatedStation[]>([]);
    const { carConfig } = useCarConfiguration();
    const [stationConfig, setStationConfig] = useState<StationFilter>(
        DEFAULT_STATION_CONFIG,
    );

    const setStationConfigOverwrite = useCallback(
        (config: Partial<StationFilter>) => {
            setStationConfig((prev) => ({ ...prev, ...config }));
        },
        [],
    );

    const calculateStationEfficiency = useCallback(
        (station: Station): CalculatedStation => {
            if (
                !carConfig ||
                carConfig.averageConsumption100Km === undefined ||
                carConfig.refillVolume === undefined ||
                carConfig.inclusiveReturnTravel === undefined
            ) {
                return station;
            }

            const fuelPerKm = Number(carConfig.averageConsumption100Km) / 100;
            const fuelConsumptionDistance = fuelPerKm * station.dist;
            const totalLiter =
                Number(carConfig.refillVolume) +
                fuelConsumptionDistance *
                    (carConfig.inclusiveReturnTravel ? 2 : 1);

            return {
                ...station,
                refillPrice:
                    station.price !== undefined
                        ? Number((totalLiter * station.price).toFixed(2))
                        : undefined,
            };
        },
        [carConfig],
    );

    const onFetchStations = useCallback(
        async (coords: Coords, config: StationFilter) => {
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
                setStations(
                    res && res.stations.length
                        ? res.stations.map(calculateStationEfficiency)
                        : [],
                );

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
        [calculateStationEfficiency, close, open],
    );

    useEffect(() => {
        if (!coords) return;
        onFetchStations(coords, stationConfig);
    }, [coords, onFetchStations, stationConfig]);

    useEffect(() => {
        setStations((prev) => prev.map(calculateStationEfficiency));
    }, [calculateStationEfficiency, carConfig]);

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

export default memo(StationsContext);
