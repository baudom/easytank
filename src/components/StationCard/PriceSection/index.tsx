import { FC, memo } from "react";
import { Box, Text } from "@mantine/core";
import { PriceType } from "@/model/tankerkoenig";

type PriceSectionProps = {
    label: string;
    value: PriceType;
};

const PriceSection: FC<PriceSectionProps> = ({ label, value }) => (
    <Box>
        <Text size="sm">{label}</Text>
        <Text
            size="lg"
            fw="bold"
        >
            {value
                ? Intl.NumberFormat("de-DE", {
                      currency: "EUR",
                      style: "currency",
                      maximumFractionDigits: 3,
                  }).format(value)
                : "n. V."}
        </Text>
    </Box>
);
export default memo(PriceSection);
