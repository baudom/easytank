import { Group } from "@mantine/core";
import classes from "./index.module.css";
import { FC } from "react";
import links from "./links";
import Link from "./Link";
import InstallPWAButton from "@/components/InstallPWAButton";
import { getTranslate } from "@/tolgee/server";
import TrackingConfiguration from "@/components/TrackingConfiguration";

const Footer: FC = async () => {
    const t = await getTranslate();

    return (
        <footer className={classes.footer}>
            <Group className={classes.links}>
                {links.map((l) => {
                    const label = l.labelKey ? t(l.labelKey) : l.label;
                    return (
                        <Link
                            key={label}
                            {...l}
                            label={label}
                        />
                    );
                })}
                <TrackingConfiguration />
                <InstallPWAButton />
            </Group>
        </footer>
    );
};

export default Footer;
