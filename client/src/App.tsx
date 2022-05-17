import React, { useEffect } from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material';
import { themeCreator } from './theme/base';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Router from './router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { autoLogin, selectAuthState } from './redux/reducers/auth/authReducer';

function App() {
    const theme = themeCreator('DefaultTheme');
    const dispatch = useDispatch();
    const { isLoading, user } = useSelector(selectAuthState);
    useEffect(() => {
        dispatch(autoLogin());
    }, []);
    return (
        <>
            <ThemeProvider theme={theme}>
                <ToastContainer />
                <Box sx={{ display: 'flex' }}>
                    {!isLoading ? <Router /> : null}
                    <CssBaseline />
                </Box>
            </ThemeProvider>
        </>
    );
}

export default App;
