import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import GroupDialogForm from '../../FormDialog';
import { useState } from 'react';
import { IGroup } from '../../../../interfaces/IGroup';

const UpdateGroupButton = (props: { group: IGroup }) => {
    const { group } = props;

    const [openDialog, setOpenDialog] = useState(false);

    const showGroupDialog = () => {
        setOpenDialog(true);
    };

    const closeGroupDialog = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <GroupDialogForm open={openDialog} close={closeGroupDialog} group={group} />

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
