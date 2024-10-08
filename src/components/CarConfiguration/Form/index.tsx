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
import { T, useTranslate } from "@tolgee/react";

type CarConfigurationFormProps = {
    onSubmit: (value: CarConfiguration) => void;
};

const assertPositiveValue = (value: number | undefined) =>
    value !== undefined && value > 0 ? null : "Wert muss über 0 sein!";

const CarConfigurationForm: FC<CarConfigurationFormProps> = ({ onSubmit }) => {
    const { carConfig, resetCarConfig, hideModal } = useCarConfiguration();
    const { t } = useTranslate();
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
                <Text size="xs">
                    <T keyName="text.calculation-availability" />
                </Text>
            </Group>
            <Stack>
                <NumberInput
                    label={t("label.average-fuel-consumption")}
                    placeholder="5,8"
                    decimalScale={2}
                    allowedDecimalSeparators={[",", "."]}
                    withAsterisk
                    min={0.01}
                    {...form.getInputProps("averageConsumption100Km")}
                />
                <NumberInput
                    label={t("label.refill-quantity")}
                    placeholder="20"
                    decimalScale={2}
                    allowedDecimalSeparators={[",", "."]}
                    withAsterisk
                    min={0.01}
                    {...form.getInputProps("refillVolume")}
                />
                <Checkbox
                    label={t("label.calculate-return-travel")}
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
                        <T keyName="action.reset" />
                    </Button>
                    <Button type="submit">
                        <T keyName="action.save" />
                    </Button>
                </Group>
            </Stack>
        </form>
    );
};

export default memo(CarConfigurationForm);
