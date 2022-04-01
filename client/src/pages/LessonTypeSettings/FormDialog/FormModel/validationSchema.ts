import formModel from './formModel';
import * as Yup from 'yup';

const {
    formField: { name, color },
} = formModel;

export default Yup.object().shape({
    [name.name]: Yup.string().required(`${name.requiredErrorMsg}`),
    // [color.name]: Yup.string().required(`${name.requiredErrorMsg}`),
});
