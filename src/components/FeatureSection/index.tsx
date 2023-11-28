import { Badge, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import { FC } from "react";
import FeatureSectionCard from "@/components/FeatureSection/Card";
import features from "@/components/FeatureSection/features";

const FeatureSection: FC = () => {
    return (
        <Stack my="lg">
            <Group justify="center">
                <Badge
                    variant="light"
                    size="lg"
                >
                    Wie es funktioniert
                </Badge>
            </Group>

            <Text
                c="dimmed"
                ta="center"
            >
                Erfahre innerhalb weniger Sekunden, welche Tankstelle in deiner
                Nähe die <b>eigentlich</b> Günstigste ist.
            </Text>

            <SimpleGrid
                cols={{ base: 1, md: 3, sm: 3 }}
                spacing="xl"
            >
                {features.map((m) => (
                    <FeatureSectionCard
                        key={m.title}
                        {...m}
                    />
                ))}
            </SimpleGrid>
        </Stack>
    );
};

export default FeatureSection;
