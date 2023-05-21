import {
    lazy,
    useCallback,
    useEffect,
    useMemo
} from "react";

import axios from "axios";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Form, Message } from "semantic-ui-react";

import apiUrls from "@api/apiUrls";
import {
    useLoginData,
    useSetEmail,
    useSetPassword,
    useSetSignUp
} from "@components/Auth/AuthContext";
import { WithSuspense } from "@coreUtils/WithSuspense";
import { useToggle } from "@hooks/useToogle";
import { SignInFieldName } from "@models/auth/enums";
import { SignInFormValues, SignInResponse } from "@models/auth/types";
import { FormFieldType } from "@models/forms/enums";
import { FormFieldProps } from "@models/forms/types";
import PrimaryButton from "@parts/Buttons/PrimaryButton";
import UnderscoreButton from "@parts/Buttons/UnderscoreButton";
import FormFieldPlaceholder from "@parts/FormField/Placeholders/FormFieldPlaceholder";
import { setAuth, setIsLoginOpen, setRole } from "@store/info/reducer";

import authStyles from "../styles/AuthForm.module.scss";
import { validationSchema } from "./signInValidation";

const FormField = lazy(/* webpackChunkName: "FormField" */ () => import("@parts/FormField/FormField"));

export const Inputs: (setEmail: (email: string) => void, setPassword: (password: string) => void) => FormFieldProps[] =
    (setEmail, setPassword) => [
        {
            name: SignInFieldName.EMAIL,
            label: "Электронная почта",
            required: true,
            type: FormFieldType.INPUT,
            placeholder: "Введите адрес электронной почты",
            onChange: setEmail
        }, {
            name: SignInFieldName.PASSWORD,
            label: "Пароль",
            required: true,
            type: FormFieldType.PASSWORD_INPUT,
            placeholder: "Введите пароль",
            onChange: setPassword
        }
    ];

const initialValue = (loginData: SignInFormValues) => ({
    [SignInFieldName.EMAIL]: loginData[SignInFieldName.EMAIL],
    [SignInFieldName.PASSWORD]: loginData[SignInFieldName.PASSWORD]
});

interface SignInFormProps {
    setIsLoginLoading: (state: boolean) => void;
    setForgotPassword: (state: boolean) => void;
}

export default function SignInForm({ setIsLoginLoading, setForgotPassword }: SignInFormProps) {
    const dispatch = useDispatch();

    const [searchParams, setSearchParams] = useSearchParams();

    const [userUnConfirmed, , , setUserUnConfirmedFalse] = useToggle();
    const [isLoginLoadingFailed, , setIsLoginLoadingFailedTrue, setIsLoginLoadingFailedFalse] = useToggle();
    const [isLoginDataError, , setIsLoginDataErrorTrue, setIsLoginDataErrorFalse] = useToggle();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const isActivation = useMemo(() => !!searchParams.get("activation"), []);

    const setSignUp = useSetSignUp();

    const loginData = useLoginData();
    const setEmail = useSetEmail();
    const setPassword = useSetPassword();

    const signIn = useCallback(
        (values: SignInFormValues) => {
            setIsLoginLoading(true);
            setIsLoginDataErrorFalse();
            setIsLoginLoadingFailedFalse();
            setUserUnConfirmedFalse();
            axios
                .post<SignInResponse>(apiUrls.signIn(), values, {
                validateStatus: (status: number) => (status >= 200 && status < 300) || status === 401
            })
                .then((response) => {
                    if (response.status === 200) {
                        localStorage.setItem("aki_role", JSON.stringify(response.data.dataBlock.role));
                        dispatch(setRole(response.data.dataBlock.role));
                        dispatch(setAuth(true));
                        dispatch(setIsLoginOpen(false));
                    } else {
                        setIsLoginLoading(false);
                        setIsLoginDataErrorTrue();
                    }
                })
                .catch(() => {
                    // TODO: Добавить обработку типов ошибок и вывод соответствующих сообщений (ошибка сервера, не найден пользователь,
                    // некорректные логин/пароль пользователь не подтвердил регистрацию)
                    setIsLoginLoading(false);
                    setIsLoginLoadingFailedTrue();
                });
        },
        [
            dispatch,
            setIsLoginDataErrorFalse,
            setIsLoginDataErrorTrue,
            setIsLoginLoading,
            setIsLoginLoadingFailedFalse,
            setIsLoginLoadingFailedTrue,
            setUserUnConfirmedFalse
        ]
    );

    useEffect(() => {
        if (isActivation) {
            searchParams.delete("activation");
            setSearchParams(searchParams);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Formik
            onSubmit={signIn}
            initialValues={initialValue(loginData)}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => (
                <Form
                    onSubmit={handleSubmit}
                    className={authStyles.authForm}
                >
                    <h2>Войдите в аккаунт</h2>
                    <div className={authStyles.authFieldsContainer}>
                        {Inputs(setEmail, setPassword).map((input) => (
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
                    {(isLoginDataError || isLoginLoadingFailed || userUnConfirmed || isActivation) && (
                        <div className={authStyles.messageContainer}>
                            {isLoginDataError && (
                                <Message
                                    visible
                                    error
                                    className={authStyles.message}
                                    header="Введены некорректные данные"
                                    content="Введите корректный логин и пароль и попробуйте снова"
                                />
                            )}
                            {isLoginLoadingFailed && (
                                <Message
                                    visible
                                    error
                                    className={authStyles.message}
                                    header="Произошла непредвиденная ошибка"
                                    content="Повторите авторизацию еще раз позднее"
                                />
                            )}
                            {userUnConfirmed && (
                                <Message
                                    visible
                                    warning
                                    className={authStyles.message}
                                    header="Подтвердите регистрацию чтобы войти"
                                    content="Письмо с подтверждением было отправлено вам на почту, указанную при регистрации"
                                />
                            )}
                            {isActivation && (
                                <Message
                                    visible={isActivation}
                                    success
                                    className={authStyles.message}
                                    header="Вы успешно активировали аккаунт"
                                    content="Теперь вы можете войти с указанным при регистрации логином и паролем"
                                />
                            )}
                        </div>
                    )}
                    <div className={authStyles.authButtonsContainer}>
                        <PrimaryButton
                            className={authStyles.authButton}
                            type="submit"
                        >
                            Войти
                        </PrimaryButton>
                        <UnderscoreButton
                            onClick={() => setForgotPassword(true)}
                            type="button"
                        >
                            Забыли пароль?
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
