import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import LanguageDialogForm from '../../FormDialog';
import { ILanguage } from '../../../../interfaces/ILanguage';

const UpdateLanguageButton = (props: { language: ILanguage }) => {
    const { language } = props;

    const [openDialog, setOpenDialog] = useState(false);

    const showDialog = () => {
      setOpenDialog(true);
    };

    const closeDialog = () => {
      setOpenDialog(false);
    };
    return (
        <>
            <LanguageDialogForm open={openDialog} close={closeDialog} language={language} />
            <Tooltip title='Изменить'>
                <IconButton
                    onClick={() => {
                        showDialog();
                    }}
                >
                    <EditIcon />
                </IconButton>
            </Tooltip>
        </>
    );
};

export default UpdateLanguageButton;
