import { FC, Fragment, memo, useMemo } from "react";
import { CalculatedStation } from "@/model";
import {
    ActionIcon,
    Anchor,
    Avatar,
    Badge,
    Card,
    Divider,
    Group,
    rem,
    Text,
    useMantineTheme,
} from "@mantine/core";
import { createGoogleMapsLink, getStationThumb } from "@/helper/station";
import classes from "./index.module.css";
import PriceSection from "@/components/StationCard/PriceSection";
import { IconMapSearch } from "@tabler/icons-react";
import { mapFuelTypeToString } from "@/helper/mappings";
import EfficiencySection from "@/components/StationCard/EfficiencySection";
import { T } from "@tolgee/react";
import { RYD_COLOR_KEY } from "@/model/constants";

type StationCardProps = {
    station: CalculatedStation;
};

const StationCard: FC<StationCardProps> = ({ station }) => {
    const { primaryColor } = useMantineTheme();

    const priceList = useMemo(
        () =>
            [
                { label: mapFuelTypeToString("diesel"), value: station.diesel },
                { label: mapFuelTypeToString("e5"), value: station.e5 },
                { label: mapFuelTypeToString("e10"), value: station.e10 },
            ].filter((e) => e.value !== undefined),
        [station.diesel, station.e10, station.e5],
    );

    return (
        <Card
            shadow="sm"
            pt={0}
            withBorder
        >
            <Group my="xs">
                <Avatar
                    src={getStationThumb(station)}
                    alt={`${station.name} thumbnail`}
                    size="sm"
                >
                    {(station.brand || station.name).toUpperCase().slice(0, 2)}
                </Avatar>
                <Text
                    className={classes.truncateText}
                    style={{
                        flex: 2,
                        textAlign: "start",
                    }}
                    fw="bold"
                >
                    {station.brand || station.name.split(" ")[0]}
                </Text>
                <Badge
                    color={station.isOpen ? "green" : "red"}
                    variant="light"
                >
                    <T
                        keyName={station.isOpen ? "label.open" : "label.closed"}
                    />
                </Badge>
                {station.isRydSupportedBrand ? (
                    <Badge
                        color={RYD_COLOR_KEY}
                        variant="light"
                    >
                        Ryd
                    </Badge>
                ) : null}
            </Group>

            <Text
                className={classes.truncateText}
                mb="xs"
                ta="left"
                size="sm"
            >
                {station.name} &#x2022; {station.dist}km
            </Text>

            <Card.Section
                withBorder
                px="md"
                py="xs"
            >
                <Group justify="space-evenly">
                    {priceList.map((price, index, self) => (
                        <Fragment key={price.label}>
                            <PriceSection
                                label={price.label}
                                value={price.value}
                            />
                            {index !== self.length - 1 ? (
                                <Divider orientation="vertical" />
                            ) : null}
                        </Fragment>
                    ))}
                    {priceList.length === 1 ? (
                        <>
                            <Divider orientation="vertical" />
                            <EfficiencySection
                                refillPrice={station.refillPrice}
                            />
                        </>
                    ) : null}
                </Group>
            </Card.Section>

            <Card.Section inheritPadding>
                <Anchor
                    href={createGoogleMapsLink(station)}
                    target="_blank"
                >
                    <Group>
                        <ActionIcon
                            size="md"
                            color={primaryColor}
                            variant="transparent"
                        >
                            <IconMapSearch
                                style={{
                                    width: rem(16),
                                    height: rem(16),
                                }}
                                stroke={1.5}
                            />
                        </ActionIcon>
                        <Text
                            style={{ flex: 1 }}
                            className={classes.truncateText}
                            ta="left"
                            size="xs"
                        >
                            {`${station.street} ${station.houseNumber}, ${station.postCode} ${station.place}`}
                        </Text>
                    </Group>
                </Anchor>
            </Card.Section>
        </Card>
    );
};

export default memo(StationCard);
