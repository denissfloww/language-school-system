import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import LanguageDialogForm from '../../FormDialog';
import { ILanguage } from '../../../../interfaces/ILanguage';

const UpdateLanguageButton = (props: { language: ILanguage }) => {
    const { language } = props;

    const [openDialog, setOpenAddDialog] = useState(false);

    const showDialog = () => {
        setOpenAddDialog(true);
    };

    const closeDialog = () => {
        setOpenAddDialog(false);
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
