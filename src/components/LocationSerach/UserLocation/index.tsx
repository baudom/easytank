import { FC, memo, useCallback, useState } from "react";
import {
    IconCheck,
    IconCurrentLocation,
    IconCurrentLocationOff,
} from "@tabler/icons-react";
import { ActionIcon, rem, useMantineTheme } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import getUserPosition from "@/helper/position";
import { useTranslate } from "@tolgee/react";

const iconStyle = { width: rem(18), height: rem(18) };

type UserLocationProps = {
    onLocationFound: (coords: GeolocationCoordinates) => void;
};

const UserLocation: FC<UserLocationProps> = ({ onLocationFound }) => {
    const { primaryColor } = useMantineTheme();
    const [loading, setLoading] = useState(false);
    const { t } = useTranslate();

    const onLocationRequest = useCallback(async () => {
        if (navigator.geolocation) {
            setLoading(true);

            const notificationId = notifications.show({
                loading: true,
                title: t("notification.lookup-location-in-progress"),
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
                    title: t("notification.location-determined"),
                    message: t("notification.coordinates-detail", {
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                    }),
                    icon: <IconCheck style={iconStyle} />,
                    loading: false,
                    autoClose: 4000,
                    withCloseButton: true,
                });
            } catch (e: any | PositionErrorCallback) {
                // https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError/code
                let message = t("notification.unknown-error");
                if (e instanceof GeolocationPositionError) {
                    switch (e.code) {
                        case e.PERMISSION_DENIED:
                            message = t(
                                "notification.location-permission-denied",
                            );
                            break;
                        case e.POSITION_UNAVAILABLE:
                            message = t("notification.location-unavailable");
                            break;
                    }
                }

                notifications.update({
                    id: notificationId,
                    color: "red",
                    title: t("notification.determine-location-failed"),
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
                title: t("notification.location-unavailable"),
                message: undefined,
                withCloseButton: true,
            });
        }
    }, [onLocationFound, t]);

    return (
        <>
            <ActionIcon
                size="md"
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
