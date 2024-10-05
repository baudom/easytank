import { TranslationKey } from "@tolgee/react";
import { StationOrderType } from "@/model";

type MenuEntry = {
    label: TranslationKey;
    value: StationOrderType;
};

const menu: MenuEntry[] = [
    {
        label: "label.price",
        value: "price",
    },
    {
        label: "label.total-cost",
        value: "refillPrice",
    },
    {
        label: "label.distance",
        value: "distance",
    },
];

export default menu;
