import { FC, Fragment, memo, useMemo } from "react";
import { CalculatedStation, fuelTypesWithTranslations } from "@/model";
import {
    ActionIcon,
    Anchor,
    Avatar,
    Badge,
    Button,
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
import { IconExternalLink, IconMapSearch } from "@tabler/icons-react";
import EfficiencySection from "@/components/StationCard/EfficiencySection";
import { useTranslations } from "next-intl";
import { RYD_COLOR_KEY } from "@/model/constants";
import Link from "next/link";

type StationCardProps = {
    station: CalculatedStation;
};

const StationCard: FC<StationCardProps> = ({ station }) => {
    const t = useTranslations();
    const { primaryColor } = useMantineTheme();

    const priceList = useMemo(
        () =>
            [
                {
                    translationKey: fuelTypesWithTranslations.get("diesel"),
                    value: station.diesel,
                },
                {
                    translationKey: fuelTypesWithTranslations.get("e5"),
                    value: station.e5,
                },
                {
                    translationKey: fuelTypesWithTranslations.get("e10"),
                    value: station.e10,
                },
            ].filter((e) => e.value !== undefined),
        [station.diesel, station.e10, station.e5],
    );

    const rydBadgeComponent = useMemo(() => {
        const baseProps = {
            color: RYD_COLOR_KEY,
            variant: "light",
            children: "ryd",
        };
        return process.env.NEXT_PUBLIC_RYD_LINK ? (
            <Button
                {...baseProps}
                variant="light"
                size="compact-xs"
                component={Link}
                href={process.env.NEXT_PUBLIC_RYD_LINK}
                target="_blank"
                rel="noopener noreferrer"
                rightSection={<IconExternalLink size={10} />}
            />
        ) : (
            <Badge {...baseProps} />
        );
    }, []);

    return (
        <Card
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
                    {t(station.isOpen ? "label.open" : "label.closed")}
                </Badge>
                {station.isRydSupportedBrand ? rydBadgeComponent : null}
            </Group>

            <Text
                className={classes.truncateText}
                mb="xs"
                ta="left"
                size="sm"
                c="dimmed"
            >
                {station.dist}km &middot;&nbsp;
                {station.name}
            </Text>

            <Card.Section
                withBorder
                px="md"
                py="xs"
            >
                <Group justify="space-evenly">
                    {priceList.map((price, index, self) => (
                        <Fragment key={price.translationKey}>
                            <PriceSection
                                label={t(price.translationKey)}
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
                            <EfficiencySection {...station} />
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
