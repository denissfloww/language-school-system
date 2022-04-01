import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import LessonTypeDialogForm from '../../FormDialog';

const AddLessonTypeButton = () => {
    const [openAddDialog, setOpenAddDialog] = useState(false);

    const showAddLessonTypeDialog = () => {
        setOpenAddDialog(true);
    };

    const closeAddLessonTypeDialog = () => {
        setOpenAddDialog(false);
    };

    return (
        <>
            <LessonTypeDialogForm open={openAddDialog} close={closeAddLessonTypeDialog} />

            <Tooltip title='Добавить'>
                <IconButton
                    onClick={() => {
                        showAddLessonTypeDialog();
                    }}
                >
                    <AddIcon />
                </IconButton>
            </Tooltip>
        </>
    );
};

export default AddLessonTypeButton;
