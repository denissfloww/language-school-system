import formModel from './formModel';
import * as Yup from 'yup';

const {
    formField: { name, lessonPrice },
} = formModel;

export default Yup.object().shape({
    [name.name]: Yup.string().required(`${name.requiredErrorMsg}`),
    // [lessonPrice.name]: Yup.string()
    //     .test(`${lessonPrice.name}`, 'Поле должно содержать только цифры!', digitsOnly)
    //     .required(`${lessonPrice.requiredErrorMsg}`),
    [lessonPrice.name]: Yup.number()
        .typeError('Не правильный формат!')
        .test('is-decimal', 'Не правильный формат!', number => /^\d+(\.\d{1,2})?$/.test(String(number))),
});
