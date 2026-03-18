"use client";

import { FC, memo, useCallback } from "react";
import { ActionIcon, Modal, rem, Text, Tooltip } from "@mantine/core";
import { IconFilterDown } from "@tabler/icons-react";
import { useStationsContext } from "@/context/StationsContext";
import { useDisclosure } from "@mantine/hooks";
import { useTranslations } from "next-intl";
import StationFilterForm, {
    StationFilterFormFields,
} from "@/components/StationFilter/Button/Form";
import useTracking from "@/hooks/useTracking";
import { StationFilter } from "@/model";

const StationFilterButton: FC = () => {
    const t = useTranslations();
    const { setStationConfig } = useStationsContext();
    const [showModal, { open, close }] = useDisclosure(false);
    const { trackEvent } = useTracking();

    const onSubmit = useCallback(
        (values: StationFilterFormFields) => {
            const { keepLastSearchTerm, ...rest } = values;
            const config: Partial<StationFilter> = {
                ...rest,
                lastSearchTerm: keepLastSearchTerm ? {} : null,
            };

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
                    size="xl"
                    onClick={onOpenFilter}
                >
                    <IconFilterDown
                        style={{ width: rem(18), height: rem(18) }}
                        stroke={1.5}
                    />
                </ActionIcon>
            </Tooltip>
        </>
    );
};

export default memo(StationFilterButton);
