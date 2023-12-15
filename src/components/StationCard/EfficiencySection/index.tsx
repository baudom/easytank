import { FC, memo } from "react";
import { Box, Button, Group, rem, Text, useMantineTheme } from "@mantine/core";
import { IconReceipt2 } from "@tabler/icons-react";
import { CalculatedStation } from "@/model";
import { useCarConfiguration } from "@/context/CarConfigurationContext";
import { T } from "@tolgee/react";

type EfficiencySectionProps = Pick<CalculatedStation, "refillPrice">;

const EfficiencySection: FC<EfficiencySectionProps> = ({ refillPrice }) => {
    const { showModal } = useCarConfiguration();
    const { colors } = useMantineTheme();

    return (
        <Box ta="center">
            <Group gap="xs">
                <IconReceipt2
                    style={{
                        width: rem(18),
                        height: rem(18),
                        color: colors.pink[7],
                    }}
                    stroke={1.5}
                />
                <Text variant="gradient">
                    <T keyName="label.total-cost" />
                </Text>
            </Group>
            {refillPrice !== undefined ? (
                <Text
                    variant="gradient"
                    size="lg"
                    fw="bold"
                >
                    {Intl.NumberFormat("de-DE", {
                        currency: "EUR",
                        style: "currency",
                        maximumFractionDigits: 3,
                    }).format(refillPrice)}
                </Text>
            ) : (
                <Button
                    variant="light"
                    size="xs"
                    onClick={showModal}
                >
                    <T keyName="label.configure-car" />
                </Button>
            )}
        </Box>
    );
};

export default memo(EfficiencySection);
