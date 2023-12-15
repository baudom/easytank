import { rem, ThemeIcon } from "@mantine/core";
import { IconCar, IconCurrentLocation, IconFilter } from "@tabler/icons-react";
import { FeatureSectionCardProps } from "@/components/FeatureSection/Card";

const iconStyle = { width: rem(18), height: rem(18) };

const features: FeatureSectionCardProps[] = [
    {
        titleKey: "label.your-location",
        contentKey: "text.location-search",
        icon: (
            <ThemeIcon
                variant="light"
                size="lg"
            >
                <IconCurrentLocation style={iconStyle} />
            </ThemeIcon>
        ),
    },
    {
        titleKey: "label.your-search",
        contentKey: "text.your-filter",
        icon: (
            <ThemeIcon
                variant="light"
                size="lg"
            >
                <IconFilter style={iconStyle} />
            </ThemeIcon>
        ),
    },
    {
        titleKey: "label.your-car",
        contentKey: "text.your-car",
        icon: (
            <ThemeIcon
                variant="gradient"
                size="lg"
            >
                <IconCar style={iconStyle} />
            </ThemeIcon>
        ),
    },
];

export default features;
