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
import { createOrUpdateGroup, fetchGroupById, fetchGroups, selectGroupsState } from '../../../redux/reducers/groups/groupsReducer';
import { emptyInitialValues } from './FormModel/emptyInitialValues';
import { IStudent } from '../../../interfaces/IStudent';
import { useEffect } from 'react';

interface IGroupDialogFormProps {
    open: boolean;
    close: () => void;
    groupId?: number;
}

const { formId, formField } = formModel;

const GroupDialogForm = (props: IGroupDialogFormProps) => {
    const { open, close, groupId } = props;
    const dispatch = useDispatch();

    function _handleSubmit(values: any, actions: any) {
        console.log(values)
        dispatch(createOrUpdateGroup(values));
        dispatch(fetchGroups());
        close();
    }

    const loadGroup = (groupId: number) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            dispatch(fetchGroupById(groupId));
        }, []);
    };

    const setExistInitialValues = () => {
        const studentsViews = currentGroup?.students?.map((student: IStudent) => {
            return { label: student.firstName, value: student.id };
        });
        initVal = { name: currentGroup?.name.toString(), desc: currentGroup?.desc?.toString(), students: studentsViews, id: currentGroup?.id };
    };

    const { currentGroup } = useSelector(selectGroupsState);

    let initVal = emptyInitialValues;

    if (groupId) {
        loadGroup(groupId);
        setExistInitialValues();
    }

    return (
        <Dialog open={open} onClose={close} fullWidth={true} maxWidth='sm'>
            <DialogTitle>{'Добавление новой группы'}</DialogTitle>
            <Formik onSubmit={_handleSubmit} initialValues={initVal} validationSchema={validationSchema} validateOnChange>
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
