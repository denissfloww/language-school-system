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
        age,
        email,
    },
} = formModel;

export default {
    [firstName.name]: '',
    [lastName.name]: '',
    [phone.name]: '',
    [email.name]: '',
    [middleName.name]: '',
    [role.name]: [],
    [age.name]: '',
    [parentPhone.name]: '',
    [parentName.name]: '',
    [parentMiddleName.name]: '',
    [parentLastName.name]: '',
    [parentEmail.name]: '',
};
