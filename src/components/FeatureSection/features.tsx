import { rem, Text, ThemeIcon } from "@mantine/core";
import { IconCar, IconCurrentLocation, IconFilter } from "@tabler/icons-react";
import { FeatureSectionCardProps } from "@/components/FeatureSection/Card";

const iconStyle = { width: rem(18), height: rem(18) };

const features: FeatureSectionCardProps[] = [
    {
        title: "Dein Standort",
        content: (
            <Text size="sm">
                Suche nach einer bestimmten Adresse oder nutze deinen aktuellen
                Standort. <br />
                Bei der direkten Adresssuche werden deine Daten an OpenStreetMap
                (Nominatim) weitergegeben.
            </Text>
        ),
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
        title: "Wonach suchst du?",
        content: (
            <Text size="sm">
                Du kannst die Suche ebenfalls einschränken, um nur bestimmte
                Kraftstoffsorten innerhalb eines Gebietes anzuzeigen. <br />
                Die Berechnung der Gesamtpreises ist nur in der
                Einzelkraftstoffsuche verfügbar.
            </Text>
        ),
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
        title: "Dein Auto",
        content: (
            <Text size="sm">
                Konfiguriere für die Rentabilitätsrechnung einer Tankfahrt dein
                Auto. Dazu werden lediglich Verbrauch und dein Tankvolumen
                benötigt.
            </Text>
        ),
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
