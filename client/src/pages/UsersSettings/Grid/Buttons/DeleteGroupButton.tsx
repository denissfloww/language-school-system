import ConfirmDialog from '../../../../components/ConfirmDialog';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

const DeleteGroupButton = (props: { userId: number }) => {
    const { userId } = props;
    const [openDeleteDialog, setOpenDeleteDialog] = useState({ isOpen: false, onConfirm: () => {} });

    const onDelete = (id: number) => {
        alert(`${id} delete`);
    };
    return (
        <>
            <ConfirmDialog
                title='Удалить пользователя?'
                confirmDialogConfig={openDeleteDialog}
                setConfirmDialogConfig={setOpenDeleteDialog}
            >
                Вы действительно хотите удалить пользователя?
            </ConfirmDialog>
            <Tooltip title='Удалить'>
                <IconButton
                    onClick={() =>
                        setOpenDeleteDialog({
                            isOpen: true,
                            onConfirm: () => {
                                onDelete(userId);
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

export default DeleteGroupButton;
