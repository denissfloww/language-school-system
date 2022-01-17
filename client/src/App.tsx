import React from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material';
import { themeCreator } from './theme/base';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useRoutes } from 'react-router-dom';
import { routes } from './router';

function App() {
    const theme = themeCreator('DefaultTheme');
    const content = useRoutes(routes);
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                {content}
            </Box>
        </ThemeProvider>
    );
}

export default App;
