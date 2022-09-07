import { useParams } from 'react-router-dom';
import DashboardPage from '../../../components/Pages/DashboardPage';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Box, Paper } from '@mui/material';
import AppendCostForm from './Form';

const AppendCost = () => {
    const { costStudentGroupId, studentId, groupId } = useParams();
    return (
        <DashboardPage title={costStudentGroupId ? 'Изменить' : 'Добавить'}>
            <Typography variant='h4' sx={{ mb: 6 }}>
                {costStudentGroupId ? 'Изменить' : 'Добавить'}
            </Typography>
            <Paper
                sx={{
                    flexGrow: 1,
                    height: '100%',
                    padding: 4,
                    overflow: 'auto',
                    width: '100%',
                    mb: 2,
                }}
            >
                <Box>
                    <AppendCostForm
                        studentId={Number(studentId)}
                        groupId={Number(groupId)}
                        costStudentGroupId={costStudentGroupId ? Number(costStudentGroupId) : undefined}
                    />
                </Box>
            </Paper>
        </DashboardPage>
    );
};

export default AppendCost;
