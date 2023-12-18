"use client";

import { FC, useCallback } from "react";
import { ActionIcon, Menu, rem } from "@mantine/core";
import { IconSortAscendingLetters } from "@tabler/icons-react";
import { T } from "@tolgee/react";
import menu from "./menu";
import { StationOrderType } from "@/model";
import { useStationsContext } from "@/context/StationsContext";

const StationSortButton: FC = () => {
    const { setStationConfig, stationConfig } = useStationsContext();

    const onOrderChange = useCallback(
        (type: StationOrderType) => {
            setStationConfig({ order: type });
        },
        [setStationConfig],
    );

    return (
        <Menu
            shadow="md"
            width={300}
        >
            <Menu.Target>
                <ActionIcon size="lg">
                    <IconSortAscendingLetters
                        style={{ width: rem(18), height: rem(18) }}
                        stroke={1.5}
                    />
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>
                    <T keyName="text.sorting-order-ascending" />
                </Menu.Label>
                {menu.map((e) => (
                    <Menu.Item
                        key={e.key}
                        leftSection={e.icon}
                        onClick={() => onOrderChange(e.type)}
                        disabled={stationConfig.order === e.type}
                    >
                        <T keyName={e.key} />
                    </Menu.Item>
                ))}
            </Menu.Dropdown>
        </Menu>
    );
};

export default StationSortButton;
