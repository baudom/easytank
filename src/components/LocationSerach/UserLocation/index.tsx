import { FC, memo, useCallback, useState } from "react";
import {
    IconCheck,
    IconCurrentLocation,
    IconCurrentLocationOff,
} from "@tabler/icons-react";
import { ActionIcon, rem, useMantineTheme } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import getUserPosition from "@/helper/position";

const iconStyle = { width: rem(18), height: rem(18) };

type UserLocationProps = {
    onLocationFound: (coords: GeolocationCoordinates) => void;
};

const UserLocation: FC<UserLocationProps> = ({ onLocationFound }) => {
    const { primaryColor } = useMantineTheme();
    const [loading, setLoading] = useState(false);

    const onLocationRequest = useCallback(async () => {
        if (navigator.geolocation) {
            setLoading(true);

            const notificationId = notifications.show({
                loading: true,
                title: "Standort wird ermittelt...",
                message: undefined,
                autoClose: false,
                withCloseButton: false,
            });

            try {
                const { coords } = await getUserPosition();
                onLocationFound(coords);

                notifications.update({
                    id: notificationId,
                    color: "green",
                    title: "Standort wurde ermittelt!",
                    message: `Koordinaten: ${coords.latitude}, ${coords.longitude}`,
                    icon: <IconCheck style={iconStyle} />,
                    loading: false,
                    autoClose: 4000,
                    withCloseButton: true,
                });
            } catch (e: any | PositionErrorCallback) {
                // https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError/code
                let message = "Unbekannter Fehler.";
                if (e instanceof GeolocationPositionError) {
                    switch (e.code) {
                        case e.PERMISSION_DENIED:
                            message = "Berechtigung wurde nicht gewährt.";
                            break;
                        case e.POSITION_UNAVAILABLE:
                            message = "Standort aktuell nicht verfügbar.";
                            break;
                    }
                }

                notifications.update({
                    id: notificationId,
                    color: "red",
                    title: "Standort konnte nicht ermittelt werden!",
                    message: message,
                    icon: <IconCurrentLocationOff style={iconStyle} />,
                    loading: false,
                    autoClose: 4000,
                    withCloseButton: true,
                });
            } finally {
                setLoading(false);
            }
        } else {
            notifications.show({
                color: "red",
                icon: <IconCurrentLocationOff style={iconStyle} />,
                title: "Standort nicht verfügbar!",
                message: "Dein aktueller Standort ist nicht verfügbar.",
                withCloseButton: true,
            });
        }
    }, [onLocationFound]);

    return (
        <>
            <ActionIcon
                size={32}
                radius="xl"
                loading={loading}
                color={primaryColor}
                variant="transparent"
                onClick={onLocationRequest}
            >
                <IconCurrentLocation
                    style={iconStyle}
                    stroke={1.5}
                />
            </ActionIcon>
        </>
    );
};

export default memo(UserLocation);
