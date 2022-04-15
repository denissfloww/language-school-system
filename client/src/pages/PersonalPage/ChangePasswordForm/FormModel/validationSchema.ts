import * as Yup from 'yup';
import formModel from './formModel';

const {
    formField: { oldPassword, newPassword, confirmNewPassword },
} = formModel;

export default Yup.object().shape({
    [oldPassword.name]: Yup.string()
        .required(`${oldPassword.requiredErrorMsg}`)
        .min(8, oldPassword.lengthErrorMsg)
        .matches(/[a-zA-Z]/, oldPassword.validationErrorMsg),
    [newPassword.name]: Yup.string()
        .required(`${newPassword.requiredErrorMsg}`)
        .min(8, newPassword.lengthErrorMsg)
        .matches(/[a-zA-Z]/, newPassword.validationErrorMsg),
    [confirmNewPassword.name]: Yup.string()
        .required(`${confirmNewPassword.requiredErrorMsg}`)
        .min(8, confirmNewPassword.lengthErrorMsg)
        .matches(/[a-zA-Z]/, confirmNewPassword.validationErrorMsg)
        .oneOf([Yup.ref(newPassword.name), null], 'Пароли должны совпадать'),
});
