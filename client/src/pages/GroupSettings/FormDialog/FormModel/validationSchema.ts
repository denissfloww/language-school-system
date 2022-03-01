import formModel from './formModel';
import * as Yup from 'yup';

const {
    formField: { name, desc, students },
} = formModel;

export default Yup.object().shape({
    [name.name]: Yup.string().required(`${name.requiredErrorMsg}`),
    // [students.name]: Yup.array().required(`${students.requiredErrorMsg}`),
});
