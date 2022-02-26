import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import * as React from 'react';
import AddGroupForm from './AddGroupForm';
import { Formik, Form } from 'formik';
import formModel from './FormModel/formModel';
import initialValues from './FormModel/initialValues';
import validationSchema from './FormModel/validationSchema'

interface IAddGroupDialogProps {
    open: boolean;
    close: () => void;
}

const { formId, formField } = formModel;

const AddGroupDialog = (props: IAddGroupDialogProps) => {
    const { open, close } = props;

    function _handleSubmit(values: any, actions: any) {
        alert(JSON.stringify(values, null, 2));
        close();
    }

    return (
        <Dialog open={open} onClose={close} fullWidth={true} maxWidth='sm'>
            <DialogTitle>{'Добавление новой группы'}</DialogTitle>
            <Formik onSubmit={_handleSubmit} initialValues={initialValues} validationSchema={validationSchema} validateOnChange>
                {({ isSubmitting }) => (
                    <Form id={formId}>
                        <DialogContent>
                            <AddGroupForm formField={formField} />
                        </DialogContent>
                        <DialogActions>
                            <Button type='submit' color='primary'>Ок</Button>
                            <Button onClick={close} color='secondary'>Отмена</Button>
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
};

export default AddGroupDialog;
