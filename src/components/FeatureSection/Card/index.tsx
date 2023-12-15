import { FC, memo, ReactNode } from "react";
import { Card, Text } from "@mantine/core";
import { T, TranslationKey } from "@tolgee/react";

export type FeatureSectionCardProps = {
    icon: ReactNode;
    titleKey: TranslationKey;
    contentKey: TranslationKey;
};

const FeatureSectionCard: FC<FeatureSectionCardProps> = ({
    icon,
    titleKey,
    contentKey,
}) => {
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
                <T keyName={titleKey} />
            </Text>
            <Text size="sm">
                <T
                    keyName={contentKey}
                    params={{ br: <br /> }}
                />
            </Text>
        </Card>
    );
};

export default memo(FeatureSectionCard);
