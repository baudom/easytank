"use client";

import { ChangeEvent, FC, useCallback } from "react";
import { Switch } from "@mantine/core";
import { useTranslate } from "@tolgee/react";
import { useStationsContext } from "@/context/StationsContext";

const OpenClosedSwitch: FC = () => {
    const { stationConfig, setStationConfig } = useStationsContext();
    const { t } = useTranslate();

    const onChange = useCallback(
        (ev: ChangeEvent<HTMLInputElement>) => {
            setStationConfig({ onlyOpen: ev.currentTarget.checked });
        },
        [setStationConfig],
    );

    return (
        <Switch
            style={{ display: "flex", alignItems: "center" }}
            checked={stationConfig.onlyOpen}
            onChange={onChange}
            label={t("label.only-open-stations")}
            size="md"
        />
    );
};

export default OpenClosedSwitch;
