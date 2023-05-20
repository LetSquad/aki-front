import React from "react";

import { LabelProps } from "semantic-ui-react/dist/commonjs/elements/Label";
import { SemanticCOLORS, SemanticShorthandItem } from "semantic-ui-react/dist/commonjs/generic";

import { FormFieldType, ImageEditorPreviewType } from "./enums";

export interface BaseFieldProps {
    name: string;
    className?: string;
    label?: string;
    placeholder?: string;
    nullAvatar?: string;
    required?: boolean;
    isLoading?: boolean;
    errorText?: string | React.JSX.Element;
    promptError?: boolean;
    basicError?: boolean;
    errorColor?: SemanticCOLORS;
    defaultValue?: string;
}

export interface BaseInputFieldProps extends BaseFieldProps {
    onChange?: (value: string) => void;
    clearable?: boolean;
    inputLabel?: SemanticShorthandItem<LabelProps>;
    labelPosition?: "left" | "right" | "left corner" | "right corner";
}

export interface NumberInputFieldProps extends BaseInputFieldProps {
    inputType: "number";
    max?: number;
    min?: number;
    step?: number;
}

export interface PasswordInputFieldProps extends BaseFieldProps {
    onChange?: (value: string) => void;
    hidden?: boolean;
    withStrength?: boolean;
}

export type InputFieldProps = NumberInputFieldProps | BaseInputFieldProps;

export interface PhoneNumberInputFieldProps extends BaseFieldProps {
    country?: string | number;
    onlyCountries?: string[];
    preferredCountries?: string[];
    excludeCountries?: string[];
}

export interface DropdownOption {
    text: string;
    value: string | number | boolean;
    content?: string | React.JSX.Element;
}

export interface DropdownFieldProps extends BaseFieldProps {
    options: DropdownOption[];
    search?: boolean;
    allowAdditions?: boolean;
    clearable?: boolean;
    multiple?: boolean;
}

export interface DatePickerFieldProps extends BaseFieldProps {
    onChange?: (value: string) => void;
    maxDate?: Date;
    minDate?: Date;
    dateFormat?: string;
}

export interface TimePickerFieldProps extends BaseFieldProps {
    onChange?: (value: string) => void;
    timeCaption?: string;
    timeFormat?: string;
    maxTime?: Date;
    minTime?: Date;
    timeIntervals?: number;
}

export type DateTimePickerFieldProps = BaseFieldProps & DatePickerFieldProps & TimePickerFieldProps & {
    includeTimes?: Date[];
    includeDates?: Date[];
};

export interface ImageEditorFieldProps extends BaseFieldProps {
    width?: number;
    height?: number;
    border?: number | number[];
    isBorderRadiusEnable?: boolean;
    borderColor?: number[];
    previewType?: ImageEditorPreviewType;
}

interface GroupFieldOptionsType {
    value: string;
    displayText: string;
}

export interface ButtonGroupFieldProps extends BaseFieldProps {
    options: GroupFieldOptionsType[];
    fluid?: boolean;
}

export type FormFieldProps =
    (PhoneNumberInputFieldProps & { type: FormFieldType.PHONE_NUMBER_INPUT }) |
    (PasswordInputFieldProps & { type: FormFieldType.PASSWORD_INPUT }) |
    (InputFieldProps & { type: FormFieldType.INPUT }) |
    (BaseFieldProps & { type: FormFieldType.TEXTAREA }) |
    (DropdownFieldProps & { type: FormFieldType.DROPDOWN }) |
    (DatePickerFieldProps & { type: FormFieldType.DATEPICKER }) |
    (TimePickerFieldProps & { type: FormFieldType.TIMEPICKER }) |
    (DateTimePickerFieldProps & { type: FormFieldType.DATE_TIMEPICKER }) |
    (ImageEditorFieldProps & { type: FormFieldType.IMAGE_EDITOR }) |
    (ButtonGroupFieldProps & { type: FormFieldType.BUTTON_GROUP });

export interface AccordionsFormFieldProps {
    id: string;
    initActiveState?: boolean;
    accordionTitle: string;
    fields: FormFieldProps[];
}
