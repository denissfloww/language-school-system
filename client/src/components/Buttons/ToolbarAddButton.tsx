import { ReactNode, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';

interface IProps {
    test: React.JSXElementConstructor<any>;
}

const ToolbarAddButton = (props: IProps) => {
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const { test } = props;

    const showAddDialog = () => {
        setOpenAddDialog(true);
    };

    const closeAddDialog = () => {
        setOpenAddDialog(false);
    };

    const DialogForm = test;

    return (
        <>
            <DialogForm open={openAddDialog} close={closeAddDialog} />

            <Tooltip title='Добавить'>
                <IconButton
                    onClick={() => {
                        closeAddDialog();
                    }}
                >
                    <AddIcon />
                </IconButton>
            </Tooltip>
        </>
    );
};

export default ToolbarAddButton;
