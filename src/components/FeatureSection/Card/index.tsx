import { FC, memo, ReactNode } from "react";
import { Card, Text } from "@mantine/core";
import { useTranslations } from "next-intl";

export type FeatureSectionCardProps = {
    icon: ReactNode;
    titleKey: string;
    contentKey: string;
};

const FeatureSectionCard: FC<FeatureSectionCardProps> = ({
    icon,
    titleKey,
    contentKey,
}) => {
    const t = useTranslations();
    return (
        <Card
            shadow="sm"
            padding="xl"
        >
            {icon}
            <Text
                size="lg"
                fw="bold"
                mt="md"
            >
                {t(titleKey)}
            </Text>
            <Text size="sm">{t.rich(contentKey, { br: () => <br /> })}</Text>
        </Card>
    );
};

export default memo(FeatureSectionCard);
