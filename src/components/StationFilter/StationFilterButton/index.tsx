"use client";

import { FC, memo, useCallback } from "react";
import { ActionIcon, Modal, rem, Text } from "@mantine/core";
import { IconFilterDown } from "@tabler/icons-react";
import { useStationsContext } from "@/context/StationsContext";
import { useDisclosure } from "@mantine/hooks";
import { T } from "@tolgee/react";
import StationFilterForm, {
    StationFilterFormFields,
} from "@/components/StationFilter/StationFilterButton/Form";
import useTracking from "@/hooks/useTracking";

const StationFilterButton: FC = () => {
    const { setStationConfig } = useStationsContext();
    const [showModal, { open, close }] = useDisclosure(false);
    const { trackEvent } = useTracking();

    const onSubmit = useCallback(
        (values: StationFilterFormFields) => {
            setStationConfig(values);
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
                title={
                    <Text size="xl">
                        <T keyName="label.sort-and-filter" />
                    </Text>
                }
            >
                <StationFilterForm
                    onSubmit={onSubmit}
                    onCancel={close}
                />
            </Modal>
            <ActionIcon
                size="xl"
                onClick={onOpenFilter}
            >
                <IconFilterDown
                    style={{ width: rem(18), height: rem(18) }}
                    stroke={1.5}
                />
            </ActionIcon>
        </>
    );
};

export default memo(StationFilterButton);
