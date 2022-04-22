import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { TableCell } from '@mui/material';
import * as React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import LanguageGridToolbar from './LanguageGridToolbar';
import { useDispatch, useSelector } from 'react-redux';
import {
    deleteLanguageAction,
    fetchLanguagesAction,
    selectLanguagesState,
    setPage,
    setRowsPerPage,
} from '../../../redux/reducers/language/languageReducer';
import { useEffect } from 'react';
import TableBody from '@mui/material/TableBody';
import TableBodySkeleton from '../../../components/Skeletons/TableBodySkeleton';
import { ILanguage } from '../../../interfaces/ILanguage';
import TablePagination from '@mui/material/TablePagination';
import DeleteButton from '../../../components/Buttons/DeleteButton';
import UpdateLanguageButton from './Buttons/UpdateLanguageButton';

const LanguageGrid = () => {
    const dispatch = useDispatch();
    const { isLoading, languagesData, page, rowsPerPage } = useSelector(selectLanguagesState);
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
            text: 'Действия',
            align: 'right',
        },
    ];

    const fetchLanguagesData = () => {
        dispatch(fetchLanguagesAction(page, rowsPerPage));
    };

    useEffect(() => {
        fetchLanguagesData();
    }, [page, rowsPerPage]);

    const handleChangePage = (event: unknown, newPage: number) => {
        dispatch(setPage(newPage));
        fetchLanguagesData();
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
        dispatch(setPage(0));
        fetchLanguagesData();
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <LanguageGridToolbar />
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
                            {!isLoading && languagesData ? (
                                <>
                                    {languagesData.data.length ? (
                                        <>
                                            {languagesData.data.map((language: ILanguage) => (
                                                <>
                                                    <TableRow key={language.id}>
                                                        <TableCell component='th' scope='row' align='left'>
                                                            {language.id}
                                                        </TableCell>
                                                        <TableCell component='th' scope='row' align='center'>
                                                            {language.name}
                                                        </TableCell>
                                                        <TableCell component='th' scope='row' align='center'>
                                                            {language.description}
                                                        </TableCell>
                                                        <TableCell component='th' scope='row' align='right'>
                                                            <UpdateLanguageButton language={language} />
                                                            <DeleteButton
                                                                id={language.id}
                                                                title='Удалить язык?'
                                                                confirmationText='Вы действительно хотите удалить язык? Удалятся все группы с данным языком'
                                                                onDeleteMethod={() => {
                                                                    dispatch(deleteLanguageAction(language.id));
                                                                }}
                                                            />
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
                    {languagesData ? (
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 15]}
                            component='div'
                            count={languagesData?.meta.itemCount}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    ) : null}
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default LanguageGrid;
