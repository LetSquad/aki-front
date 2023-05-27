import {
    lazy,
    useCallback,
    useEffect,
    useMemo,
    useState
} from "react";

import axios from "axios";
import { FormikProvider, useFormik } from "formik";
import { useMediaQuery } from "react-responsive";
import {
    Dimmer,
    Form,
    Loader,
    Message
} from "semantic-ui-react";

import apiUrls from "@api/apiUrls";
import {
    useIsSignIn,
    useLoginData,
    useSetEmail,
    useSetPassword,
    useSetSignIn
} from "@components/Auth/AuthContext";
import { landLordValidationSchema, validationSchema as renterValidationSchema } from "@components/Auth/SignUp/signUpValidation";
import { getUserSpecializationTitleFromEnum, userRoleToLabel } from "@components/Profile/utils/utils";
import { MOBILE_MAX_WIDTH } from "@coreUtils/constants";
import { WithSuspense } from "@coreUtils/WithSuspense";
import { useToggle } from "@hooks/useToogle";
import { BaseRegistrationFieldName, LandlordRegistrationFieldName, SignInFieldName } from "@models/auth/enums";
import { SignInFormValues, SignUpFormValues, SignUpResponse } from "@models/auth/types";
import { FormFieldType } from "@models/forms/enums";
import { DropdownOption, FormFieldProps } from "@models/forms/types";
import { BaseUserRole, UserSpecialization } from "@models/users/enums";
import PrimaryButton from "@parts/Buttons/PrimaryButton";
import UnderscoreButton from "@parts/Buttons/UnderscoreButton";
import FormFieldPlaceholder from "@parts/FormField/Placeholders/FormFieldPlaceholder";

import authStyles from "../styles/AuthForm.module.scss";
import styles from "./styles/SignUpCard.module.scss";

const FormField = lazy(/* webpackChunkName: "FormField" */ () => import("@parts/FormField/FormField"));

const UserSpecializationsOptions: DropdownOption[] = Object.values(UserSpecialization).map((specialization) => ({
    value: specialization,
    text: getUserSpecializationTitleFromEnum(specialization)
}));

const BaseInputs: (setEmail: (email: string) => void, setPassword: (password: string) => void) => FormFieldProps[] =
    (setEmail, setPassword) => [
        {
            name: BaseRegistrationFieldName.ROLE,
            type: FormFieldType.BUTTON_GROUP,
            fluid: true,
            options: Object.values(BaseUserRole).map((role) => ({ value: role, displayText: userRoleToLabel(role) }))
        }, {
            name: BaseRegistrationFieldName.EMAIL,
            label: "Электронная почта",
            required: true,
            type: FormFieldType.INPUT,
            placeholder: "Введите адрес электронной почты",
            onChange: setEmail
        }, {
            name: BaseRegistrationFieldName.PHONE,
            label: "Номер телефона",
            required: true,
            type: FormFieldType.PHONE_NUMBER_INPUT,
            placeholder: "Введите номер телефона"
        }, {
            name: BaseRegistrationFieldName.FIRST_NAME,
            label: "Имя",
            required: true,
            type: FormFieldType.INPUT,
            placeholder: "Введите ваше имя"
        }, {
            name: BaseRegistrationFieldName.LAST_NAME,
            label: "Фамилия",
            required: true,
            type: FormFieldType.INPUT,
            placeholder: "Введите вашу фамилию"
        }, {
            name: BaseRegistrationFieldName.MIDDLE_NAME,
            label: "Отчество",
            required: false,
            type: FormFieldType.INPUT,
            placeholder: "Введите ваше отчество (если имеется)"
        }, {
            name: BaseRegistrationFieldName.SPECIALIZATIONS,
            options: UserSpecializationsOptions,
            label: "Род занятий",
            type: FormFieldType.DROPDOWN,
            multiple: true,
            placeholder: "Выберите ваш род занятий"
        }, {
            name: BaseRegistrationFieldName.PASSWORD,
            label: "Пароль",
            required: true,
            type: FormFieldType.PASSWORD_INPUT,
            placeholder: "Введите пароль",
            withStrength: true,
            onChange: setPassword
        }, {
            name: BaseRegistrationFieldName.PASSWORD_CONFIRM,
            label: "Подтвердите пароль",
            required: true,
            type: FormFieldType.PASSWORD_INPUT,
            placeholder: "Введите пароль повторно"
        }
    ];

const LandlordAdditionalInputs: FormFieldProps[] =
    [
        {
            name: LandlordRegistrationFieldName.INN,
            label: "ИНН",
            required: true,
            type: FormFieldType.INPUT,
            placeholder: "Введите ИНН",
            maxLength: 12
        }, {
            name: LandlordRegistrationFieldName.ORGANIZATION,
            label: "Название юр. лица",
            required: true,
            type: FormFieldType.INPUT,
            placeholder: "Введите название вашего юридического лица"
        }, {
            name: LandlordRegistrationFieldName.JOB_TITLE,
            label: "Должность",
            required: true,
            type: FormFieldType.INPUT,
            placeholder: "Введите ваше должность"
        }
    ];

const initialValues: (loginData: SignInFormValues) => SignUpFormValues = (loginData) => ({
    [BaseRegistrationFieldName.ROLE]: BaseUserRole.RENTER,
    [BaseRegistrationFieldName.EMAIL]: loginData[SignInFieldName.EMAIL],
    [BaseRegistrationFieldName.FIRST_NAME]: "",
    [BaseRegistrationFieldName.LAST_NAME]: "",
    [BaseRegistrationFieldName.MIDDLE_NAME]: undefined,
    [BaseRegistrationFieldName.PHONE]: "",
    [LandlordRegistrationFieldName.INN]: undefined,
    [LandlordRegistrationFieldName.ORGANIZATION]: undefined,
    [LandlordRegistrationFieldName.JOB_TITLE]: undefined,
    [BaseRegistrationFieldName.PASSWORD]: loginData[SignInFieldName.PASSWORD],
    [BaseRegistrationFieldName.PASSWORD_CONFIRM]: ""
});

export default function SignUpCard() {
    const [signUpEmail, setSignUpEmail] = useState<string>();
    const [isDataLoading, , setIsDataLoadingTrue, setIsDataLoadingFalse] = useToggle();
    const [isDataLoadingFailed, , isDataLoadingFailedTrue, isDataLoadingFailedFalse] = useToggle();
    const [isDataLoadingSuccess, , setIsDataLoadingSuccessTrue, setIsDataLoadingSuccessFalse] = useToggle();

    const isSignIn = useIsSignIn();
    const setSignIn = useSetSignIn();

    const loginData = useLoginData();
    const setEmail = useSetEmail();
    const setPassword = useSetPassword();

    const [userRole, setUserRole] = useState<BaseUserRole>(initialValues(loginData)[BaseRegistrationFieldName.ROLE]);

    const active = useMemo(() => !isSignIn, [isSignIn]);

    const isMobile = useMediaQuery({ maxWidth: MOBILE_MAX_WIDTH });

    const signUp = useCallback(
        (values: SignUpFormValues) => {
            setIsDataLoadingTrue();
            isDataLoadingFailedFalse();
            setIsDataLoadingSuccessFalse();
            const { confirmPassword, email, ...properties } = values;

            axios
                .post<SignUpResponse>(apiUrls.register(), { ...properties, email })
                .then(() => {
                    setSignUpEmail(email);
                    setIsDataLoadingSuccessTrue();
                })
                .catch(() => isDataLoadingFailedTrue())
                .finally(() => setIsDataLoadingFalse());
        },
        [
            isDataLoadingFailedFalse,
            isDataLoadingFailedTrue,
            setIsDataLoadingFalse,
            setIsDataLoadingSuccessFalse,
            setIsDataLoadingSuccessTrue,
            setIsDataLoadingTrue
        ]
    );

    const validationSchema = useMemo(() => {
        if (userRole === BaseUserRole.LANDLORD) {
            return landLordValidationSchema;
        }
        return renterValidationSchema;
    }, [userRole]);

    const formik = useFormik<SignUpFormValues>({
        onSubmit: signUp,
        initialValues: initialValues(loginData),
        validationSchema
    });

    const isSubmitDisabled = useMemo(() => Object.keys(formik.errors).length > 0, [formik.errors]);

    const containerStyles = useMemo(() => {
        if (isMobile) {
            return styles.signUpMobile;
        }

        return active ? styles.signUpActive : styles.signUp;
    }, [active, isMobile]);

    useEffect(() => {
        setUserRole(formik.values[BaseRegistrationFieldName.ROLE]);
    }, [formik.values]);

    return (
        <div className={containerStyles}>
            <h2 className={authStyles.authTitle}>Регистрация</h2>
            {isDataLoadingSuccess
                ? (
                    <p className={authStyles.success}>
                        {`Мы отправили письмо с подтверждением авторизации на ${signUpEmail}. Необходимо перейти по ссылке из письма для завершения регистрации`}
                    </p>
                )
                : (
                    <>
                        {isDataLoading && (
                            <Dimmer
                                active
                                inverted
                            >
                                <Loader />
                            </Dimmer>
                        )}
                        <FormikProvider value={formik}>
                            <Form
                                onSubmit={formik.handleSubmit}
                                className={authStyles.authForm}
                            >
                                <div className={authStyles.authFieldsContainer}>
                                    {BaseInputs(setEmail, setPassword).map((input) => (
                                        <WithSuspense
                                            key={input.name}
                                            loader={<FormFieldPlaceholder />}
                                        >
                                            <FormField
                                                {...input}
                                                className={authStyles.authField}
                                            />
                                        </WithSuspense>
                                    ))}
                                    {
                                        formik.values[BaseRegistrationFieldName.ROLE] === BaseUserRole.LANDLORD &&
                                        LandlordAdditionalInputs.map((input) => (
                                            <WithSuspense
                                                key={input.name}
                                                loader={<FormFieldPlaceholder />}
                                            >
                                                <FormField
                                                    {...input}
                                                    className={authStyles.authField}
                                                />
                                            </WithSuspense>
                                        ))
                                    }
                                </div>
                                {isDataLoadingFailed && (
                                    <div className={authStyles.messageContainer}>
                                        <Message
                                            visible
                                            error
                                            className={authStyles.message}
                                            header="Произошла непредвиденная ошибка"
                                            content="Повторите регистрацию еще раз позднее"
                                        />
                                    </div>
                                )}
                                <PrimaryButton
                                    className={authStyles.authButton}
                                    disabled={isSubmitDisabled}
                                    type="submit"
                                >
                                    Зарегистрироваться
                                </PrimaryButton>
                                <UnderscoreButton
                                    onClick={setSignIn}
                                    type="button"
                                >
                                    Вход
                                </UnderscoreButton>
                            </Form>
                        </FormikProvider>
                    </>
                )}
        </div>
    );
}
