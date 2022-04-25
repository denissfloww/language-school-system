import * as React from 'react';
import DashboardPage from '../../../components/Pages/DashboardPage';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeedByIdAction, selectFeedsState } from '../../../redux/reducers/feeds/feedsReducer';
import FeedForm from '../CreateFeedPage/Form';
import { useTheme } from '@mui/material';
import Paper from '@mui/material/Paper';

const UpdateFeedPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const theme = useTheme();
    useEffect(() => {
        dispatch(getFeedByIdAction(Number(id)));
    }, [id]);
    const { feed } = useSelector(selectFeedsState);

    return (
        <>
            <DashboardPage title='Изменение объявления'>
                <Typography variant='h4' sx={{ mb: 6 }}>
                    Изменение объявления
                </Typography>
                <Paper
                    sx={{
                        backgroundColor: theme.palette.background.paper,
                        flexGrow: 1,
                        height: '100%',
                        padding: 4,
                        overflow: 'auto',
                    }}
                >
                    {feed ? <FeedForm feed={feed} /> : null}
                </Paper>
            </DashboardPage>
        </>
    );
};

export default UpdateFeedPage;
