import { ICost } from '../../../../interfaces/ICost';
import { useState } from 'react';
import CostDialogForm from '../../FormDialog';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

const UpdateCostButton = (props: { cost: ICost }) => {
    const { cost } = props;

    const [openDialog, setOpenDialog] = useState(false);

    const showDialog = () => {
        setOpenDialog(true);
    };

    const closeDialog = () => {
        setOpenDialog(false);
    };
    return (
        <>
            <CostDialogForm open={openDialog} close={closeDialog} cost={cost} />
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

export default UpdateCostButton;
