import { FC, memo, ReactNode } from "react";
import { Card, Text } from "@mantine/core";

export type FeatureSectionCardProps = {
    icon: ReactNode;
    title: string;
    content: ReactNode;
};

const FeatureSectionCard: FC<FeatureSectionCardProps> = ({
    icon,
    title,
    content,
}) => {
    return (
        <Card
            shadow="md"
            padding="xl"
        >
            {icon}
            <Text
                size="lg"
                fw="bold"
                mt="md"
            >
                {title}
            </Text>
            {content}
        </Card>
    );
};

export default memo(FeatureSectionCard);
