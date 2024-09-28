"use client";

import { FC, memo, useCallback, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import useTracking from "@/hooks/useTracking";
import { T, useTranslate } from "@tolgee/react";
import { Anchor, Modal, Switch, Text } from "@mantine/core";

const TrackingConfiguration: FC = () => {
    const { t } = useTranslate();
    const { trackEvent, allowTracking, setAllowTracking } = useTracking();
    const [showModal, { open, close }] = useDisclosure(
        typeof allowTracking !== "boolean",
    );

    useEffect(() => {
        trackEvent();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClose = useCallback(() => {
        close();
        setAllowTracking(!!allowTracking);
        if (!!allowTracking) {
            location.reload();
        }
    }, [allowTracking, close, setAllowTracking]);

    return (
        <>
            <Modal
                title={
                    <Text size="xl">
                        <T keyName="label.manage-tracking" />
                    </Text>
                }
                opened={showModal}
                onClose={onClose}
            >
                <Switch
                    style={{ display: "flex", alignItems: "center" }}
                    checked={allowTracking}
                    onChange={(v) => setAllowTracking(v.target.checked)}
                    label={t("label.allow-anonymous-tracking")}
                    size="md"
                    mb="sm"
                />
                <Text
                    size="sm"
                    component="span"
                >
                    <T
                        keyName="text.tracking-note"
                        params={{
                            b: <b />,
                            br: <br />,
                            ul: <ul />,
                            li: <li />,
                        }}
                    />
                </Text>
            </Modal>
            <Anchor<"a">
                c="dimmed"
                size="xs"
                onClick={open}
            >
                <T keyName="label.manage-tracking" />
            </Anchor>
        </>
    );
};

export default memo(TrackingConfiguration);
