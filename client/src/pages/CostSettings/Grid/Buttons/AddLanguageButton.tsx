import { useState } from 'react';
import CostDialogForm from '../../FormDialog';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';

const AddCostButton = () => {
    const [openAddDialog, setOpenAddDialog] = useState(false);

    const showAddDialog = () => {
        setOpenAddDialog(true);
    };

    const closeAddDialog = () => {
        setOpenAddDialog(false);
    };
    return (
        <>
            <CostDialogForm open={openAddDialog} close={closeAddDialog} />
            <Tooltip title='Добавить'>
                <IconButton
                    onClick={() => {
                        showAddDialog();
                    }}
                >
                    <AddIcon />
                </IconButton>
            </Tooltip>
        </>
    );
};

export default AddCostButton;
