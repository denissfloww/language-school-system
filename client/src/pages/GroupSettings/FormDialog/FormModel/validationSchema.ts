import formModel from './formModel';
import * as Yup from 'yup';

const {
    formField: { name, desc, students, teacher },
} = formModel;

export default Yup.object().shape({
    [name.name]: Yup.string().required(`${name.requiredErrorMsg}`),
    [teacher.name]: Yup.string().nullable().required(`${teacher.requiredErrorMsg}`),
    // [students.name]: Yup.array().required(`${students.requiredErrorMsg}`),
});
