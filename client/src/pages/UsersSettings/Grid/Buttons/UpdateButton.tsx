import { useState } from 'react';
import UserDialogForm from '../../FormDialog';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

const UpdateUserButton = (props: { userId: number }) => {
    const { userId } = props;

    const [openDialog, setOpenDialog] = useState(false);

    const showUserDialog = () => {
        setOpenDialog(true);
    };

    const closeUserDialog = () => {
        setOpenDialog(false);
    };
    return (
        <>
            <UserDialogForm open={openDialog} close={closeUserDialog} userId={userId} />
            <Tooltip title='Изменить'>
                <IconButton
                    onClick={() => {
                        showUserDialog();
                    }}
                >
                    <EditIcon />
                </IconButton>
            </Tooltip>
        </>
    );
};

export default UpdateUserButton;
