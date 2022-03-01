import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { ReactNode } from 'react';

interface IConfirmDialogProps {
    title: string;
    confirmDialogConfig: {
        isOpen: boolean;
        onConfirm: () => void;
    };
    children: ReactNode;
    setConfirmDialogConfig: React.Dispatch<React.SetStateAction<{ isOpen: boolean; onConfirm: () => void }>>;
}

const ConfirmDialog = (props: IConfirmDialogProps) => {
    const { title, children, confirmDialogConfig, setConfirmDialogConfig } = props;
    return (
        <Dialog
            open={confirmDialogConfig.isOpen}
            onClose={() => setConfirmDialogConfig({ ...confirmDialogConfig, isOpen: false })}
            aria-labelledby='confirm-dialog'
        >
            <DialogTitle id='confirm-dialog'>{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button onClick={() => setConfirmDialogConfig({ ...confirmDialogConfig, isOpen: false })} color='secondary'>
                    Нет
                </Button>
                <Button
                    onClick={() => {
                        setConfirmDialogConfig({ ...confirmDialogConfig, isOpen: false });
                        confirmDialogConfig.onConfirm();
                    }}
                    color='primary'
                >
                    Да
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default ConfirmDialog;
