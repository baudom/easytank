import { FC, memo } from "react";
import { useForm } from "@mantine/form";
import { CarConfiguration } from "@/model";
import { Button, Checkbox, NumberInput, Stack } from "@mantine/core";
import { useStationsContext } from "@/context/StationsContext";

type CarConfigurationFormProps = {
    onSubmit: (value: CarConfiguration) => void;
};

const assertPositiveValue = (value: number) =>
    value <= 0 ? "Wert muss über 0 sein!" : null;

const CarConfigurationForm: FC<CarConfigurationFormProps> = ({ onSubmit }) => {
    const { carConfig } = useStationsContext();
    const form = useForm<CarConfiguration>({
        initialValues: carConfig,
        validateInputOnChange: true,
        validate: {
            averageConsumption100Km: assertPositiveValue,
            totalTankVolume: assertPositiveValue,
            neededTankVolume: assertPositiveValue,
        },
    });

    return (
        <form onSubmit={form.onSubmit((v) => onSubmit(v))}>
            <Stack>
                <NumberInput
                    label="Verbrauch pro 100km"
                    placeholder="5,8"
                    decimalScale={2}
                    allowedDecimalSeparators={[",", "."]}
                    withAsterisk
                    min={0.01}
                    {...form.getInputProps("averageConsumption100Km")}
                />
                <NumberInput
                    label="Tankvolumen Gesamt"
                    placeholder="45"
                    decimalScale={2}
                    allowedDecimalSeparators={[",", "."]}
                    withAsterisk
                    min={0.01}
                    {...form.getInputProps("totalTankVolume")}
                />
                <NumberInput
                    label="Benötigtes Tankvolumen"
                    placeholder="20"
                    decimalScale={2}
                    allowedDecimalSeparators={[",", "."]}
                    withAsterisk
                    min={0.01}
                    {...form.getInputProps("neededTankVolume")}
                />
                <Checkbox
                    label="Hin -und Rückfahrt berechnen"
                    {...form.getInputProps("inclusiveReturnTravel", {
                        type: "checkbox",
                    })}
                />
                <Button type="submit">Speichern</Button>
            </Stack>
        </form>
    );
};

export default memo(CarConfigurationForm);
