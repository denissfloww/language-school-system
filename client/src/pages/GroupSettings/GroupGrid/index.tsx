import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import { alpha, TableCell } from '@mui/material';
import Table from '@mui/material/Table';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import PeopleIcon from '@mui/icons-material/People';
import Tooltip from '@mui/material/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups, selectGroupsState } from '../../../redux/reducers/groupsReducer';
import { useEffect } from 'react';
import { IGroup } from '../../../interfaces/IGroup';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import AddGroupDialog from '../AddGroupDialog';

const GridToolbar = () => {
    const [openAddDialog, setOpenAddDialog] = React.useState(false);

    const showAddGroupDialog = () => {
        setOpenAddDialog(true);
    };

    const closeAddGroupDialog = () => {
        setOpenAddDialog(false);
    };

    return (
        <>
            <Toolbar>
                <Typography sx={{ flex: '1 1 100%' }} variant='h6' id='tableTitle' component='div'>
                    Учебные группы
                </Typography>
                <Tooltip title='Добавить'>
                    <IconButton
                        onClick={() => {
                            showAddGroupDialog();
                        }}
                    >
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            </Toolbar>
            <AddGroupDialog open={openAddDialog} close={closeAddGroupDialog} />
        </>
    );
};

const GroupGrid = () => {
    const dispatch = useDispatch();
    const { groups } = useSelector(selectGroupsState);

    useEffect(() => {
        dispatch(fetchGroups());
    }, []);

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <GridToolbar />
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 1000 }} aria-labelledby='tableTitle' size='medium'>
                            <TableHead>
                                <TableRow>
                                    <TableCell align='left'>Код</TableCell>
                                    <TableCell align='center'>Название</TableCell>
                                    <TableCell align='center'>Количество</TableCell>
                                    <TableCell align='center'>Описание</TableCell>
                                    <TableCell align='right'>Действия</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {groups.map((group: IGroup) => (
                                    <TableRow key={group.id} sx={{ '& > *': { borderBottom: 'unset' } }}>
                                        <TableCell component='th' scope='row'>
                                            {group.id}
                                        </TableCell>
                                        <TableCell component='th' scope='row' align='center'>
                                            {group.name}
                                        </TableCell>
                                        <TableCell align='center'>{group.name}</TableCell>
                                        <TableCell align='center'>{group.desc}</TableCell>
                                        <TableCell align='right'>
                                            <Tooltip title='Ученики'>
                                                <IconButton>
                                                    <PeopleIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title='Изменить'>
                                                <IconButton>
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title='Удалить'>
                                                <IconButton>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </>
    );
};

export default GroupGrid;
// import * as React from 'react';
// import { alpha } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import TableSortLabel from '@mui/material/TableSortLabel';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import Checkbox from '@mui/material/Checkbox';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import Button from '@mui/material/Button';
// import { visuallyHidden } from '@mui/utils';
//
// interface Data {
//     id: number;
//     name: string;
//     countStudents: number;
// }
//
// function createData(id: number, name: string, countStudents: number): Data {
//     return {
//         id,
//         name,
//         countStudents,
//     };
// }
//
// const rows = [
//     createData(1, '1Группа', 3),
//     createData(2, '2Группа', 3),
//     createData(3, '3Группа', 3),
//     createData(4, '4Группа', 3),
//     createData(5, '5Группа', 3),
//     createData(6, '6Группа', 3),
//     createData(7, '7Группа', 3),
//     createData(8, '8Группа', 3),
// ];
//
// function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
//     if (b[orderBy] < a[orderBy]) {
//         return -1;
//     }
//     if (b[orderBy] > a[orderBy]) {
//         return 1;
//     }
//     return 0;
// }
//
// type Order = 'asc' | 'desc';
//
// function getComparator<Key extends keyof any>(
//     order: Order,
//     orderBy: Key,
// ): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
//     return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
// }
//
// function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
//     const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
//     stabilizedThis.sort((a, b) => {
//         const order = comparator(a[0], b[0]);
//         if (order !== 0) {
//             return order;
//         }
//         return a[1] - b[1];
//     });
//     return stabilizedThis.map(el => el[0]);
// }
//
// interface HeadCell {
//     id: keyof Data;
//     label: string;
//     numeric: boolean;
//     disablePadding: boolean;
// }
//
// const headCells: readonly HeadCell[] = [
//     {
//         id: 'id',
//         numeric: true,
//         disablePadding: true,
//         label: 'Код группы',
//     },
//     {
//         id: 'name',
//         numeric: false,
//         disablePadding: false,
//         label: 'Название',
//     },
//     {
//         id: 'countStudents',
//         numeric: true,
//         disablePadding: false,
//         label: 'Кол-во студентов',
//     },
// ];
//
// interface EnhancedTableProps {
//     numSelected: number;
//     onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
//     onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
//     order: Order;
//     orderBy: string;
//     rowCount: number;
// }
//
// function EnhancedTableHead(props: EnhancedTableProps) {
//     const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
//     const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
//         onRequestSort(event, property);
//     };
//
//     return (
//         <TableHead>
//             <TableRow>
//                 <TableCell padding='checkbox' align='center'>
//                     <Checkbox
//                         color='primary'
//                         indeterminate={numSelected > 0 && numSelected < rowCount}
//                         checked={rowCount > 0 && numSelected === rowCount}
//                         onChange={onSelectAllClick}
//                         inputProps={{
//                             'aria-label': 'select all desserts',
//                         }}
//                     />
//                 </TableCell>
//                 {headCells.map(headCell => (
//                     <TableCell color='primary' key={headCell.id} align='center' sortDirection={orderBy === headCell.id ? order : false}>
//                         <TableSortLabel
//                             active={orderBy === headCell.id}
//                             direction={orderBy === headCell.id ? order : 'asc'}
//                             onClick={createSortHandler(headCell.id)}
//                         >
//                             {headCell.label}
//                             {orderBy === headCell.id ? (
//                                 <Box component='span' sx={visuallyHidden}>
//                                     {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                                 </Box>
//                             ) : null}
//                         </TableSortLabel>
//                     </TableCell>
//                 ))}
//                 <TableCell align='center'>Действия</TableCell>
//             </TableRow>
//         </TableHead>
//     );
// }
//
// interface EnhancedTableToolbarProps {
//     numSelected: number;
// }
//
// const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
//     const { numSelected } = props;
//
//     return (
//         <Toolbar
//             sx={{
//                 pl: { sm: 2 },
//                 pr: { xs: 1, sm: 1 },
//                 ...(numSelected > 0 && {
//                     bgcolor: theme => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
//                 }),
//             }}
//         >
//             {numSelected > 0 ? (
//                 <Typography sx={{ flex: '1 1 100%' }} color='inherit' variant='subtitle1' component='div'>
//                     {numSelected} selected
//                 </Typography>
//             ) : (
//                 <Typography sx={{ flex: '1 1 100%' }} variant='h6' id='tableTitle' component='div'>
//                     Учебные группы
//                 </Typography>
//             )}
//             {numSelected > 0 ? (
//                 <Tooltip title='Delete'>
//                     <IconButton>
//                         <DeleteIcon />
//                     </IconButton>
//                 </Tooltip>
//             ) : (
//                 <Tooltip title='Filter list'>
//                     <IconButton>
//                         <FilterListIcon />
//                     </IconButton>
//                 </Tooltip>
//             )}
//             <Tooltip title='Добавить'>
//                 <IconButton>
//                     <AddIcon />
//                 </IconButton>
//             </Tooltip>
//         </Toolbar>
//     );
// };
//
// export default function GroupGrid() {
//     const [order, setOrder] = React.useState<Order>('asc');
//     const [orderBy, setOrderBy] = React.useState<keyof Data>('id');
//     const [selected, setSelected] = React.useState<readonly string[]>([]);
//     const [page, setPage] = React.useState(0);
//     const [rowsPerPage, setRowsPerPage] = React.useState(25);
//
//     const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
//         const isAsc = orderBy === property && order === 'asc';
//         setOrder(isAsc ? 'desc' : 'asc');
//         setOrderBy(property);
//     };
//
//     const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.checked) {
//             const newSelecteds = rows.map(n => n.name);
//             setSelected(newSelecteds);
//             return;
//         }
//         setSelected([]);
//     };
//
//     const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
//         const selectedIndex = selected.indexOf(name);
//         let newSelected: readonly string[] = [];
//
//         if (selectedIndex === -1) {
//             newSelected = newSelected.concat(selected, name);
//         } else if (selectedIndex === 0) {
//             newSelected = newSelected.concat(selected.slice(1));
//         } else if (selectedIndex === selected.length - 1) {
//             newSelected = newSelected.concat(selected.slice(0, -1));
//         } else if (selectedIndex > 0) {
//             newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
//         }
//
//         setSelected(newSelected);
//     };
//
//     const handleChangePage = (event: unknown, newPage: number) => {
//         setPage(newPage);
//     };
//
//     const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };
//
//     const isSelected = (name: string) => selected.indexOf(name) !== -1;
//
//     // Avoid a layout jump when reaching the last page with empty rows.
//     const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
//     const [open, setOpen] = React.useState(false);
//
//     const handleClickOpen = () => {
//         setOpen(true);
//     };
//
//     const handleClose = () => {
//         setOpen(false);
//     };
//     return (
//         <>
//             <Box sx={{ width: '100%' }}>
//                 <Paper sx={{ width: '100%', mb: 2 }}>
//                     <EnhancedTableToolbar numSelected={selected.length} />
//                     <TableContainer>
//                         <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size='medium'>
//                             <EnhancedTableHead
//                                 numSelected={selected.length}
//                                 order={order}
//                                 orderBy={orderBy}
//                                 onSelectAllClick={handleSelectAllClick}
//                                 onRequestSort={handleRequestSort}
//                                 rowCount={rows.length}
//                             />
//                             <TableBody>
//                                 {stableSort(rows, getComparator(order, orderBy))
//                                     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                                     .map((row, index) => {
//                                         const isItemSelected = isSelected(row.name);
//                                         const labelId = `enhanced-table-checkbox-${index}`;
//
//                                         return (
//                                             <TableRow
//                                                 hover
//                                                 // onClick={event => handleClick(event, row.name)}
//                                                 role='checkbox'
//                                                 aria-checked={isItemSelected}
//                                                 tabIndex={-1}
//                                                 key={row.name}
//                                                 selected={isItemSelected}
//                                             >
//                                                 <TableCell padding='checkbox'>
//                                                     <Checkbox
//                                                         color='primary'
//                                                         onClick={event => handleClick(event, row.name)}
//                                                         checked={isItemSelected}
//                                                         inputProps={{
//                                                             'aria-labelledby': labelId,
//                                                         }}
//                                                     />
//                                                 </TableCell>
//                                                 <TableCell align='center'>{row.id}</TableCell>
//                                                 <TableCell align='center' id={labelId}>
//                                                     {row.name}
//                                                 </TableCell>
//                                                 <TableCell align='center'>{row.countStudents}</TableCell>
//                                                 <TableCell align='center'>
//                                                     <IconButton
//                                                         onClick={e => {
//                                                             e.preventDefault();
//                                                         }}
//                                                     >
//                                                         <EditIcon />
//                                                     </IconButton>
//                                                     <IconButton>
//                                                         <DeleteIcon onClick={handleClickOpen} />
//                                                     </IconButton>
//                                                 </TableCell>
//                                             </TableRow>
//                                         );
//                                     })}
//                                 {emptyRows > 0 && (
//                                     <TableRow
//                                         style={{
//                                             height: 53 * emptyRows,
//                                         }}
//                                     >
//                                         <TableCell colSpan={6} />
//                                     </TableRow>
//                                 )}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                     <TablePagination
//                         rowsPerPageOptions={[5, 10, 25]}
//                         component='div'
//                         count={rows.length}
//                         rowsPerPage={rowsPerPage}
//                         page={page}
//                         onPageChange={handleChangePage}
//                         onRowsPerPageChange={handleChangeRowsPerPage}
//                     />
//                 </Paper>
//             </Box>
//             <Dialog
//               open={open}
//               onClose={handleClose}
//               aria-labelledby="alert-dialog-title"
//               aria-describedby="alert-dialog-description"
//             >
//                 <DialogTitle id="alert-dialog-title">
//                     {"Use Google's location service?"}
//                 </DialogTitle>
//                 <DialogContent>
//                     <DialogContentText id="alert-dialog-description">
//                         Let Google help apps determine location. This means sending anonymous
//                         location data to Google, even when no apps are running.
//                     </DialogContentText>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose}>Disagree</Button>
//                     <Button onClick={handleClose}>
//                         Agree
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </>
//     );
// }
