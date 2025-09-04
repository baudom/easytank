import { FC, memo } from "react";
import { Box, Text } from "@mantine/core";
import { PriceType } from "@/model/tankerkoenig";
import { mapPrice } from "@/helper/mappings";

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
            {value ? mapPrice(value) : "n. V."}
        </Text>
    </Box>
);
export default memo(PriceSection);
