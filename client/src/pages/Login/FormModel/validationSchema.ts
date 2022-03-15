import formModel from './formModel';
import * as Yup from 'yup';

const {
    formField: { login, password },
} = formModel;

export default Yup.object().shape({
    [login.name]: Yup.string().required(`${login.requiredErrorMsg}`),
    [password.name]: Yup.string().required(`${password.requiredErrorMsg}`),
});
