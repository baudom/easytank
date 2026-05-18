"use client";

import { FC, memo, useEffect, useState } from "react";
import {
    ActionIcon,
    Affix,
    Box,
    Burger,
    rem,
    Stack,
    Transition,
} from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { IconArrowUp } from "@tabler/icons-react";
import StationFilterButton from "@/components/StationFilter/Button";
import CarConfigurationButton from "@/components/CarConfiguration/Button";
import UserLocation from "@/components/LocationSerach/UserLocation";
import { useStationsContext } from "@/context/StationsContext";

const iconStyle = { width: rem(24), height: rem(24) };
const FAB_SIZE = rem(64);
const ACTION_SIZE = rem(56);

const ARROW_UP_ICON = <IconArrowUp style={iconStyle} />;

const MobileActions: FC = () => {
    const [scroll, scrollTo] = useWindowScroll();
    const [lastScrollY, setLastScrollY] = useState(0);
    const [visible, setVisible] = useState(true);
    const [fabOpened, setFabOpened] = useState(false);
    const { setCoords } = useStationsContext();

    useEffect(() => {
        // Hide on scroll down, show on scroll up
        if (scroll.y > lastScrollY && scroll.y > 100) {
            setVisible(false);
            setFabOpened(false);
        } else {
            setVisible(true);
        }
        setLastScrollY(scroll.y);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scroll.y]);

    return (
        <Affix
            position={{ bottom: 20, right: 20 }}
            style={{ pointerEvents: "none" }}
        >
            <Box
                hiddenFrom="md"
                style={{
                    position: "relative",
                    width: rem(120),
                    height: FAB_SIZE,
                }}
            >
                <Transition
                    transition="slide-up"
                    mounted={visible}
                >
                    {(transitionStyles) => (
                        <div
                            style={{
                                ...transitionStyles,
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                pointerEvents: "auto",
                            }}
                        >
                            <Transition
                                transition="pop"
                                mounted={fabOpened}
                            >
                                {(popStyles) => (
                                    <Stack
                                        style={popStyles}
                                        gap="xs"
                                        mb="xs"
                                    >
                                        <UserLocation
                                            size={ACTION_SIZE}
                                            onLocationFound={({
                                                latitude,
                                                longitude,
                                            }) =>
                                                setCoords({
                                                    latitude,
                                                    longitude,
                                                })
                                            }
                                        />
                                        <StationFilterButton
                                            size={ACTION_SIZE}
                                        />
                                        <CarConfigurationButton
                                            size={ACTION_SIZE}
                                        />
                                    </Stack>
                                )}
                            </Transition>
                            <ActionIcon
                                size={FAB_SIZE}
                                radius="xl"
                                variant="gradient"
                                onClick={() => setFabOpened((o) => !o)}
                                style={{ pointerEvents: "auto" }}
                            >
                                <Burger
                                    component="div"
                                    opened={fabOpened}
                                    size="sm"
                                    color="white"
                                    lineSize={2}
                                    style={{ alignContent: "center" }}
                                />
                            </ActionIcon>
                        </div>
                    )}
                </Transition>

                <Transition
                    transition="slide-up"
                    mounted={scroll.y > 200 && visible}
                >
                    {(transitionStyles) => (
                        <ActionIcon
                            style={{
                                ...transitionStyles,
                                position: "absolute",
                                bottom: 0,
                                right: rem(64),
                                pointerEvents: "auto",
                                marginRight: "1rem",
                            }}
                            size={ACTION_SIZE}
                            radius="xl"
                            variant="light"
                            onClick={() => scrollTo({ y: 0 })}
                        >
                            {ARROW_UP_ICON}
                        </ActionIcon>
                    )}
                </Transition>
            </Box>

            <Box
                visibleFrom="md"
                style={{
                    position: "relative",
                    width: FAB_SIZE,
                    height: FAB_SIZE,
                }}
            >
                <Transition
                    transition="pop"
                    mounted={scroll.y > 200 && visible}
                >
                    {(transitionStyles) => (
                        <ActionIcon
                            style={{
                                ...transitionStyles,
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                pointerEvents: "auto",
                            }}
                            size="xl"
                            radius="xl"
                            variant="light"
                            onClick={() => scrollTo({ y: 0 })}
                        >
                            {ARROW_UP_ICON}
                        </ActionIcon>
                    )}
                </Transition>
            </Box>
        </Affix>
    );
};

export default memo(MobileActions);
