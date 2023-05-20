import * as yup from "yup";

import { ResetPasswordFieldName } from "@models/auth/enums";

const EMAIL_INVALID_MESSAGE = "Введите корректный адрес электронной почты";
const EMAIL_REQUIRED_MESSAGE = "Необходимо ввести адрес электронной почты";

export const validationSchema = yup.object()
    .shape({
        [ResetPasswordFieldName.EMAIL]: yup.string()
            .required(EMAIL_REQUIRED_MESSAGE)
            .email(EMAIL_INVALID_MESSAGE)
    });
