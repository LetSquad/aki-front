import { lazy, useCallback } from "react";

import axios from "axios";
import { Formik } from "formik";
import { Form, Message } from "semantic-ui-react";

import apiUrls from "@api/apiUrls";
import { useLoginData, useSetEmail, useSetSignUp } from "@components/Auth/AuthContext";
import { WithSuspense } from "@coreUtils/WithSuspense";
import { useToggle } from "@hooks/useToogle";
import { ResetPasswordFieldName, SignInFieldName } from "@models/auth/enums";
import { ResetPasswordFormValues, SignInFormValues, SignInResponse } from "@models/auth/types";
import { FormFieldType } from "@models/forms/enums";
import { FormFieldProps } from "@models/forms/types";
import PrimaryButton from "@parts/Buttons/PrimaryButton";
import UnderscoreButton from "@parts/Buttons/UnderscoreButton";
import FormFieldPlaceholder from "@parts/FormField/Placeholders/FormFieldPlaceholder";

import authStyles from "../styles/AuthForm.module.scss";
import { validationSchema } from "./resetPasswordValidation";

const FormField = lazy(/* webpackChunkName: "FormField" */ () => import("@parts/FormField/FormField"));

export const Inputs: (setEmail: (email: string) => void) => FormFieldProps[] = (setEmail) => [
    {
        name: ResetPasswordFieldName.EMAIL,
        label: "Электронная почта",
        required: true,
        type: FormFieldType.INPUT,
        placeholder: "Введите email для сброса пароля",
        onChange: setEmail
    }
];

const initialValue: (loginData: SignInFormValues) => ResetPasswordFormValues = (loginData) => ({
    [ResetPasswordFieldName.EMAIL]: loginData[SignInFieldName.EMAIL]
});

interface ResetPasswordFormProps {
    setForgotPassword: (state: boolean) => void;
    setIsLoginLoading: (state: boolean) => void;
}

export default function ResetPasswordForm({ setForgotPassword, setIsLoginLoading }: ResetPasswordFormProps) {
    const [isPasswordReset, , setIsPasswordResetTrue] = useToggle();
    const [isResetPasswordError, , setIsResetPasswordErrorTrue, setIsResetPasswordErrorFalse] = useToggle();

    const setSignUp = useSetSignUp();

    const loginData = useLoginData();
    const setEmail = useSetEmail();

    const resetPassword = useCallback(
        (values: ResetPasswordFormValues) => {
            setIsLoginLoading(true);
            setIsResetPasswordErrorFalse();
            axios
                .post<SignInResponse>(apiUrls.resetPassword(), values)
                .then(() => {
                    setIsPasswordResetTrue();
                })
                .catch(() => {
                    setIsResetPasswordErrorTrue();
                })
                .finally(() => {
                    setIsLoginLoading(false);
                });
        },
        [setIsLoginLoading, setIsPasswordResetTrue, setIsResetPasswordErrorFalse, setIsResetPasswordErrorTrue]
    );

    return isPasswordReset
        ? (
            <p className={authStyles.success}>Пароль успешно сброшен</p>
        )
        : (
            <Formik
                onSubmit={resetPassword}
                initialValues={initialValue(loginData)}
                validationSchema={validationSchema}
            >
                {({ handleSubmit }) => (
                    <Form
                        className={authStyles.authForm}
                        onSubmit={handleSubmit}
                    >
                        <h2 className={authStyles.authTitle}>Забыли пароль?</h2>
                        <div className={authStyles.authFieldsContainer}>
                            {Inputs(setEmail).map((input) => (
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
                        </div>
                        {isResetPasswordError && (
                            <div className={authStyles.messageContainer}>
                                <Message
                                    visible
                                    warning
                                    className={authStyles.message}
                                    header="Некорректная почта"
                                    content="Введенный адрес не найден"
                                />
                            </div>
                        )}
                        <div className={authStyles.authButtonsContainer}>
                            <PrimaryButton
                                className={authStyles.authButton}
                                secondary
                            >
                                Отправить код
                            </PrimaryButton>
                            <UnderscoreButton
                                onClick={() => setForgotPassword(false)}
                                type="button"
                            >
                                Назад
                            </UnderscoreButton>
                            <UnderscoreButton
                                onClick={setSignUp}
                                type="button"
                            >
                                Регистрация
                            </UnderscoreButton>
                        </div>
                    </Form>
                )}
            </Formik>
        );
}
