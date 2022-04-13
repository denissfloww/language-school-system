import * as React from 'react';
import { useEffect, useState } from 'react';
import { Step, StepLabel, Stepper, useTheme } from '@mui/material';
import { Formik, Form } from 'formik';
import formInitialValues from './FormModel/formInitialValues';
import { getCurrentValidation } from './FormModel/validationSchema';
import formModel from './FormModel/formModel';
import Button from '@mui/material/Button';
import UserInformationForm from './Forms/UserInformationForm';
import UserRolesForm from './Forms/UserRolesForm';
import CheckoutSuccess from './CreateSuccess/CreateSuccess';
import { useDispatch, useSelector } from 'react-redux';
import { createUserAction, selectUsersState, setValidationSchema } from '../../redux/reducers/users/usersReducer';
import CommonContactInformation from './Forms/CommonContactInformation';
import { RoleTypes } from '../../interfaces/IRole';
import StudentContactInformation from './Forms/StudentContactInformation';

const steps = ['Основные данные', 'Роли', 'Контактная информация'];
const { formId, formField } = formModel;

function _renderStepContent(step: number, props: any) {
    // const isStudent = props?.values?.roles?.some((value: { label: string; value: string }) => {
    //     return value.value == RoleTypes.Student;
    // });

    const isStudent = props?.values?.roles == RoleTypes.Student;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setValidationSchema(getCurrentValidation(isStudent)));
        console.log(isStudent);
    }, [isStudent]);

    switch (step) {
        case 0:
            return <UserInformationForm formField={formField} />;
        case 1:
            return <UserRolesForm formField={formField} />;
        case 2:
            if (isStudent) {
                return <StudentContactInformation formField={formField} />;
            }
            return <CommonContactInformation formField={formField} />;

        default:
            return <div>Not Found</div>;
    }
}

const CreateUserForm = () => {
    const [activeStep, setActiveStep] = useState(0);
    const { validationSchema } = useSelector(selectUsersState);
    const currentValidationSchema = validationSchema[activeStep];
    const isLastStep = activeStep === steps.length - 1;
    const dispatch = useDispatch();
    const theme = useTheme();

    function _sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function _submitForm(values: any, actions: any) {
        await _sleep(1000);

        const roles: RoleTypes[] = []
        roles.push(values?.roles);

        dispatch(
            createUserAction({
                firstName: values.firstName,
                lastName: values.lastName,
                middleName: values.middleName,
                roles: roles,
                phone: values.phone,
                email: values.email,
                parentEmail: values.parentEmail,
                parentLastName: values.parentLastName,
                parentMiddleName: values.parentMiddleName,
                parentName: values.parentName,
                parentPhone: values.parentPhone,
            }),
        );
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);

        setActiveStep(activeStep + 1);
    }

    function _handleSubmit(values: any, actions: any) {
        if (isLastStep) {
            console.log(values);
            _submitForm(values, actions);
        } else {
            setActiveStep(activeStep + 1);
            actions.setTouched({});
            actions.setSubmitting(false);
        }
    }

    function _handleBack() {
        setActiveStep(activeStep - 1);
    }

    const backToFirstForm = () => {
        setActiveStep(0);
    };

    return (
        <>
            <Stepper activeStep={activeStep}>
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div style={{ marginTop: '3%' }} />
            {activeStep === steps.length ? (
                <CheckoutSuccess handleBack={backToFirstForm} />
            ) : (
                <Formik initialValues={formInitialValues} validationSchema={currentValidationSchema} onSubmit={_handleSubmit}>
                    {props => (
                        <Form id={formId}>
                            {_renderStepContent(activeStep, props)}
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {activeStep !== 0 && (
                                    <Button onClick={_handleBack} sx={{ marginTop: theme.spacing(3), marginLeft: theme.spacing(1) }}>
                                        Назад
                                    </Button>
                                )}
                                <Button
                                    disabled={props.isSubmitting}
                                    type='submit'
                                    variant='contained'
                                    color='primary'
                                    sx={{ marginTop: theme.spacing(3), marginLeft: theme.spacing(1) }}
                                >
                                    {isLastStep ? 'Зарегистрировать' : 'Далее'}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            )}
        </>
    );
};

export default CreateUserForm;
