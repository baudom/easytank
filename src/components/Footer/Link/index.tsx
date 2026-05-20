"use client";

import React, { FC, memo } from "react";
import { LinkType } from "@/components/Footer/links";
import { Anchor } from "@mantine/core";
import { ACTION_RELEASE_NOTES } from "@/model/constants";

const Link: FC<LinkType> = ({ label, link, action }) => {
    const handleClick = (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    ) => {
        if (action === ACTION_RELEASE_NOTES) {
            e.preventDefault();
            window.dispatchEvent(new CustomEvent("openReleaseNotes"));
        }
    };

    return (
        <Anchor<"a">
            c="dimmed"
            href={link}
            target={action === ACTION_RELEASE_NOTES ? undefined : "_blank"}
            size="xs"
            onClick={handleClick}
        >
            {label}
        </Anchor>
    );
};

export default memo(Link);
