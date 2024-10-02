"use client";

import "./index.css";
import { FC, useCallback, useMemo } from "react";
import { MultiSelect } from "@mantine/core";
import { useTranslate } from "@tolgee/react";
import { useStationsContext } from "@/context/StationsContext";

const FILTER_ONLY_OPEN = "ONLY_OPEN_STATIONS";
const FILTER_ONLY_AVAILABLE = "ONLY_AVAILABLE";

const OpenClosedSwitch: FC = () => {
    const { stationConfig, setStationConfig } = useStationsContext();
    const { t } = useTranslate();

    const filters = useMemo(() => {
        const results: string[] = [];
        if (stationConfig.onlyAvailable) {
            results.push(FILTER_ONLY_AVAILABLE);
        }
        if (stationConfig.onlyOpen) {
            results.push(FILTER_ONLY_OPEN);
        }

        return results;
    }, [stationConfig.onlyAvailable, stationConfig.onlyOpen]);

    const onSelectionChange = useCallback(
        (values: string[]) => {
            setStationConfig({
                onlyOpen: values.includes(FILTER_ONLY_OPEN),
                onlyAvailable: values.includes(FILTER_ONLY_AVAILABLE),
            });
        },
        [setStationConfig],
    );

    return (
        <MultiSelect
            size="lg"
            data={[
                {
                    label: t("label.only-open-stations"),
                    value: FILTER_ONLY_OPEN,
                },
                {
                    label: t("label.only-available"),
                    value: FILTER_ONLY_AVAILABLE,
                },
            ]}
            onChange={onSelectionChange}
            value={filters}
            placeholder={t("label.more-filters")}
            clearable
        />
    );
};

export default OpenClosedSwitch;
