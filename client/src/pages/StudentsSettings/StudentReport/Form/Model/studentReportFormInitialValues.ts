import studentReportFormModel from './studentReportFormModel';

const {
    formField: { reportDate, group, description },
} = studentReportFormModel;

export default {
    [reportDate.name]: '',
    [group.name]: '',
    [description.name]: '',
};
