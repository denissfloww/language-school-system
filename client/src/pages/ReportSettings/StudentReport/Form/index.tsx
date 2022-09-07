import { Formik, Form } from 'formik';
import studentReportFormModel from './Model/studentReportFormModel';
import InputField from '../../../../components/FormFields/InputField';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import studentReportValidationSchema from './Model/studentReportValidationSchema';
import Button from '@mui/material/Button';
import { TextField, useTheme } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import SelectField from '../../../../components/FormFields/SelectField';
import CheckBoxField from '../../../../components/FormFields/CheckBoxField';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { IAutoCompleteValues } from '../../../../interfaces/displayed/type';
import GroupsService from '../../../../services/GroupsService';
import { IGroup } from '../../../../interfaces/IGroup';
import { IStudent } from '../../../../interfaces/IStudent';
import StudentsService from '../../../../services/StudentsService';
import StudentTestsService from '../../../../services/StudentTestsService';
import { ITest } from '../../../../interfaces/ITest';
import ReportService from '../../../../services/ReportService';
import { useNavigate } from 'react-router-dom';
import { IReport } from '../../../../interfaces/IReport';

const { formId, formField } = studentReportFormModel;

const StudentReportForm = (props: { reportId?: number; studentId: number }) => {
    const theme = useTheme();
    const { reportDate, group, description, isTest, testScore, test } = formField;
    const { reportId, studentId } = props;
    const navigate = useNavigate();
    function _handleSubmit(values: any, actions: any) {
        console.log(values);
        const data = {
            reportDate: values.reportDate,
            testScored: Number(values.testScore),
            description: values.description,
            studentId: studentId,
            groupId: Number(values.group),
            testId: values.isTest ? Number(values.test) : null,
        };
        if (reportId) {
            ReportService.updateReport(reportId, data).then(() => {
                navigate('/dashboard/reports');
            });
        } else {
            ReportService.createReport(data).then(() => {
                navigate('/dashboard/reports');
            });
        }
    }

    const [groupsValues, setGroupsValues] = useState<IAutoCompleteValues[]>([]);
    const [testsValues, setTestsValues] = useState<IAutoCompleteValues[]>([]);
    const [student, setStudent] = useState<IStudent>();
    const [tests, setTests] = useState<ITest[]>([]);
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState<IReport>();
    const [initialValues, setInitialValues] = useState<{ [p: string]: string | boolean }>({
        [reportDate.name]: '',
        [description.name]: '',
        [group.name]: '',
        [isTest.name]: false,
        [testScore.name]: '',
        [test.name]: '',
    });
    useEffect(() => {
        setLoading(true);
        if (reportId) {
            ReportService.getReportById(reportId).then(r => {
                const initialValues: { [p: string]: string | boolean } = {
                    [description.name]: r.description,
                    [reportDate.name]: r.reportDate,
                    [group.name]: String(r.group.id),
                };
                if (r.test) {
                    initialValues[isTest.name] = true;
                    initialValues[testScore.name] = String(r.testScored);
                    initialValues[test.name] = String(r.test.id);
                }
                setInitialValues(initialValues);
            });
        }
        GroupsService.getStudentGroups(studentId).then(groups => {
            const groupsValues: IAutoCompleteValues[] = groups.map((group: IGroup) => {
                return { label: group.name, value: String(group.id) };
            });

            setGroupsValues(groupsValues);
        });

        StudentsService.getStudentById(studentId).then(student => {
            setStudent(student);
        });

        StudentTestsService.getStudentTests().then(tests => {
            const testsValues: IAutoCompleteValues[] = tests.data?.map((test: ITest) => {
                return { label: test.name, value: String(test.id) };
            });

            setTests(tests.data);
            setTestsValues(testsValues);
        });
        setLoading(false);
    }, []);

    function getTestById(selectedTestId: number) {
        return tests.filter(t => t.id == selectedTestId)[0];
    }

    function calculateTestProcents(testScore: number, selectedTestId: number) {
        return Math.round((testScore / Number(getTestById(selectedTestId)?.points)) * 100);
    }

    return (
        <>
            {!loading ? (
                <>
                    <Typography variant='h6' sx={{ m: 1 }}>
                        Ученик: {student?.firstName} {student?.lastName}
                    </Typography>
                    <Formik
                        enableReinitialize={true}
                        initialValues={initialValues}
                        onSubmit={_handleSubmit}
                        validateOnChange
                        validationSchema={studentReportValidationSchema}
                    >
                        {(formikProps: any) => (
                            <Form id={formId}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12}>
                                        <SelectField name={group.name} label={group.label} data={groupsValues} fullWidth />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                onChange={(value: any) => {
                                                    console.log(formikProps);
                                                    formikProps.setFieldValue('reportDate', value);
                                                }}
                                                inputFormat='dd.MM.yyyy'
                                                mask={'__.__.____'}
                                                value={formikProps.values.reportDate}
                                                renderInput={(params: any) => (
                                                    <TextField
                                                        {...params}
                                                        name={reportDate.name}
                                                        label={reportDate.label}
                                                        error={Boolean(formikProps.errors.reportDate && formikProps.touched.reportDate)}
                                                        helperText={formikProps.errors.reportDate}
                                                        fullWidth
                                                    />
                                                )}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <CheckBoxField name={isTest.name} label={isTest.label} />
                                    </Grid>
                                    {formikProps.values.isTest ? (
                                        <>
                                            <Grid item xs={12} sm={6}>
                                                <InputField
                                                    margin='dense'
                                                    type='number'
                                                    InputProps={{ inputProps: { min: 0, max: 200 } }}
                                                    name={testScore.name}
                                                    label={testScore.label}
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <SelectField
                                                    margin='dense'
                                                    name={test.name}
                                                    label={test.label}
                                                    data={testsValues}
                                                    fullWidth
                                                />
                                            </Grid>
                                        </>
                                    ) : null}
                                    {formikProps.values.test && formikProps.values.testScore ? (
                                        <Grid item xs={12} sm={6}>
                                            <Typography>
                                                Процент выполнения теста:{' '}
                                                <b>
                                                    {calculateTestProcents(
                                                        Number(formikProps.values.testScore),
                                                        Number(formikProps.values.test),
                                                    )}
                                                    %
                                                </b>
                                            </Typography>
                                            <Typography>
                                                Максимальное колличество баллов за тест:{' '}
                                                <b>{getTestById(Number(formikProps.values.test))?.points}</b>
                                            </Typography>
                                        </Grid>
                                    ) : null}
                                    <Grid item xs={12} sm={12}>
                                        <InputField
                                            margin='dense'
                                            multiline
                                            rows={8}
                                            name={description.name}
                                            label={description.label}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <Button
                                            disabled={formikProps.isSubmitting}
                                            type='submit'
                                            variant='contained'
                                            color='primary'
                                            sx={{ marginTop: theme.spacing(3), marginLeft: theme.spacing(1) }}
                                        >
                                            {reportId ? 'Изменить' : 'Добавить'}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </>
            ) : null}
        </>
    );
};

export default StudentReportForm;
