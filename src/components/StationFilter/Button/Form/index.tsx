import { FC, memo, useMemo } from "react";
import { useForm } from "@mantine/form";
import { StationFilter } from "@/model";
import { useStationsContext } from "@/context/StationsContext";
import {
    Button,
    Checkbox,
    Group,
    MultiSelect,
    SegmentedControl,
    Stack,
    Text,
} from "@mantine/core";
import { T, useTranslate } from "@tolgee/react";
import menu from "@/components/StationFilter/Button/Form/menu";
import { sortByStringAsc } from "@/helper/sortings";

export type StationFilterFormFields = Pick<
    StationFilter,
    "onlyRydSupported" | "onlyAvailable" | "onlyOpen" | "order" | "brands"
>;

type StationFilterFormProps = {
    onSubmit: (values: StationFilterFormFields) => void;
    onCancel: () => void;
};

const StationFilterForm: FC<StationFilterFormProps> = (props) => {
    const { t } = useTranslate();
    const { stationConfig, stations } = useStationsContext();
    const form = useForm<StationFilterFormFields>({
        initialValues: {
            onlyAvailable: stationConfig.onlyAvailable,
            onlyRydSupported: stationConfig.onlyRydSupported,
            onlyOpen: stationConfig.onlyOpen,
            order: stationConfig.order,
            brands: stationConfig.brands,
        },
        validateInputOnChange: true,
    });

    const brands = useMemo(
        () =>
            Array.from(new Set(stations?.map((s) => s.brand))).sort(
                sortByStringAsc,
            ),
        [stations],
    );

    return (
        <form onSubmit={form.onSubmit((v) => props.onSubmit(v))}>
            <Stack mb="sm">
                <Text>
                    <T keyName="text.sorting-order-ascending" />
                </Text>
                <SegmentedControl
                    withItemsBorders={false}
                    data={menu.map((e) => ({ ...e, label: t(e.label) }))}
                    {...form.getInputProps("order", { type: "input" })}
                />
            </Stack>

            <Stack>
                <Text>
                    <T keyName="label.filter" />
                </Text>
                <Checkbox
                    label={t("label.only-open-stations")}
                    {...form.getInputProps("onlyOpen", { type: "checkbox" })}
                />
                <Checkbox
                    label={t("label.only-available")}
                    {...form.getInputProps("onlyAvailable", {
                        type: "checkbox",
                    })}
                />
                <Checkbox
                    label={t("label.only-ryd-supported-stations")}
                    {...form.getInputProps("onlyRydSupported", {
                        type: "checkbox",
                    })}
                />
                <MultiSelect
                    data={brands.map((e) => ({
                        label: e || "n. V.",
                        value: e,
                    }))}
                    placeholder={t("label.select-n-stations")}
                    nothingFoundMessage={t("label.no-station-found")}
                    clearable
                    {...form.getInputProps("brands", { type: "input" })}
                />
                <Group justify="space-between">
                    <Button
                        variant="transparent"
                        color="red"
                        onClick={props.onCancel}
                    >
                        <T keyName="action.cancel" />
                    </Button>
                    <Button type="submit">
                        <T keyName="action.save" />
                    </Button>
                </Group>
            </Stack>
        </form>
    );
};

export default memo(StationFilterForm);
