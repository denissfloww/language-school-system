import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import DashboardPage from '../../../components/Pages/DashboardPage';
import * as React from 'react';
import TestForm from '../Form';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { ITest } from '../../../interfaces/ITest';
import StudentTestsService from "../../../services/StudentTestsService";

const UpdateTestPage = () => {
    const { testId } = useParams();

    return (
        <>
            <DashboardPage title='Изменение теста'>
                <Typography variant='h4' sx={{ mb: 6 }}>
                    Изменение теста
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
                        <TestForm testId={Number(testId)} />
                    </Box>
                </Paper>
            </DashboardPage>
        </>
    );
};

export default UpdateTestPage;
