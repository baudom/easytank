import { FC, memo } from "react";
import { Box, Text } from "@mantine/core";

type PriceSectionProps = {
    label: string;
    value: number;
};

const PriceSection: FC<PriceSectionProps> = ({ label, value }) => (
    <Box>
        <Text size="sm">{label}</Text>
        <Text size="xl">
            {Intl.NumberFormat("de-DE", {
                currency: "EUR",
                style: "currency",
                maximumFractionDigits: 3,
            }).format(value)}
        </Text>
    </Box>
);
export default memo(PriceSection);
