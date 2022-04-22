import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddCostButton from './Buttons/AddLanguageButton';

const CostGridToolbar = () => {
    return (
        <>
            <Toolbar>
                <Typography sx={{ flex: '1 1 100%' }} variant='h6' id='tableTitle' component='div'>
                    Тарифы
                </Typography>
                <AddCostButton />
            </Toolbar>
        </>
    );
};

export default CostGridToolbar;
