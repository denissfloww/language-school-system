import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import * as React from 'react';
import GroupForm from './Form';
import { Formik, Form } from 'formik';
import formModel from './FormModel/formModel';
import validationSchema from './FormModel/validationSchema';
import { useDispatch, useSelector } from 'react-redux';
import { createOrUpdateGroup, fetchGroups, selectGroupsState } from '../../../redux/reducers/groups/groupsReducer';
import { emptyInitialValues } from './FormModel/emptyInitialValues';
import { useEffect, useState } from 'react';
import { IGroup } from '../../../interfaces/IGroup';

interface IGroupDialogFormProps {
    open: boolean;
    close: () => void;
    group?: IGroup;
}

const { formId, formField } = formModel;

const GroupDialogForm = (props: IGroupDialogFormProps) => {
    const { open, close, group } = props;
    const dispatch = useDispatch();
    const { page, rowsPerPage } = useSelector(selectGroupsState);

    const [initValues, setInitValues] =
        useState<{ [p: string]: string | number | { label: string; value: number }[] | undefined }>(emptyInitialValues);

    function _handleSubmit(values: any, actions: any) {
        dispatch(createOrUpdateGroup(values));
        dispatch(fetchGroups(page, rowsPerPage));
        close();
    }

    useEffect(() => {
        setExistInitialValues();
    }, []);

    const setExistInitialValues = () => {
        const studentsViews = group?.students?.map(stud => {
            return { label: `${stud.lastName} ${stud.firstName}`, value: stud.id };
        });

        setInitValues({
            name: group?.name.toString(),
            desc: group?.description?.toString(),
            students: studentsViews,
            id: group?.id,
            teacher: String(group?.teacher.id),
        });
    };

    return (
        <Dialog open={open} onClose={close} fullWidth={true} maxWidth='sm'>
            <DialogTitle>{group ? 'Изменение данных группы' : 'Добавление новой группы'}</DialogTitle>
            <Formik onSubmit={_handleSubmit} initialValues={initValues} validationSchema={validationSchema} validateOnChange>
                {({ isSubmitting }) => (
                    <Form id={formId}>
                        <DialogContent>
                            <GroupForm formField={formField} />
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

export default GroupDialogForm;
