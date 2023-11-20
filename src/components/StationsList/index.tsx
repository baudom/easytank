import { FC, memo } from "react";
import { useStationsContext } from "@/context/StationsContext";
import { Box, Grid, LoadingOverlay } from "@mantine/core";
import StationCard from "@/components/StationCard";

const StationsList: FC = () => {
    const { stations, loading } = useStationsContext();

    return (
        <Box pos="relative">
            <LoadingOverlay
                visible={loading}
                zIndex={1000}
                overlayProps={{ radius: "sm", blur: 2 }}
            />
            <Grid>
                {stations.map((s) => (
                    <Grid.Col
                        key={s.id}
                        span={{
                            lg: 4,
                            md: 4,
                            sm: 4,
                            base: 12,
                        }}
                    >
                        <StationCard station={s} />
                    </Grid.Col>
                ))}
            </Grid>
        </Box>
    );
};

export default StationsList;
