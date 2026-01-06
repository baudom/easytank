import { FC, memo } from "react";
import { Box, Button, Group, rem, Text, useMantineTheme } from "@mantine/core";
import { IconReceipt2 } from "@tabler/icons-react";
import { CalculatedStation } from "@/model";
import { useCarConfiguration } from "@/context/CarConfigurationContext";
import { useTranslations } from "next-intl";
import { mapPrice } from "@/helper/mappings";
import RydSection from "@/components/StationCard/RydSection";

type EfficiencySectionProps = CalculatedStation;

const EfficiencySection: FC<EfficiencySectionProps> = ({
    refillPrice,
    isRydSupportedBrand,
}) => {
    const t = useTranslations();
    const { showModal } = useCarConfiguration();
    const { colors } = useMantineTheme();

    return (
        <Box style={{ justifyItems: "center" }}>
            <Group gap="xs">
                <IconReceipt2
                    style={{
                        width: rem(18),
                        height: rem(18),
                        color: colors.pink[7],
                    }}
                    stroke={1.5}
                />
                <Text variant="gradient">{t("label.total-cost")}</Text>
            </Group>
            {refillPrice !== undefined ? (
                <Group justify="center">
                    {isRydSupportedBrand ? (
                        <RydSection refillPrice={refillPrice} />
                    ) : null}
                    <Text
                        variant="gradient"
                        size="lg"
                        fw="bold"
                    >
                        {mapPrice(refillPrice)}
                    </Text>
                </Group>
            ) : (
                <Button
                    variant="light"
                    size="xs"
                    onClick={showModal}
                >
                    {t("label.configure-car")}
                </Button>
            )}
        </Box>
    );
};

export default memo(EfficiencySection);
