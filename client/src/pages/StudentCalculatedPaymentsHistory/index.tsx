import DashboardPage from '../../components/Pages/DashboardPage';
import Container from '@mui/material/Container';
import React from 'react';
import StudentCalculatedPaymentsGrid from './Grid';
import { useParams } from 'react-router-dom';

const StudentCalculatedPaymentsHistoryPage = () => {
    const { studentId, groupId } = useParams();

    return (
        <>
            <DashboardPage title='История ежемесячных расчётов'>
                <Container maxWidth='lg' sx={{ mb: 4 }}>
                    <StudentCalculatedPaymentsGrid groupId={Number(groupId)} studentId={Number(studentId)} />
                </Container>
            </DashboardPage>
        </>
    );
};

export default StudentCalculatedPaymentsHistoryPage;
