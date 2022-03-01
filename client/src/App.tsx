import React from 'react';
import './App.css';
import {ThemeProvider } from '@mui/material';
import { themeCreator } from './theme/base';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Router from './router';

function App() {
    const theme = themeCreator('DefaultTheme');

    return (
        <>
            <ThemeProvider theme={theme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <Router />
                </Box>
            </ThemeProvider>
        </>
    );
}

export default App;
