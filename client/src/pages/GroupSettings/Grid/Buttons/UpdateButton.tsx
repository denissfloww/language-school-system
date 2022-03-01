import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import GroupDialogForm from '../../FormDialog';
import { useState } from 'react';

const UpdateButton = (props: { groupId: number }) => {
    const { groupId } = props;

    const [openAddDialog, setOpenAddDialog] = useState(false);

    const showAddGroupDialog = () => {
        setOpenAddDialog(true);
    };

    const closeAddGroupDialog = () => {
        setOpenAddDialog(false);
    };

    return (
        <>
            <GroupDialogForm open={openAddDialog} close={closeAddGroupDialog} groupId={groupId} />
            <Tooltip title='Изменить'>
                <IconButton
                    onClick={() => {
                        showAddGroupDialog();
                    }}
                >
                    <EditIcon />
                </IconButton>
            </Tooltip>
        </>
    );
};

export default UpdateButton;
