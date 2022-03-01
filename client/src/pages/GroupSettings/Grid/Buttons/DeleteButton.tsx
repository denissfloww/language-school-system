import { useState } from 'react';
import ConfirmDialog from '../../../../components/ConfirmDialog';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteButton = (props: { groupId: number }) => {
    const { groupId } = props;
    const [openDeleteDialog, setOpenDeleteDialog] = useState({ isOpen: false, onConfirm: () => {} });

    const onDelete = (id: number) => {
        alert(`${id} delete`);
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
