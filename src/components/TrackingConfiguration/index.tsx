"use client";

import { FC, memo, useCallback, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import useTracking from "@/hooks/useTracking";
import { T } from "@tolgee/react";
import { Anchor, Button, Group, Modal, Text } from "@mantine/core";
import { LS_ALLOW_TRACKING_OLD } from "@/model/constants";

const TrackingConfiguration: FC = () => {
    const { trackEvent, allowTracking, setAllowTracking } = useTracking();
    const [showModal, { open, close }] = useDisclosure(
        typeof allowTracking !== "boolean",
    );

    useEffect(() => {
        localStorage.removeItem(LS_ALLOW_TRACKING_OLD); // TODO remove in upcoming changes
        trackEvent();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const changeTrackingAgreement = useCallback(
        (allowed: boolean) => {
            close();
            setAllowTracking(allowed);

            if (!allowed) return;
            location.reload();
        },
        [close, setAllowTracking],
    );

    return (
        <>
            <Modal
                title={
                    <Text size="xl">
                        <T keyName="label.manage-tracking" />
                    </Text>
                }
                opened={showModal}
                onClose={close}
            >
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
                <Group grow>
                    <Button
                        variant="subtle"
                        onClick={() => changeTrackingAgreement(false)}
                    >
                        <T keyName={"label.disallow"} />
                    </Button>
                    <Button
                        variant="gradient"
                        onClick={() => changeTrackingAgreement(true)}
                    >
                        <T keyName={"label.allow"} />
                    </Button>
                </Group>
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
