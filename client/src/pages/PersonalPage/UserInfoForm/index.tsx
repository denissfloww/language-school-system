import { Formik, Form } from 'formik';
import formModel from './FormModel/formModel';
import Button from '@mui/material/Button';
import * as React from 'react';
import { useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import InputField from '../../../components/FormFields/InputField';
import { RoleTypes } from '../../../interfaces/IRole';
import {useDispatch, useSelector} from 'react-redux';
import { selectAuthState } from '../../../redux/reducers/auth/authReducer';
import Typography from "@mui/material/Typography";
import PhoneMask from "../../../components/InputMasks/PhoneMask";
import {useEffect} from "react";
import {selectProfileState, setUserInfoValidation} from "../../../redux/reducers/profile/profileReducer";
import {getValidationUserInfoForm} from "./FormModel/validationSchema";

const { formId, formField } = formModel;

const UserInfoForm = () => {
    const { lastName, firstName, middleName, age, parentPhone,email,phone, parentName, parentMiddleName, parentLastName, parentEmail } = formField;
    const theme = useTheme();
    const dispatch = useDispatch();
    function _handleSubmit(values: any, actions: any) {
        console.log(values);
    }

    const { user } = useSelector(selectAuthState);
    const {validationSchema} = useSelector(selectProfileState);
    const formInitialValues = {};
    console.log(validationSchema)
    const isStudent = user?.roles?.some(role => role.name == RoleTypes.Student);
    useEffect(() => {
        dispatch(setUserInfoValidation(getValidationUserInfoForm(Boolean(isStudent))))
    }, [isStudent])

    return (
        <>
            <Formik initialValues={formInitialValues} validationSchema={validationSchema} onSubmit={_handleSubmit}>
                {props => (
                    <Form id={formId}>
                        <Grid container spacing={3} style={{ textAlign: 'center' }}>
                            <Grid item xs={12} md={6}>
                                <InputField variant='outlined' name={lastName.name} label={lastName.label} fullWidth />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputField name={firstName.name} label={firstName.label} fullWidth />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputField name={middleName.name} label={middleName.label} fullWidth />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputField
                                    name={age.name}
                                    label={age.label}
                                    fullWidth
                                    type='number'
                                    InputProps={{ inputProps: { min: 0, max: 200 } }}
                                />
                            </Grid>
                            {isStudent? (
                                <>
                                    <Grid item xs={12} md={6}>
                                        <InputField name={parentName.name} label={parentName.label} fullWidth />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <InputField name={parentMiddleName.name} label={parentMiddleName.label} fullWidth />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <InputField name={parentLastName.name} label={parentLastName.label} fullWidth />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <InputField name={parentEmail.name} label={parentEmail.label} fullWidth />
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <Typography variant='subtitle1' gutterBottom>
                                            {parentPhone.label}
                                        </Typography>
                                        <InputField
                                            name={parentPhone.name}
                                            InputProps={{
                                                inputComponent: PhoneMask as any,
                                            }}
                                        />
                                    </Grid>
                                </>
                            ) :(<>
                                <Grid item xs={12} md={6}>
                                    <InputField name={email.name} label={email.label} fullWidth />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InputField
                                        fullWidth
                                        name={phone.name}
                                        InputProps={{
                                            inputComponent: PhoneMask as any,
                                        }}
                                    />
                                </Grid>
                            </>)}

                        </Grid>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                disabled={props.isSubmitting}
                                type='submit'
                                variant='contained'
                                color='primary'
                                sx={{ marginTop: theme.spacing(3), marginLeft: theme.spacing(1) }}
                            >
                                Изменить
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default UserInfoForm;
