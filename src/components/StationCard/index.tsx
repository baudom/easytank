import { FC, Fragment, memo, useCallback, useMemo } from "react";
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
    Text,
    Tooltip,
    useMantineTheme,
} from "@mantine/core";
import { createGoogleMapsLink, getStationBrandColor } from "@/helper/station";
import classes from "./index.module.css";
import PriceSection from "@/components/StationCard/PriceSection";
import {
    IconCheck,
    IconCopy,
    IconExternalLink,
    IconMapSearch,
    IconShare,
} from "@tabler/icons-react";
import EfficiencySection from "@/components/StationCard/EfficiencySection";
import { useTranslations } from "next-intl";
import { RYD_COLOR_KEY } from "@/model/constants";
import Link from "next/link";
import { useClipboard } from "@mantine/hooks";
import { useStationsContext } from "@/context/StationsContext";

type StationCardProps = {
    station: CalculatedStation;
};

const StationCard: FC<StationCardProps> = ({ station }) => {
    const t = useTranslations();
    const { primaryColor } = useMantineTheme();
    const { stationConfig } = useStationsContext();
    const clipboard = useClipboard({ timeout: 2000 });

    const stationInfoText = useMemo(() => {
        const address = `${station.street} ${station.houseNumber}, ${station.postCode} ${station.place}`;
        const brand = station.brand || station.name;

        const details: string[] = [];

        if (stationConfig.type !== "all") {
            const price =
                station[stationConfig.type as keyof CalculatedStation];
            if (typeof price === "number") {
                details.push(`${t(`fuel.${stationConfig.type}`)}: ${price}€`);
            }
        } else {
            if (typeof station.diesel === "number")
                details.push(`${t("fuel.diesel")}: ${station.diesel}€`);
            if (typeof station.e5 === "number")
                details.push(`${t("fuel.e5")}: ${station.e5}€`);
            if (typeof station.e10 === "number")
                details.push(`${t("fuel.e10")}: ${station.e10}€`);
        }

        if (typeof station.refillPrice === "number") {
            details.push(`${t("label.total-cost")}: ${station.refillPrice}€`);
        }

        const detailsStr = details.length > 0 ? `${details.join(" | ")}\n` : "";

        return `${brand}\n${detailsStr}${address}`;
    }, [station, stationConfig.type, t]);

    const handleShare = useCallback(async () => {
        if (typeof navigator !== "undefined" && !!navigator.share) {
            try {
                await navigator.share({
                    title: station.brand || station.name,
                    text: stationInfoText,
                    url: createGoogleMapsLink(station),
                });
            } catch (e) {
                if ((e as Error).name !== "AbortError") {
                    console.error("Sharing failed", e);
                }
            }
        }
    }, [station, stationInfoText]);

    const priceList = useMemo(
        () =>
            [
                {
                    translationKey: fuelTypesWithTranslations.get("diesel")!,
                    value: station.diesel,
                },
                {
                    translationKey: fuelTypesWithTranslations.get("e5")!,
                    value: station.e5,
                },
                {
                    translationKey: fuelTypesWithTranslations.get("e10")!,
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
                    size="sm"
                    color={getStationBrandColor(station.brand || station.name)}
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
                <Group
                    wrap="nowrap"
                    gap="xs"
                >
                    <Anchor
                        href={createGoogleMapsLink(station)}
                        target="_blank"
                        style={{ flex: 1, minWidth: 0 }}
                        c="dimmed"
                    >
                        <Group
                            gap="xs"
                            wrap="nowrap"
                        >
                            <ActionIcon
                                size="md"
                                color={primaryColor}
                                variant="transparent"
                            >
                                <IconMapSearch
                                    size={16}
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

                    <Group
                        gap={0}
                        wrap="nowrap"
                    >
                        <Tooltip label={t("action.copy-info")}>
                            <ActionIcon
                                size="md"
                                variant="subtle"
                                color={clipboard.copied ? "green" : "dimmed"}
                                onClick={() => clipboard.copy(stationInfoText)}
                            >
                                {clipboard.copied ? (
                                    <IconCheck size={16} />
                                ) : (
                                    <IconCopy size={16} />
                                )}
                            </ActionIcon>
                        </Tooltip>
                        {typeof navigator !== "undefined" &&
                            !!navigator.share && (
                                <Tooltip label={t("action.share")}>
                                    <ActionIcon
                                        size="md"
                                        variant="subtle"
                                        color="dimmed"
                                        onClick={handleShare}
                                    >
                                        <IconShare size={16} />
                                    </ActionIcon>
                                </Tooltip>
                            )}
                    </Group>
                </Group>
            </Card.Section>
        </Card>
    );
};

export default memo(StationCard);
