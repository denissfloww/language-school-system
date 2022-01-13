import React from 'react';
import './App.css';
import Dashboard from './Dashboard';
import { ThemeProvider } from '@mui/material';
import theme from './theme/theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Dashboard />
        </ThemeProvider>
    );
}

export default App;
