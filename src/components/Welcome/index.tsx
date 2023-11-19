import { Text, Title } from "@mantine/core";
import { FC } from "react";
import LocationSearch from "@/components/LocationSerach";

const Welcome: FC = () => {
    return (
        <>
            <Title ta={"center"}>
                <Text
                    inherit
                    variant="gradient"
                    component="span"
                    gradient={{ from: "pink", to: "yellow" }}
                >
                    {process.env.NEXT_PUBLIC_NAME}
                </Text>
                <LocationSearch />
            </Title>
        </>
    );
};

export default Welcome;
