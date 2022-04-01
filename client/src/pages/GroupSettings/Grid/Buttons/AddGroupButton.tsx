import { useState } from 'react';
import GroupDialogForm from '../../FormDialog';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';

const AddGroupButton = () => {
    const [openAddDialog, setOpenAddDialog] = useState(false);

    const showAddGroupDialog = () => {
        setOpenAddDialog(true);
    };

    const closeAddGroupDialog = () => {
        setOpenAddDialog(false);
    };

    return (
        <>
            <GroupDialogForm open={openAddDialog} close={closeAddGroupDialog} />
            <Tooltip title='Добавить'>
                <IconButton
                    onClick={() => {
                        showAddGroupDialog();
                    }}
                >
                    <AddIcon />
                </IconButton>
            </Tooltip>
        </>
    );
};

export default AddGroupButton;
