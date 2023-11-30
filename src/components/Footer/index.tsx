import { Group } from "@mantine/core";
import classes from "./index.module.css";
import { FC, useMemo } from "react";
import links from "@/components/Footer/links";
import Link from "./Link";
import InstallPWAButton from "@/components/InstallPWAButton";

const Footer: FC = () => {
    const linkList = useMemo(
        () =>
            links.map((l) => (
                <Link
                    key={l.label}
                    {...l}
                />
            )),
        [],
    );
    return (
        <footer className={classes.footer}>
            <Group className={classes.links}>
                {linkList}
                <InstallPWAButton />
            </Group>
        </footer>
    );
};

export default Footer;
