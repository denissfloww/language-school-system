import { Formik, Form } from 'formik';
import { useEffect, useState } from 'react';
import { emptyInitialValues } from './FormModel/emptyInitialValues';
import validationSchema from './FormModel/validationSchema';
import Grid from '@mui/material/Grid';
import InputField from '../../../../components/FormFields/InputField';
import { TextField, useTheme } from '@mui/material';
import * as React from 'react';
import Button from '@mui/material/Button';
import Editor from '../../Editor';
import { IFeed } from '../../../../interfaces/IFeed';
import { createOrUpdateFeedAction } from '../../../../redux/reducers/feeds/feedsReducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import formModel from './FormModel/formModel';

const { formId, formField } = formModel;

interface IFeedFormProps {
    feed?: IFeed;
}

const FeedForm = (props: IFeedFormProps) => {
    const { feed } = props;
    const { name, description, id } = formField;
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [initValues, setInitValues] = useState({ ...feed });
    const [editorValue, setEditorValue] = useState(feed?.data ?? '');

    function _handleSubmit(values: any, actions: any) {
        values.data = editorValue;
        dispatch(createOrUpdateFeedAction(values));
        navigate('/dashboard/settings/feeds');
    }

    return (
        <Formik onSubmit={_handleSubmit} initialValues={initValues} validationSchema={validationSchema} validateOnChange>
            {({ isSubmitting }) => (
                <Form id={formId}>
                    <Grid container>
                        <Grid item xs={12} sm={12}>
                            <InputField margin='dense' name={name.name} label={name.label} fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <InputField margin='dense' multiline maxRows={4} name={description.name} label={description.label} fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={12} sx={{ marginTop: 3 }}>
                            <Editor editorValue={editorValue} setEditorValue={setEditorValue} />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Button
                                disabled={isSubmitting}
                                type='submit'
                                variant='contained'
                                color='primary'
                                sx={{ marginTop: theme.spacing(3), marginLeft: theme.spacing(1) }}
                            >
                                Добавить
                            </Button>
                        </Grid>
                    </Grid>
                    <TextField name={id.name} type='hidden' style={{ display: 'none' }} />
                </Form>
            )}
        </Formik>
    );
};

export default FeedForm;
