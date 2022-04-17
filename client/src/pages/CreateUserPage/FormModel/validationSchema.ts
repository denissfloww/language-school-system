import * as Yup from 'yup';
import formModel from './formModel';
const {
    formField: {
        firstName,
        lastName,
        role,
        phone,
        birthDate,
        email,
        parentName,
        parentPhone,
        parentEmail,
        parentLastName,
        parentMiddleName,
    },
} = formModel;

export function getCurrentValidation(isStudent: boolean): any[] {
    const validations = [];

    validations.push(
        Yup.object().shape({
            [firstName.name]: Yup.string().required(`${firstName.requiredErrorMsg}`),
            [lastName.name]: Yup.string().required(`${lastName.requiredErrorMsg}`),
            [birthDate.name]: Yup.date()
                .typeError(`${birthDate.typeErrorMsg}`)
                .max(new Date(), `${birthDate.maxDateErrorMsg}`)
                .required(`${birthDate.requiredErrorMsg}`),
        }) as any,
    );

    validations.push(
        Yup.object().shape({
            [role.name]: Yup.string().required(`${role.requiredErrorMsg}`),
        }),
    );

    if (isStudent) {
        validations.push(
            Yup.object().shape({
                [parentName.name]: Yup.string().required(`${parentName.requiredErrorMsg}`),
                [parentLastName.name]: Yup.string().required(`${parentLastName.requiredErrorMsg}`),
                [parentMiddleName.name]: Yup.string().required(`${parentMiddleName.requiredErrorMsg}`),
                [parentEmail.name]: Yup.string().email(`${parentEmail.validateErrorMsg}`).required(`${parentEmail.requiredErrorMsg}`),
                [parentPhone.name]: Yup.string()
                    .required(`${parentPhone.requiredErrorMsg}`)
                    .matches(
                        /^(\+7|7|8)?[\s\\-]?\(?[489][0-9]{2}\)?[\s\\-]?[0-9]{3}[\s-]?[0-9]{2}[\s\\-]?[0-9]{2}$/,
                        parentPhone.validateErrorMsg,
                    ),
            }),
        );
    } else {
        validations.push(
            Yup.object().shape({
                [phone.name]: Yup.string()
                    .required(`${phone.requiredErrorMsg}`)
                    .matches(
                        /^(\+7|7|8)?[\s\\-]?\(?[489][0-9]{2}\)?[\s\\-]?[0-9]{3}[\s-]?[0-9]{2}[\s\\-]?[0-9]{2}$/,
                        phone.validateErrorMsg,
                    ),
                [email.name]: Yup.string().email(`${email.validateErrorMsg}`).required(`${email.requiredErrorMsg}`),
            }),
        );
    }

    return validations;
}

export default [
    Yup.object().shape({
        [firstName.name]: Yup.string().required(`${firstName.requiredErrorMsg}`),
        [lastName.name]: Yup.string().required(`${lastName.requiredErrorMsg}`),
        [birthDate.name]: Yup.string().required(`${birthDate.requiredErrorMsg}`),
    }),
    Yup.object().shape({
        // [role.name]: Yup.string().required(`${role.requiredErrorMsg}`),
        [role.name]: Yup.array().required(`${role.requiredErrorMsg}`),
    }),
    Yup.object().shape({
        // [phone.name]: Yup.string()
        //     .required(`${phone.requiredErrorMsg}`)
        //     .matches(/^(\+7|7|8)?[\s\\-]?\(?[489][0-9]{2}\)?[\s\\-]?[0-9]{3}[\s-]?[0-9]{2}[\s\\-]?[0-9]{2}$/, phone.validateErrorMsg),
    }),
];
