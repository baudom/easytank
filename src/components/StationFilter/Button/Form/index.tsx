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
import { useTranslations } from "next-intl";
import menu from "@/components/StationFilter/Button/Form/menu";
import { sortByStringAsc } from "@/helper/sortings";

export type StationFilterFormFields = Pick<
    StationFilter,
    | "onlyRydSupported"
    | "onlyAvailable"
    | "onlyOpen"
    | "order"
    | "brands"
    | "appStartAction"
>;

type StationFilterFormProps = {
    onSubmit: (values: StationFilterFormFields) => void;
    onCancel: () => void;
};

const StationFilterForm: FC<StationFilterFormProps> = (props) => {
    const t = useTranslations();
    const { stationConfig, stations } = useStationsContext();
    const form = useForm<StationFilterFormFields>({
        initialValues: {
            onlyAvailable: stationConfig.onlyAvailable,
            onlyRydSupported: stationConfig.onlyRydSupported,
            appStartAction: stationConfig.appStartAction,
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
                <Text>{t("text.sorting-order-ascending")}</Text>
                <SegmentedControl
                    withItemsBorders={false}
                    data={menu.map((e) => ({ ...e, label: t(e.label) }))}
                    {...form.getInputProps("order", { type: "input" })}
                />
            </Stack>

            <Stack mb="sm">
                <Text>{t("label.filter")}</Text>
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
            </Stack>

            <Stack mb="sm">
                <Text>{t("label.app-start-action")}</Text>
                <SegmentedControl
                    withItemsBorders={false}
                    fullWidth
                    data={[
                        {
                            label: t("label.app-start-action-none"),
                            value: "none",
                        },
                        {
                            label: t("label.app-start-action-current-location"),
                            value: "currentLocation",
                        },
                        {
                            label: t("label.app-start-action-last-search-term"),
                            value: "lastSearchTerm",
                        },
                    ]}
                    {...form.getInputProps("appStartAction", { type: "input" })}
                />
            </Stack>

            <Group justify="space-between">
                <Button
                    variant="transparent"
                    color="red"
                    onClick={props.onCancel}
                >
                    {t("action.cancel")}
                </Button>
                <Button type="submit">{t("action.save")}</Button>
            </Group>
        </form>
    );
};

export default memo(StationFilterForm);
