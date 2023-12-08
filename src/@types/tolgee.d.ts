import de from "../../i18n/de.json";

declare module "@tolgee/core/lib/types" {
    type TranslationsType = typeof de;

    // ensures that nested keys are accessible with "."
    type DotNotationEntries<T> = T extends object
        ? {
              [K in keyof T]: `${K & string}${T[K] extends undefined
                  ? ""
                  : T[K] extends object
                    ? `.${DotNotationEntries<T[K]>}`
                    : ""}`;
          }[keyof T]
        : "";

    // enables both intellisense and new keys without an error
    type LiteralUnion<
        LiteralType extends BaseType,
        BaseType extends Primitive,
    > = LiteralType | (BaseType & { _?: never });

    export type TranslationKey = LiteralUnion<
        DotNotationEntries<TranslationsType>,
        string
    >;
}
