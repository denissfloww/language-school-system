import formModel from './formModel';
import * as Yup from 'yup';

const {
    formField: { name },
} = formModel;

export default Yup.object().shape({
    [name.name]: Yup.string().required(`${name.requiredErrorMsg}`),
});
