import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import LanguageDialogForm from '../../FormDialog';

const AddLanguageButton = () => {
    const [openAddDialog, setOpenAddDialog] = useState(false);

    const showAddDialog = () => {
        setOpenAddDialog(true);
    };

    const closeAddDialog = () => {
        setOpenAddDialog(false);
    };
    return (
        <>
            <LanguageDialogForm open={openAddDialog} close={closeAddDialog} />
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

export default AddLanguageButton;
