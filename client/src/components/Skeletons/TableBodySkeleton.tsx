import { Skeleton, TableCell } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';

const TableBodySkeleton = (props: { columnsCount: number }) => {
    const { columnsCount } = props;
    const rowsCount = 10;
    return (
        <>
            {Array(rowsCount)
                .fill(null)
                .map((u, i) => (
                    <>
                        <TableRow>
                            {Array(columnsCount)
                                .fill(null)
                                .map((u, i) => (
                                    <>
                                        <TableCell>
                                            <Skeleton variant='text' />
                                        </TableCell>
                                    </>
                                ))}
                        </TableRow>
                    </>
                ))}
        </>
    );
};

export default TableBodySkeleton;
