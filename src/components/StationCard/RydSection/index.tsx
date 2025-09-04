import { FC, memo } from "react";
import { useCarConfiguration } from "@/context/CarConfigurationContext";
import { Text } from "@mantine/core";
import { mapPrice } from "@/helper/mappings";
import { calculateDiscount } from "@/model/ryd";
import { CalculatedStation } from "@/model";
import { RYD_COLOR_KEY } from "@/model/constants";

type RydSectionProps = Required<Pick<CalculatedStation, "refillPrice">>;

const RydSection: FC<RydSectionProps> = ({ refillPrice }) => {
    const {
        carConfig: { rydFuelDiscount, refillVolume },
    } = useCarConfiguration();

    if (
        refillVolume === undefined ||
        rydFuelDiscount === undefined ||
        rydFuelDiscount <= 0
    ) {
        return null;
    }

    const discount = calculateDiscount(refillVolume, rydFuelDiscount);

    return (
        <Text
            variant="text"
            size="xs"
            c={RYD_COLOR_KEY}
        >
            {`${mapPrice(refillPrice + discount)} - ${mapPrice(discount)} =`}
        </Text>
    );
};

export default memo(RydSection);
