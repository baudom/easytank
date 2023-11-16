import { FC, memo } from "react";
import { LinkType } from "@/components/Footer/links";
import { Anchor } from "@mantine/core";

const Link: FC<LinkType> = ({ label, link }) => (
    <Anchor<"a">
        c="dimmed"
        href={link}
        target="_blank"
        size="xs"
    >
        {label}
    </Anchor>
);

export default memo(Link);
