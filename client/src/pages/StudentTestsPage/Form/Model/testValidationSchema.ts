import * as Yup from 'yup';
import testFormModel from './testFormModel';

const {
    formField: { description, name, points },
} = testFormModel;

export default Yup.object().shape({
    [name.name]: Yup.string().required(`${name.requiredErrorMsg}`),
    [points.name]: Yup.number().required(`${points.requiredErrorMsg}`),
});
