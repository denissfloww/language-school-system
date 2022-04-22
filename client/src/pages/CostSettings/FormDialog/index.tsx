import { ICost } from '../../../interfaces/ICost';
import formModel from './FormModel/formModel';
import { emptyInitialValues } from './FormModel/emptyInitialValues';
import validationSchema from './FormModel/validationSchema';
import { useEffect, useState } from 'react';
import { createOrUpdateLanguageAction } from '../../../redux/reducers/language/languageReducer';
import { useDispatch } from 'react-redux';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { Dialog } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import { Form, Formik } from 'formik';
import CostForm from './Form';
import { createOrUpdateCostAction } from '../../../redux/reducers/cost/costReducer';

interface ICostDialogFormProps {
    open: boolean;
    close: () => void;
    cost?: ICost;
}

const { formId, formField } = formModel;

const CostDialogForm = (props: ICostDialogFormProps) => {
    const { open, close, cost } = props;
    const dispatch = useDispatch();
    const [initValues, setInitValues] =
        useState<{ [p: string]: string | number | { label: string; value: number }[] | undefined }>(emptyInitialValues);

    function _handleSubmit(values: any, actions: any) {
        console.log(values);
        dispatch(createOrUpdateCostAction(values));
        close();
    }

    useEffect(() => {
        setExistInitialValues();
    }, []);

    const setExistInitialValues = () => {
        if (cost) {
            setInitValues({
                name: cost?.name,
                description: cost?.description ?? '',
                id: cost?.id,
                lessonPrice: cost?.lessonPrice ?? 0,
            });
        }
    };

    return (
        <Dialog open={open} onClose={close} fullWidth={true} maxWidth='sm'>
            <DialogTitle>{cost ? 'Изменение языка' : 'Добавление нового языка'}</DialogTitle>
            <Formik onSubmit={_handleSubmit} initialValues={initValues} validationSchema={validationSchema} validateOnChange>
                {({ isSubmitting }) => (
                    <Form id={formId}>
                        <DialogContent>
                            <CostForm formField={formField} />
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

export default CostDialogForm;
