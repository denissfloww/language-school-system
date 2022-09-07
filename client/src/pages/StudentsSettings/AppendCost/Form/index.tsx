import { Form, Formik } from 'formik';
import Grid from '@mui/material/Grid';
import formModel from './Model/formModel';
import SelectField from '../../../../components/FormFields/SelectField';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import StudentsService from '../../../../services/StudentsService';
import { IStudent } from '../../../../interfaces/IStudent';
import { IGroup } from '../../../../interfaces/IGroup';
import GroupsService from '../../../../services/GroupsService';
import CostsService from '../../../../services/CostsService';
import { IAutoCompleteValues } from '../../../../interfaces/displayed/type';
import { ICost, ICostStudentGroupId } from '../../../../interfaces/ICost';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const { formId, formField } = formModel;

const AppendCostForm = (props: { costStudentGroupId?: number; studentId: number; groupId: number }) => {
    const { costStudentGroupId, studentId, groupId } = props;
    const { cost } = formField;
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const [student, setStudent] = useState<IStudent>();
    const navigate = useNavigate();
    const [group, setGroup] = useState<IGroup>();
    const [costsValues, setCostsValues] = useState<IAutoCompleteValues[]>([]);

    const [initialValues, setInitialValues] = useState<{ [p: string]: string }>({
        [cost.name]: '',
    });

    useEffect(() => {
        setLoading(true);

        StudentsService.getStudentById(studentId).then(student => {
            setStudent(student);
        });

        GroupsService.getGroupById(groupId).then(group => {
            setGroup(group);
        });

        CostsService.getCosts().then(costs => {
            const costsValues: IAutoCompleteValues[] = costs.data?.map((cost: ICost) => {
                return { label: `${cost.name} - ${cost.lessonPrice} Р`, value: String(cost.id) };
            });

            setCostsValues(costsValues);
        });

        if (costStudentGroupId) {
            CostsService.getCostStudentGroup(costStudentGroupId).then(c => {
                const initialValues: { [p: string]: string } = {
                    [cost.name]: String(c.costId),
                };
                setInitialValues(initialValues);
            });
        }

        setLoading(false);
    }, []);

    function _handleSubmit(values: any, actions: any) {
        values.studentId = studentId;
        values.groupId = groupId;
        values.costStudentGroupId = costStudentGroupId;

        if (costStudentGroupId) {
            CostsService.updateCostStudentGroup(values).then(() => {
                navigate('/dashboard/students');
            });
        } else {
            CostsService.saveCostStudentGroup(values).then(() => {
                navigate('/dashboard/students');
            });
        }
    }

    return (
        <>
            {!loading ? (
                <>
                    <Formik enableReinitialize={true} initialValues={initialValues} onSubmit={_handleSubmit} validateOnChange>
                        {(formikProps: any) => {
                            return (
                                <Form id={formId}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={12}>
                                            <Typography>
                                                Ученик:{' '}
                                                <b>
                                                    {student?.lastName} {student?.firstName}
                                                </b>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <Typography>
                                                Группа: <b>{group?.name}</b>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <SelectField name={cost.name} label={cost.label} data={costsValues} fullWidth />
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <Button
                                                disabled={formikProps.isSubmitting}
                                                type='submit'
                                                variant='contained'
                                                color='primary'
                                                sx={{ marginTop: theme.spacing(3), marginLeft: theme.spacing(1) }}
                                            >
                                                Сохранить
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Form>
                            );
                        }}
                    </Formik>
                </>
            ) : null}
        </>
    );
};

export default AppendCostForm;
