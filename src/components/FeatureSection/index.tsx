import { Badge, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import { FC } from "react";
import FeatureSectionCard from "@/components/FeatureSection/Card";
import features from "@/components/FeatureSection/features";
import { T } from "@tolgee/react";

const FeatureSection: FC = () => {
    return (
        <Stack my="lg">
            <Group justify="center">
                <Badge
                    variant="light"
                    size="lg"
                >
                    <T keyName="label.how-it-works" />
                </Badge>
            </Group>

            <Text
                c="dimmed"
                ta="center"
            >
                <T
                    keyName="text.short-explanation"
                    params={{ b: <b /> }}
                />
            </Text>

            <SimpleGrid
                cols={{ base: 1, md: 3, sm: 3 }}
                spacing="xl"
            >
                {features.map((m) => (
                    <FeatureSectionCard
                        key={m.titleKey}
                        {...m}
                    />
                ))}
            </SimpleGrid>
        </Stack>
    );
};

export default FeatureSection;
