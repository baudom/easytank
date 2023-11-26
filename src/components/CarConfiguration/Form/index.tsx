import { FC, memo } from "react";
import { useForm } from "@mantine/form";
import { CarConfiguration } from "@/model";
import {
    Button,
    Checkbox,
    Group,
    NumberInput,
    rem,
    Stack,
    Text,
} from "@mantine/core";
import { useCarConfiguration } from "@/context/CarConfigurationContext";
import { IconInfoSquareRounded } from "@tabler/icons-react";

type CarConfigurationFormProps = {
    onSubmit: (value: CarConfiguration) => void;
};

const assertPositiveValue = (value: number | undefined) =>
    value !== undefined && value > 0 ? null : "Wert muss über 0 sein!";

const CarConfigurationForm: FC<CarConfigurationFormProps> = ({ onSubmit }) => {
    const { carConfig, resetCarConfig, hideModal } = useCarConfiguration();
    const form = useForm<CarConfiguration>({
        initialValues: carConfig,
        validateInputOnChange: true,
        validate: {
            averageConsumption100Km: assertPositiveValue,
            refillVolume: assertPositiveValue,
        },
    });

    return (
        <form
            onSubmit={form.onSubmit((v) =>
                onSubmit({
                    averageConsumption100Km: Number(v.averageConsumption100Km),
                    refillVolume: Number(v.refillVolume),
                    inclusiveReturnTravel: !!v.inclusiveReturnTravel,
                }),
            )}
        >
            <Group
                mb="sm"
                gap="sm"
            >
                <IconInfoSquareRounded
                    style={{ width: rem(18), height: rem(18) }}
                />
                <Text size="xs">Nur in Einzelspritsuche verfügbar</Text>
            </Group>
            <Stack>
                <NumberInput
                    label="&#8709; Verbrauch in l/100km"
                    placeholder="5,8"
                    decimalScale={2}
                    allowedDecimalSeparators={[",", "."]}
                    withAsterisk
                    min={0.01}
                    {...form.getInputProps("averageConsumption100Km")}
                />
                <NumberInput
                    label="Nachfüllmenge in Liter"
                    placeholder="20"
                    decimalScale={2}
                    allowedDecimalSeparators={[",", "."]}
                    withAsterisk
                    min={0.01}
                    {...form.getInputProps("refillVolume")}
                />
                <Checkbox
                    label="Hin -und Rückfahrt berechnen"
                    {...form.getInputProps("inclusiveReturnTravel", {
                        type: "checkbox",
                    })}
                />
                <Group justify="space-between">
                    <Button
                        variant="transparent"
                        color="red"
                        onClick={() => {
                            resetCarConfig();
                            hideModal();
                        }}
                    >
                        Zurücksetzen
                    </Button>
                    <Button type="submit">Speichern</Button>
                </Group>
            </Stack>
        </form>
    );
};

export default memo(CarConfigurationForm);
