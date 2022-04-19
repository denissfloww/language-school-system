import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import GroupGrid from './Grid';
import { selectGlobalState } from '../../redux/reducers/global/globalReducer';
import DashboardPage from '../../components/Pages/DashboardPage';

const GroupSettings = () => {
    const { isLoading } = useSelector(selectGlobalState);

    return (
        <>
            <DashboardPage title='Управление группами'>
                <Typography variant='h4' sx={{ mb: 6 }}>
                    Управление группами
                </Typography>

                {/*<Grid container spacing={3} justifyContent='center'>*/}
                <GroupGrid />
                {/*</Grid>*/}
            </DashboardPage>
        </>
    );
};

export default GroupSettings;
