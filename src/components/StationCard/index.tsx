import { FC, Fragment, memo, useMemo } from "react";
import { Station } from "@/model";
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

type StationCardProps = {
    station: Station;
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
            radius="md"
            pt={0}
            withBorder
        >
            <Group my="xs">
                <Avatar
                    src={getStationThumb(station)}
                    alt={`${station.name} thumbnail`}
                    size="sm"
                >
                    {station.brand.toUpperCase().slice(0, 2)}
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
                    {station.isOpen ? "Geöffnet" : "Geschlossen"}
                </Badge>
            </Group>

            <Text
                className={classes.truncateText}
                mb="xs"
                ta="left"
                size="sm"
            >
                {station.name}
            </Text>

            <Card.Section
                withBorder
                px="md"
                py="xs"
            >
                <Group justify="space-evenly">
                    {priceList.map((e, i, self) => (
                        <Fragment key={e.label}>
                            <PriceSection
                                label={e.label}
                                value={e.value!} // value is either boolean or number here
                            />
                            {i !== self.length - 1 ? (
                                <Divider orientation="vertical" />
                            ) : null}
                        </Fragment>
                    ))}
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