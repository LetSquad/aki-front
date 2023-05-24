import { useFormikContext } from "formik";
import get from "lodash.get";

import { getPriceTypeTitleFromEnum } from "@coreUtils/utils";
import { WithSuspense } from "@coreUtils/WithSuspense";
import { FormFieldType } from "@models/forms/enums";
import { DropdownOption, FormFieldProps } from "@models/forms/types";
import { PlacePriceFieldsName, PriceType } from "@models/places/enums";
import { PlaceAddFormValues, PlacePrice } from "@models/places/types";
import baseFormFieldsStyles from "@parts/EditForm/styles/BaseFormFields.module.scss";
import FormField from "@parts/FormField/FormField";
import FormFieldPlaceholder from "@parts/FormField/Placeholders/FormFieldPlaceholder";

const PriceTypeOptions: DropdownOption[] = Object.values(PriceType).map((priceType) => ({
    value: priceType,
    text: getPriceTypeTitleFromEnum(priceType)
}));

export const PriceFields: (groupName: string) => FormFieldProps[] = (groupName) => [
    {
        name: `${groupName}.${PlacePriceFieldsName.PRICE_TYPE}`,
        options: PriceTypeOptions,
        label: "Тип стоимости",
        required: true,
        type: FormFieldType.DROPDOWN,
        placeholder: "Выберите тип стоимости"
    }, {
        name: `${groupName}.${PlacePriceFieldsName.PRICE}`,
        label: "Стоимость",
        type: FormFieldType.INPUT,
        inputType: "number",
        min: 0,
        step: 100,
        labelPosition: "right",
        inputLabel: "₽",
        placeholder: "5000"
    }
];

interface PriceFormFieldsProps {
    groupName: string;
}

export default function PriceFormFields({ groupName }: PriceFormFieldsProps) {
    const { values } = useFormikContext<PlaceAddFormValues>();

    const { priceType } = get(values, groupName) as PlacePrice;

    const key = groupName.replaceAll("[", ".").replaceAll("].", ".");

    return (
        <>
            <WithSuspense
                key={PriceFields(groupName)[0].name}
                loader={<FormFieldPlaceholder />}
            >
                <FormField
                    {...PriceFields(key)[0]}
                    className={baseFormFieldsStyles.field}
                />
            </WithSuspense>
            {priceType !== PriceType.FREE && (
                <WithSuspense
                    key={PriceFields(groupName)[1].name}
                    loader={<FormFieldPlaceholder />}
                >
                    <FormField
                        {...PriceFields(key)[1]}
                        className={baseFormFieldsStyles.field}
                    />
                </WithSuspense>
            )}
        </>
    );
}
