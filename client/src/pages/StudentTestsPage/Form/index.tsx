import Grid from '@mui/material/Grid';
import * as React from 'react';
import { useEffect, useState } from 'react';
import InputField from '../../../components/FormFields/InputField';
import { Form, Formik } from 'formik';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material';
import testValidationSchema from './Model/testValidationSchema';
import testFormModel from './Model/testFormModel';
import StudentTestsService from '../../../services/StudentTestsService';
import { useNavigate } from 'react-router-dom';

const { formId, formField } = testFormModel;

const TestForm = (props: { testId?: number }) => {
    const theme = useTheme();
    const { testId } = props;
    const { description, name, points } = formField;
    const navigate = useNavigate();
    function _handleSubmit(values: any, actions: any) {
        if (!testId) {
            StudentTestsService.createTest(values).then(() => {
                navigate(-1);
            });
        } else {
            StudentTestsService.updateTest(testId, values).then(() => {
                navigate(-1);
            });
        }
    }

    const [initialValues, setInitialValues] = useState({ [description.name]: '', [name.name]: '', [points.name]: '' });
    const [loading, setLoading] = useState(!!testId);

    useEffect(() => {
        if (testId) {
            StudentTestsService.getTestById(Number(testId)).then(res => {
                setInitialValues(res);
                setLoading(false);
            });
        }
    }, []);

    return (
        <>
            {!loading ? (
                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    onSubmit={_handleSubmit}
                    validateOnChange
                    validationSchema={testValidationSchema}
                >
                    {(formikProps: any) => {
                        return (
                            <Form id={formId}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12}>
                                        <InputField margin='dense' name={name.name} label={name.label} fullWidth />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <InputField
                                            margin='dense'
                                            multiline
                                            maxRows={10}
                                            rows={4}
                                            name={description.name}
                                            label={description.label}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <InputField
                                            margin='dense'
                                            type='number'
                                            InputProps={{ inputProps: { min: 0, max: 200 } }}
                                            name={points.name}
                                            label={points.label}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <Button
                                            disabled={formikProps.isSubmitting}
                                            type='submit'
                                            variant='contained'
                                            color='primary'
                                            sx={{ marginLeft: theme.spacing(1) }}
                                        >
                                            {testId ? 'Изменить' : 'Добавить'}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Form>
                        );
                    }}
                </Formik>
            ) : null}
        </>
    );
};

export default TestForm;
