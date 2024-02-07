"use client";

import "./index.css";
import { FC, memo, useCallback } from "react";
import { MultiSelect } from "@mantine/core";
import { useTranslate } from "@tolgee/react";
import { useStationsContext } from "@/context/StationsContext";

type StationBrandSelectorProps = {
    brands: string[];
};

const StationBrandSelect: FC<StationBrandSelectorProps> = ({ brands }) => {
    const { stationConfig, setStationConfig } = useStationsContext();
    const { t } = useTranslate();

    const onChange = useCallback(
        (v: string[]) => {
            setStationConfig({ brands: v });
        },
        [setStationConfig],
    );

    return (
        <MultiSelect
            size="lg"
            data={brands.map((e) => ({ label: e, value: e }))}
            value={stationConfig.brands}
            onChange={onChange}
            placeholder={t("label.select-brand")}
            nothingFoundMessage={t("label.no-brand-found")}
            clearable
            searchable
        />
    );
};
export default memo(StationBrandSelect);
