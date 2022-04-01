import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { Form, Formik } from 'formik';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import LessonTypeForm from './Form';
import formModel from './FormModel/formModel';
import { emptyInitialValues } from './FormModel/emptyInitialValues';
import validationSchema from './FormModel/validationSchema';
import {useDispatch, useSelector} from "react-redux";
import {
    createLessonTypes,
    fetchLessonTypes,
    selectLessonTypesState
} from "../../../redux/reducers/lessonTypes/lessonTypesReducer";

interface ILessonTypeDialogFormProps {
    open: boolean;
    close: () => void;
}

const { formId, formField } = formModel;

const LessonTypeDialogForm = (props: ILessonTypeDialogFormProps) => {
    const { open, close } = props;
    const dispatch = useDispatch();
    const { page, rowsPerPage } = useSelector(selectLessonTypesState)
    const [initValues, setInitValues] =
        useState<{ [p: string]: string | number | { label: string; value: number }[] | undefined }>(emptyInitialValues);

    function _handleSubmit(values: any, actions: any) {
        console.log(values);
        dispatch(createLessonTypes(values))
        dispatch(fetchLessonTypes(page, rowsPerPage))
        close();
    }

    useEffect(() => {
        setExistInitialValues();
    }, []);
    const setExistInitialValues = () => {
        // setInitValues({
        //     name: group?.name.toString(),
        //     desc: group?.description?.toString(),
        //     students: studentsViews,
        //     id: group?.id,
        //     teacher: String(group?.teacher.id),
        // });
    };
    return (
        <Dialog open={open} onClose={close} fullWidth={true} maxWidth='sm'>
            {/*<DialogTitle>{group ? 'Изменение данных группы' : 'Добавление новой группы'}</DialogTitle>*/}
            <DialogTitle>{'Добавление нового типа занятия'}</DialogTitle>
            <Formik onSubmit={_handleSubmit} initialValues={initValues} validationSchema={validationSchema} validateOnChange>
                {({ isSubmitting }) => (
                    <Form id={formId}>
                        <DialogContent>
                            <LessonTypeForm formField={formField} />
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

export default LessonTypeDialogForm;
