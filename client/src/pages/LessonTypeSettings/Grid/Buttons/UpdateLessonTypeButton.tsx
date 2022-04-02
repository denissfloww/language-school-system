import LessonTypeDialogForm from '../../FormDialog';
import { useState } from 'react';
import { ILessonType } from '../../../../interfaces/ILessonType';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';

const UpdateLessonTypeButton = (props: { lessonType: ILessonType }) => {
    const { lessonType } = props;

    const [openDialog, setOpenDialog] = useState(false);

    const showLessonTypeDialog = () => {
        setOpenDialog(true);
    };

    const closeLessonTypeDialog = () => {
        setOpenDialog(false);
    };
    return (
        <>
            <LessonTypeDialogForm open={openDialog} close={closeLessonTypeDialog} lessonType={lessonType} />
            <Tooltip title='Изменить'>
                <IconButton
                    onClick={() => {
                        showLessonTypeDialog();
                    }}
                >
                    <EditIcon />
                </IconButton>
            </Tooltip>
        </>
    );
};

export default UpdateLessonTypeButton;
