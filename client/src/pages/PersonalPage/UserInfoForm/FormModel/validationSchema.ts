import formModel from './formModel';
import * as Yup from 'yup';

const {
    formField: { firstName, lastName, phone, age, email, parentName, parentPhone, parentEmail, parentLastName, parentMiddleName },
} = formModel;

export function getCurrentValidation(isStudent: boolean): any {
    const validation = Yup.object().shape({});

    return validation;
}
