import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddLessonTypeButton from './Buttons/AddButton';

const LessonTypeGridToolbar = () => {
    return (
        <>
            <Toolbar>
                <Typography sx={{ flex: '1 1 100%' }} variant='h6' id='tableTitle' component='div'>
                    Типы занятий
                </Typography>
                <AddLessonTypeButton />
            </Toolbar>
        </>
    );
};

export default LessonTypeGridToolbar;
