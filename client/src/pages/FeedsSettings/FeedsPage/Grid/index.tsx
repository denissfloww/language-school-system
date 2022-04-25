import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import Table from '@mui/material/Table';
import { TableBody, TableCell } from '@mui/material';
import * as React from 'react';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFeedAction, fetchFeedsAction, selectFeedsState } from '../../../../redux/reducers/feeds/feedsReducer';
import { useEffect } from 'react';
import { IFeed } from '../../../../interfaces/IFeed';
import TableBodySkeleton from '../../../../components/Skeletons/TableBodySkeleton';
import moment from 'moment';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

const FeedsGrid = () => {
    const dispatch = useDispatch();
    const { isLoading, feedsData, page, rowsPerPage } = useSelector(selectFeedsState);
    const headerRows: { text: string; align: 'left' | 'center' | 'right' }[] = [
        {
            text: 'Код',
            align: 'left',
        },
        {
            text: 'Название',
            align: 'center',
        },
        {
            text: 'Описание',
            align: 'center',
        },
        {
            text: 'Дата добавления',
            align: 'center',
        },
        {
            text: 'Дата обновления',
            align: 'center',
        },
        {
            text: 'Действия',
            align: 'right',
        },
    ];

    const fetchFeedsData = () => {
        dispatch(fetchFeedsAction(page, rowsPerPage));
    };

    useEffect(() => {
        fetchFeedsData();
    }, [page, rowsPerPage]);

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 1000 }} aria-labelledby='tableTitle' size='medium'>
                            <TableHead>
                                <TableRow>
                                    {headerRows.map(value => (
                                        <>
                                            <TableCell align={value.align}>
                                                <b>{value.text}</b>
                                            </TableCell>
                                        </>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {!isLoading && feedsData ? (
                                    <>
                                        {feedsData.data.length ? (
                                            <>
                                                {feedsData.data.map((feed: IFeed) => (
                                                    <>
                                                        <TableRow key={feed.id}>
                                                            <TableCell component='th' scope='row' align='left'>
                                                                {feed.id}
                                                            </TableCell>
                                                            <TableCell component='th' scope='row' align='center'>
                                                                {feed.name}
                                                            </TableCell>
                                                            <TableCell component='th' scope='row' align='center'>
                                                                {feed.description}
                                                            </TableCell>
                                                            <TableCell component='th' scope='row' align='center'>
                                                                {moment(feed.createdAt).format('DD.MM.YYYY HH:mm:ss zz')}
                                                            </TableCell>
                                                            <TableCell component='th' scope='row' align='center'>
                                                                {moment(feed.updatedAt).format('DD.MM.YYYY HH:mm:ss zz')}
                                                            </TableCell>
                                                            <TableCell component='th' scope='row' align='right'>
                                                                <IconButton
                                                                    to={`/dashboard/settings/feeds/update/${feed.id}`}
                                                                    component={Link}
                                                                >
                                                                    <EditIcon />
                                                                </IconButton>
                                                                <IconButton
                                                                    onClick={() => {
                                                                        dispatch(deleteFeedAction(Number(feed.id)));
                                                                    }}
                                                                >
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </TableCell>
                                                        </TableRow>
                                                    </>
                                                ))}
                                            </>
                                        ) : (
                                            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                                                <TableCell key={4} component='th' scope='row' align='center'>
                                                    Отсутствуют данные
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </>
                                ) : (
                                    <TableBodySkeleton columnsCount={headerRows.length} />
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </>
    );
};

export default FeedsGrid;
