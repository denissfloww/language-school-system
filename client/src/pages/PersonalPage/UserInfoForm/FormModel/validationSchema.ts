import formModel from './formModel';
import * as Yup from 'yup';

const {
    formField: { firstName, lastName, phone, age, email, parentName, parentPhone, parentEmail, parentLastName, parentMiddleName },
} = formModel;

export function getValidationUserInfoForm(isStudent: boolean): any {
    const validation: any = {}

    validation[firstName.name] = Yup.string().required(`${firstName.requiredErrorMsg}`);
    validation[lastName.name]= Yup.string().required(`${lastName.requiredErrorMsg}`);
    validation[age.name]= Yup.number().required(`${age.requiredErrorMsg}`);

    if (isStudent){
        validation[parentName.name]= Yup.string().required(`${parentName.requiredErrorMsg}`);
            validation[parentLastName.name]= Yup.string().required(`${parentLastName.requiredErrorMsg}`);
            validation[parentMiddleName.name]= Yup.string().required(`${parentMiddleName.requiredErrorMsg}`);
            validation[parentEmail.name]= Yup.string().email(`${parentEmail.validateErrorMsg}`).required(`${parentEmail.requiredErrorMsg}`);
            validation[parentPhone.name]= Yup.string()
            .required(`${parentPhone.requiredErrorMsg}`)
            .matches(
                /^(\+7|7|8)?[\s\\-]?\(?[489][0-9]{2}\)?[\s\\-]?[0-9]{3}[\s-]?[0-9]{2}[\s\\-]?[0-9]{2}$/,
                parentPhone.validateErrorMsg,
            )
    }
    else {
        validation[email.name]= Yup.string().email(`${email.validateErrorMsg}`).required(`${email.requiredErrorMsg}`);
            validation[phone.name]= Yup.string()
                .required(`${phone.requiredErrorMsg}`)
                .matches(
                    /^(\+7|7|8)?[\s\\-]?\(?[489][0-9]{2}\)?[\s\\-]?[0-9]{3}[\s-]?[0-9]{2}[\s\\-]?[0-9]{2}$/,
                    phone.validateErrorMsg,
                )
    }



    return Yup.object().shape({...validation});
}
