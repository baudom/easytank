import { FC, memo } from "react";
import { Box, Text } from "@mantine/core";
import { PriceType } from "@/model";

type PriceSectionProps = {
    label: string;
    value: PriceType;
};

const PriceSection: FC<PriceSectionProps> = ({ label, value }) => (
    <Box>
        <Text fw={400}>{label}</Text>
        <Text>
            {typeof value === "boolean"
                ? "n. v."
                : Intl.NumberFormat("de-DE", {
                      currency: "EUR",
                      style: "currency",
                      maximumFractionDigits: 3,
                  }).format(value)}
        </Text>
    </Box>
);
export default memo(PriceSection);
