import formModel from './formModel';
import * as Yup from 'yup';

const {
    formField: { name, desc, students, teacher, language, cost },
} = formModel;

export default Yup.object().shape({
    [name.name]: Yup.string().required(`${name.requiredErrorMsg}`),
    [teacher.name]: Yup.string().nullable().required(`${teacher.requiredErrorMsg}`),
    [language.name]: Yup.string().nullable().required(`${language.requiredErrorMsg}`),
    [cost.name]: Yup.string().nullable().required(`${cost.requiredErrorMsg}`),
    // [students.name]: Yup.array().required(`${students.requiredErrorMsg}`),
});
