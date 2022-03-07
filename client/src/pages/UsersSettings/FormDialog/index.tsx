import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { Dialog } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Formik, Form } from 'formik';
import formModel from '../FormDialog/FormModel/formModel';
import UserForm from './Form';

interface IUserDialogFormProps {
    open: boolean;
    close: () => void;
    userId: number;
}

const { formId, formField } = formModel;

const UserDialogForm = (props: IUserDialogFormProps) => {
    const { open, close, userId } = props;

    function _handleSubmit(values: any, actions: any) {
        console.log(values);
        close();
    }

    const initialValues = {
        firstName: '',
        middleName: '',
        lastName: '',
        id: userId,
    };

    return (
        <Dialog open={open} onClose={close} fullWidth={true} maxWidth='sm'>
            <DialogTitle>{'Изменение данных пользователя'}</DialogTitle>
            <Formik onSubmit={_handleSubmit} validateOnChange initialValues={initialValues}>
                {({ isSubmitting }) => (
                    <Form id={formId}>
                        <DialogContent>
                            <UserForm formField={formField} />
                        </DialogContent>
                        <DialogActions>
                            <Button type='submit' color='primary'>
                                Ок
                            </Button>
                            <Button onClick={close} color='secondary'>
                                Отмена
                            </Button>
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
};

export default UserDialogForm;
