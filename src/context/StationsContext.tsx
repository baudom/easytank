"use client";

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
    StationSuccessResponse,
} from "@/model/tankerkoenig";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconCurrentLocationOff } from "@tabler/icons-react";
import { rem } from "@mantine/core";
import { useCarConfiguration } from "@/context/CarConfigurationContext";
import { sortByNumberAsc } from "@/helper/sortings";
import {
    LS_STATION_CONFIGURATION_KEY,
    NOTIFICATION_TIMEOUT,
} from "@/model/constants";
import { useTranslations } from "next-intl";
import { calculateDiscount } from "@/model/ryd";

const DEFAULT_STATION_CONFIG: StationFilter = {
    radius: 10,
    type: "diesel",
    brands: [],
    onlyOpen: true,
    onlyAvailable: true,
    onlyRydSupported: false,
    order: "refillPrice",
    lastSearchTerm: null,
};

type ContextType = {
    loading: boolean;
    coords?: Coords;
    stations?: CalculatedStation[];
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
    stations: undefined,
    stationConfig: DEFAULT_STATION_CONFIG,
    setCoords: () => {},
    setStationConfig: () => {},
});

const iconStyle = { width: rem(18), height: rem(18) };

const StationsContext: FC<StationsContextProps> = ({ children }) => {
    const t = useTranslations();
    const [loading, { open, close }] = useDisclosure(false);
    const [coords, setCoords] = useState<Coords | undefined>(undefined);
    const [stations, setStations] = useState<CalculatedStation[] | undefined>(
        undefined,
    );
    const { carConfig } = useCarConfiguration();
    const [stationConfig, setStationConfig] = useLocalStorage({
        key: LS_STATION_CONFIGURATION_KEY,
        defaultValue: DEFAULT_STATION_CONFIG,
        deserialize: (v) => {
            const parsed = v ? JSON.parse(v) : {};
            return { ...DEFAULT_STATION_CONFIG, ...parsed } as StationFilter;
        },
    });

    const setStationConfigOverwrite = useCallback(
        (config: Partial<StationFilter>) => {
            setStationConfig((prev) => ({ ...prev, ...config }));
        },
        [setStationConfig],
    );

    const calculateStationEfficiency = useCallback(
        (station: Station): CalculatedStation => {
            if (
                !carConfig ||
                carConfig.averageConsumption100Km === undefined ||
                carConfig.refillVolume === undefined ||
                carConfig.inclusiveReturnTravel === undefined
            ) {
                return { ...station, refillPrice: undefined };
            }

            const fuelPerKm = Number(carConfig.averageConsumption100Km) / 100;
            const fuelConsumptionDistance = fuelPerKm * station.dist;
            const totalLiter =
                Number(carConfig.refillVolume) +
                fuelConsumptionDistance *
                    (carConfig.inclusiveReturnTravel ? 2 : 0);

            const rydDiscount =
                station.isRydSupportedBrand && carConfig.rydFuelDiscount
                    ? calculateDiscount(
                          carConfig.refillVolume,
                          carConfig.rydFuelDiscount,
                      )
                    : 0;

            return {
                ...station,
                refillPrice:
                    station.price !== undefined
                        ? Number(
                              (
                                  totalLiter * station.price -
                                  rydDiscount
                              ).toFixed(2),
                          )
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
                title: t("notification.station-search-in-progress"),
                message: undefined,
                autoClose: false,
                withCloseButton: false,
            });

            try {
                const response = await fetch(`/api/stations?${params}`, {});
                if (!response.ok) {
                    const res: Response = await response.json();
                    throw new Error(JSON.stringify(res));
                }

                const res: StationSuccessResponse = await response.json();
                setStations(
                    res && res.stations.length
                        ? res.stations
                              .map(calculateStationEfficiency)
                              .sort((a, b) =>
                                  a.refillPrice && b.refillPrice
                                      ? sortByNumberAsc(
                                            a.refillPrice,
                                            b.refillPrice,
                                        )
                                      : 0,
                              )
                        : [],
                );

                notifications.update({
                    id: notificationId,
                    color: "green",
                    title: t("notification.search-successful"),
                    message: t("text.n-stations-found", {
                        count: res.stations.length,
                    }),
                    icon: <IconCheck style={iconStyle} />,
                    loading: false,
                    autoClose: NOTIFICATION_TIMEOUT,
                    withCloseButton: true,
                });
            } catch (e) {
                console.error(e);
                notifications.update({
                    id: notificationId,
                    color: "red",
                    title: t("notification.search-failed"),
                    message: t("text.please-retry"),
                    icon: <IconCurrentLocationOff style={iconStyle} />,
                    loading: false,
                    autoClose: NOTIFICATION_TIMEOUT,
                    withCloseButton: true,
                });
            } finally {
                close();
            }
        },
        [calculateStationEfficiency, close, open, t],
    );

    useEffect(() => {
        if (!coords) return;
        void onFetchStations(coords, stationConfig);
        // re-render due onFetchStations not needed
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [coords, stationConfig.type, stationConfig.radius]);

    useEffect(() => {
        setStations((prev) =>
            prev
                ? prev
                      .map(calculateStationEfficiency)
                      .sort((a, b) =>
                          a.refillPrice && b.refillPrice
                              ? sortByNumberAsc(a.refillPrice, b.refillPrice)
                              : 0,
                      )
                : undefined,
        );
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
