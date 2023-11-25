import { FC, memo } from "react";
import { Box, Button, Group, rem, Text, useMantineTheme } from "@mantine/core";
import { IconReceipt2 } from "@tabler/icons-react";
import { CalculatedStation } from "@/model";

type EfficiencySectionProps = Pick<CalculatedStation, "refillPrice">;

const EfficiencySection: FC<EfficiencySectionProps> = ({ refillPrice }) => {
    const { colors } = useMantineTheme();

    return (
        <Box>
            <Group
                gap="sm"
                justify="center"
            >
                <IconReceipt2
                    style={{
                        width: rem(18),
                        height: rem(18),
                        color: colors.pink[7],
                    }}
                    stroke={1.5}
                />
                <Text
                    variant="gradient"
                    gradient={{
                        from: "pink",
                        to: "yellow",
                    }}
                    fw={400}
                >
                    Gesamtkosten
                </Text>
            </Group>
            {refillPrice !== undefined ? (
                <Text
                    variant="gradient"
                    gradient={{
                        from: "pink",
                        to: "yellow",
                    }}
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
                >
                    {/* TODO: Open settings modal */}
                    Auto konfigurieren
                </Button>
            )}
        </Box>
    );
};

export default memo(EfficiencySection);
