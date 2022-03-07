import formModel from './formModel';
import * as Yup from 'yup';

const {
    formField: { firstName, lastName, middleName },
} = formModel;

export default Yup.object().shape({
    [firstName.name]: Yup.string().required(`${firstName.requiredErrorMsg}`),
    [lastName.name]: Yup.string().required(`${lastName.requiredErrorMsg}`),
});
