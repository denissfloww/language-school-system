import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import GroupDialogForm from '../../FormDialog';
import { useState } from 'react';

const UpdateGroupButton = (props: { groupId: number }) => {
    const { groupId } = props;

    const [openDialog, setOpenDialog] = useState(false);

    const showGroupDialog = () => {
        setOpenDialog(true);
    };

    const closeGroupDialog = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <GroupDialogForm open={openDialog} close={closeGroupDialog} groupId={groupId} />
            <Tooltip title='Изменить'>
                <IconButton
                    onClick={() => {
                        showGroupDialog();
                    }}
                >
                    <EditIcon />
                </IconButton>
            </Tooltip>
        </>
    );
};

export default UpdateGroupButton;
