"use client";

import { FC, memo, useCallback } from "react";
import { ActionIcon, Modal, rem, Text, Tooltip } from "@mantine/core";
import { IconSettingsSearch } from "@tabler/icons-react";
import { useStationsContext } from "@/context/StationsContext";
import { useDisclosure } from "@mantine/hooks";
import { useTranslations } from "next-intl";
import { StationFilter } from "@/model";
import StationFilterForm, {
    StationFilterFormFields,
} from "@/components/StationFilter/Button/Form";
import useTracking from "@/hooks/useTracking";

type StationFilterButtonProps = {
    size?: string | number;
};

const StationFilterButton: FC<StationFilterButtonProps> = ({ size = "xl" }) => {
    const t = useTranslations();
    const { setStationConfig } = useStationsContext();
    const [showModal, { open, close }] = useDisclosure(false);
    const { trackEvent } = useTracking();

    const onSubmit = useCallback(
        (values: StationFilterFormFields) => {
            const config: Partial<StationFilter> = { ...values };
            if (!values.saveSearchHistory) {
                config.searchHistory = [];
            }
            setStationConfig(config);
            close();
        },
        [close, setStationConfig],
    );

    const onOpenFilter = useCallback(() => {
        open();
        trackEvent("apply-filter-or-sort");
    }, [open, trackEvent]);

    return (
        <>
            <Modal
                opened={showModal}
                onClose={close}
                title={<Text size="xl">{t("label.search-settings")}</Text>}
            >
                <StationFilterForm
                    onSubmit={onSubmit}
                    onCancel={close}
                />
            </Modal>
            <Tooltip label={t("label.search-settings")}>
                <ActionIcon
                    size={size}
                    onClick={onOpenFilter}
                >
                    <IconSettingsSearch
                        style={{ width: rem(18), height: rem(18) }}
                        stroke={1.5}
                    />
                </ActionIcon>
            </Tooltip>
        </>
    );
};

export default memo(StationFilterButton);
