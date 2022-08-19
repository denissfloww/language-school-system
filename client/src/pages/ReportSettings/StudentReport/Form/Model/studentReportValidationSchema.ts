import studentReportFormModel from './studentReportFormModel';
import * as Yup from 'yup';

const {
    formField: { reportDate, group, description, test, isTest, testScore },
} = studentReportFormModel;

export default Yup.object().shape({
    [reportDate.name]: Yup.date().typeError(`${reportDate.typeErrorMsg}`).required(`${reportDate.requiredErrorMsg}`),
    [group.name]: Yup.string().required(`${group.requiredErrorMsg}`),
    [description.name]: Yup.string().required(`${description.requiredErrorMsg}`),
    [test.name]: Yup.string().when(isTest.name, {
        is: true,
        then: Yup.string().required(test.requiredErrorMsg),
        otherwise: Yup.string(),
    }),
    // [testScore.name]: Yup.number().when(isTest.name, {
    //     is: true,
    //     then: Yup.string().required(testScore.requiredErrorMsg),
    //     otherwise: Yup.string(),
    // }),
});
