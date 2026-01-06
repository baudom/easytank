import { FC, memo } from "react";
import { Box, Text } from "@mantine/core";
import { PriceType } from "@/model/tankerkoenig";
import { mapPrice } from "@/helper/mappings";

type PriceSectionProps = {
    label: string;
    value: PriceType;
};

const PriceSection: FC<PriceSectionProps> = ({ label, value }) => (
    <Box ta="center">
        <Text
            size="xs"
            c="dimmed"
            style={{ textTransform: "uppercase" }}
            fw="bold"
        >
            {label}
        </Text>
        <Text
            size="lg"
            fw="bolder"
        >
            {value ? mapPrice(value) : "-"}
        </Text>
    </Box>
);
export default memo(PriceSection);
