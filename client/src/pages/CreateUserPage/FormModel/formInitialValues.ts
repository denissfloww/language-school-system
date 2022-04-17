import formModel from './formModel';
const {
    formField: {
        firstName,
        lastName,
        middleName,
        role,
        phone,
        parentPhone,
        parentName,
        parentMiddleName,
        parentLastName,
        parentEmail,
        birthDate,
        email,
    },
} = formModel;

export default {
    [firstName.name]: '',
    [lastName.name]: '',
    [phone.name]: '',
    [email.name]: '',
    [middleName.name]: '',
    [role.name]: '',
    [birthDate.name]: '',
    [parentPhone.name]: '',
    [parentName.name]: '',
    [parentMiddleName.name]: '',
    [parentLastName.name]: '',
    [parentEmail.name]: '',
};
