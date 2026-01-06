import { Card, Group, Skeleton, Stack } from "@mantine/core";
import { FC } from "react";

const StationCardSkeleton: FC = () => {
    return (
        <Card
            withBorder
            padding="lg"
            radius="lg"
        >
            <Group mb="xs">
                <Skeleton
                    height={38}
                    circle
                />
                <Skeleton
                    height={20}
                    width="40%"
                    radius="xl"
                />
                <Skeleton
                    height={20}
                    width="20%"
                    radius="xl"
                    ml="auto"
                />
            </Group>

            <Skeleton
                height={15}
                width="70%"
                radius="xl"
                mb="md"
            />

            <Card.Section
                withBorder
                px="md"
                py="sm"
            >
                <Group justify="space-evenly">
                    <Stack
                        align="center"
                        gap={4}
                    >
                        <Skeleton
                            height={12}
                            width={40}
                        />
                        <Skeleton
                            height={20}
                            width={60}
                        />
                    </Stack>
                    <Stack
                        align="center"
                        gap={4}
                    >
                        <Skeleton
                            height={12}
                            width={40}
                        />
                        <Skeleton
                            height={20}
                            width={60}
                        />
                    </Stack>
                    <Stack
                        align="center"
                        gap={4}
                    >
                        <Skeleton
                            height={12}
                            width={40}
                        />
                        <Skeleton
                            height={20}
                            width={60}
                        />
                    </Stack>
                </Group>
            </Card.Section>

            <Card.Section inheritPadding>
                <Group
                    py="xs"
                    gap="xs"
                >
                    <Skeleton
                        height={16}
                        width={16}
                        circle
                    />
                    <Skeleton
                        height={12}
                        width="80%"
                        radius="xl"
                    />
                </Group>
            </Card.Section>
        </Card>
    );
};

export default StationCardSkeleton;
