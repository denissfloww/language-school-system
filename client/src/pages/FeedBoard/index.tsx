import DashboardPage from '../../components/Pages/DashboardPage';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import Paper from '@mui/material/Paper';
import FeedCard from './FeedCard';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.snow.css';
import Grid from '@mui/material/Grid';
import { IFeed } from '../../interfaces/IFeed';
import FeedService from '../../services/FeedService';
import moment from 'moment';
import { Order } from '../../services/types';

const FeedBoardPage = () => {
    const theme = useTheme();

    const [feeds, setFeeds] = useState<IFeed[] | null>(null);

    useEffect(() => {
        FeedService.getFeeds(undefined, undefined, Order.DESC).then(response => setFeeds(response.data));
        console.log(feeds);
    }, []);

    return (
        <>
            <DashboardPage title='Доска объявлений'>
                <Typography variant='h4' sx={{ mb: 3 }}>
                    Доска объявлений
                </Typography>
                {feeds?.map(feed => (
                    <>
                        <Paper
                            sx={{
                                backgroundColor: theme.palette.background.paper,
                                height: '100%',
                                padding: 2,
                                overflow: 'auto',
                                mt: 3,
                            }}
                        >
                            <Grid container>
                                <Grid item md={6} xs={6} lg={6} sx={{ textAlign: 'left' }}>
                                    <Typography variant='h6'>{feed.name}</Typography>
                                </Grid>
                                <Grid item md={6} xs={6} lg={6} sx={{ textAlign: 'right' }}>
                                    <Typography variant='subtitle1'>
                                        {feed.createdUser?.lastName} {feed.createdUser?.firstName[0]}
                                    </Typography>
                                    <Typography variant='subtitle2' color='text.secondary'>
                                        {moment(feed.createdAt).format('DD.MM.YYYY')}
                                    </Typography>
                                </Grid>
                                <Grid item md={12} xs={12} lg={12}>
                                    <FeedCard content={feed.data} />
                                </Grid>
                            </Grid>
                        </Paper>
                    </>
                ))}
            </DashboardPage>
        </>
    );
};

export default FeedBoardPage;
