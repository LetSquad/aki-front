import { lazy, useCallback, useMemo } from "react";

import { useFormik } from "formik";

import { WithSuspense } from "@coreUtils/WithSuspense";
import { UserRole } from "@models/users/enums";
import { User, UserFormFields } from "@models/users/types";
import { BaseAddEditFormType } from "@parts/EditForm/BaseAddEditForm";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { updateUserRequest } from "@store/user/reducer";
import { selectIsUpdatingCurrentUser } from "@store/user/selectors";

import { BaseFields, LandlordFields, RenterFields } from "./constants";
import { landlordProfileValidationSchema, userProfileValidationSchema } from "./validation";

const BaseAddEditForm = lazy(
    /* webpackChunkName: "BaseAddEditForm" */ () => import("@parts/EditForm/BaseAddEditForm")
) as BaseAddEditFormType;

export interface UserDetailFormProps {
    onCancel: () => void;
    user: User;
    className?: string;
}

export default function UserDetailForm({
    onCancel,
    user,
    className
}: UserDetailFormProps) {
    const dispatch = useAppDispatch();

    const isUpdatingCurrentUser = useAppSelector(selectIsUpdatingCurrentUser);

    const onSubmit = useCallback(
        (values: UserFormFields) => {
            dispatch(updateUserRequest({ id: user.id, ...values } as User)).then((payload) => {
                if (payload.type === updateUserRequest.fulfilled.type) {
                    onCancel();
                }
            });
        },
        [dispatch, onCancel, user]
    );

    const initialValues = useMemo<UserFormFields>(() => {
        const { id, userRole, ...userFields } = user;

        return userFields;
    }, [user]);

    const validationSchema = useMemo(() => {
        if (user.userRole === UserRole.LANDLORD) {
            return landlordProfileValidationSchema;
        }
        return userProfileValidationSchema;
    }, [user]);

    const additionalFields = useMemo(() => {
        if (user.userRole === UserRole.LANDLORD) {
            return LandlordFields;
        }
        if (user.userRole === UserRole.RENTER) {
            return RenterFields;
        }
        return [];
    }, [user]);

    const formik = useFormik<UserFormFields>({
        onSubmit,
        initialValues,
        validationSchema,
        validateOnMount: true
    });

    return (
        <WithSuspense>
            <BaseAddEditForm
                fields={[...BaseFields, ...additionalFields]}
                onCancel={onCancel}
                className={className}
                isLoading={isUpdatingCurrentUser}
                formik={formik}
            />
        </WithSuspense>
    );
}
