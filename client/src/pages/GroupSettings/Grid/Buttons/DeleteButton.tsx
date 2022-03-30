import { useState } from 'react';
import ConfirmDialog from '../../../../components/ConfirmDialog';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { deleteGroup, fetchGroups, selectGroupsState } from '../../../../redux/reducers/groups/groupsReducer';

const DeleteButton = (props: { groupId: number }) => {
    const { groupId } = props;
    const dispatch = useDispatch();
    const [openDeleteDialog, setOpenDeleteDialog] = useState({ isOpen: false, onConfirm: () => {} });
    const { page, rowsPerPage } = useSelector(selectGroupsState);

    const onDelete = (id: number) => {
        dispatch(deleteGroup(id));
        dispatch(fetchGroups(page, rowsPerPage));
    };

    return (
        <>
            <ConfirmDialog title='Удалить группу?' confirmDialogConfig={openDeleteDialog} setConfirmDialogConfig={setOpenDeleteDialog}>
                Вы действительно хотите удалить группу?
            </ConfirmDialog>
            <Tooltip title='Удалить'>
                <IconButton
                    onClick={() =>
                        setOpenDeleteDialog({
                            isOpen: true,
                            onConfirm: () => {
                                onDelete(groupId);
                            },
                        })
                    }
                >
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        </>
    );
};

export default DeleteButton;
