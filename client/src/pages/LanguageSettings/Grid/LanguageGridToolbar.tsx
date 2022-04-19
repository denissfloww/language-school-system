import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddLanguageButton from './Buttons/AddLanguageButton';

const LanguageGridToolbar = () => {
    return (
        <>
            <Toolbar>
                <Typography sx={{ flex: '1 1 100%' }} variant='h6' id='tableTitle' component='div'>
                    Языки
                </Typography>
                <AddLanguageButton />
            </Toolbar>
        </>
    );
};

export default LanguageGridToolbar;
