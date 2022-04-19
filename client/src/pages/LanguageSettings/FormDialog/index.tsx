import { ILanguage } from '../../../interfaces/ILanguage';
import formModel from './FormModel/formModel';
import { emptyInitialValues } from './FormModel/emptyInitialValues';
import validationSchema from './FormModel/validationSchema';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { Dialog } from '@mui/material';
import { Form, Formik } from 'formik';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import LanguageForm from './Form';
import { useDispatch } from 'react-redux';
import { createOrUpdateLanguageAction } from '../../../redux/reducers/language/languageReducer';

interface ILanguageDialogFormProps {
    open: boolean;
    close: () => void;
    language?: ILanguage;
}

const { formId, formField } = formModel;

const LanguageDialogForm = (props: ILanguageDialogFormProps) => {
    const { open, close, language } = props;
    const dispatch = useDispatch();
    const [initValues, setInitValues] =
        useState<{ [p: string]: string | number | { label: string; value: number }[] | undefined }>(emptyInitialValues);

    function _handleSubmit(values: any, actions: any) {
        console.log(values);
        dispatch(createOrUpdateLanguageAction(values));
        close();
    }

    useEffect(() => {
        setExistInitialValues();
    }, []);
    const setExistInitialValues = () => {
        if (language) {
            setInitValues({
                name: language?.name,
                description: language?.description ?? '',
                id: language?.id,
            });
        }
    };

    return (
        <Dialog open={open} onClose={close} fullWidth={true} maxWidth='sm'>
            <DialogTitle>{language ? 'Изменение языка' : 'Добавление нового языка'}</DialogTitle>
            <Formik onSubmit={_handleSubmit} initialValues={initValues} validationSchema={validationSchema} validateOnChange>
                {({ isSubmitting }) => (
                    <Form id={formId}>
                        <DialogContent>
                            <LanguageForm formField={formField} />
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

export default LanguageDialogForm;
