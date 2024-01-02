import { IconCoinEuro, IconRoute } from "@tabler/icons-react";
import { TranslationKey } from "@tolgee/react";
import { ReactElement } from "react";
import { StationOrderType } from "@/model";

type MenuType = {
    key: TranslationKey;
    icon: ReactElement;
    type: StationOrderType;
};

const menu: MenuType[] = [
    {
        key: "label.price",
        icon: <IconCoinEuro />,
        type: "price",
    },
    {
        key: "label.total-cost",
        icon: <IconCoinEuro />,
        type: "refillPrice",
    },
    {
        key: "label.distance",
        icon: <IconRoute />,
        type: "distance",
    },
];

export default menu;
