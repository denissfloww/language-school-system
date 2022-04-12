import * as Yup from 'yup';
import formModel from './formModel';
const {
    formField: { firstName, lastName, role, phone, age },
} = formModel;

export default [
    Yup.object().shape({
        [firstName.name]: Yup.string().required(`${firstName.requiredErrorMsg}`),
        [lastName.name]: Yup.string().required(`${lastName.requiredErrorMsg}`),
        [age.name]: Yup.number().required(`${age.requiredErrorMsg}`),
        // [phone.name]: Yup.string()
        //     .required(`${phone.requiredErrorMsg}`)
        //     .matches(/^(\+7|7|8)?[\s\\-]?\(?[489][0-9]{2}\)?[\s\\-]?[0-9]{3}[\s-]?[0-9]{2}[\s\\-]?[0-9]{2}$/, phone.validateErrorMsg),
    }),
    Yup.object().shape({
        // [role.name]: Yup.string().required(`${role.requiredErrorMsg}`),
        [role.name]: Yup.array().required(`${role.requiredErrorMsg}`),
    }),
    Yup.object().shape({
        [phone.name]: Yup.string()
            .required(`${phone.requiredErrorMsg}`)
            .matches(/^(\+7|7|8)?[\s\\-]?\(?[489][0-9]{2}\)?[\s\\-]?[0-9]{3}[\s-]?[0-9]{2}[\s\\-]?[0-9]{2}$/, phone.validateErrorMsg),
    }),
];
