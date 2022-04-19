import ConfirmDialog from '../ConfirmDialog';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

interface IDeleteButtonProps {
    id: number;
    title: string;
    confirmationText: string;
    onDeleteMethod: () => void;
}

const DeleteButton = (props: IDeleteButtonProps) => {
    const { onDeleteMethod, title, confirmationText } = props;

    const [openDeleteDialog, setOpenDeleteDialog] = useState({ isOpen: false, onConfirm: () => {} });

    return (
        <>
            <>
                <ConfirmDialog title={title} confirmDialogConfig={openDeleteDialog} setConfirmDialogConfig={setOpenDeleteDialog}>
                    {confirmationText}
                </ConfirmDialog>
                <Tooltip title='Удалить'>
                    <IconButton
                        onClick={() =>
                            setOpenDeleteDialog({
                                isOpen: true,
                                onConfirm: () => {
                                    onDeleteMethod();
                                },
                            })
                        }
                    >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </>
        </>
    );
};

export default DeleteButton;
