import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddGroupButton from './Buttons/AddGroupButton';

const GroupGridToolbar = () => {
    return (
        <>
            <Toolbar>
                <Typography sx={{ flex: '1 1 100%' }} variant='h6' id='tableTitle' component='div'>
                    Учебные группы
                </Typography>
                <AddGroupButton />
            </Toolbar>
        </>
    );
};

export default GroupGridToolbar;
