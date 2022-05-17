import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../store';
import AuthService from '../../../services/AuthService';
import { ICreditionals } from './types';
import { getErrorMsg } from '../../../utils/helperFunc';
import { ICurrentUser } from '../../../interfaces/ICurrentUser';
import TokenService from '../../../services/TokenService';

interface InitialState {
    user?: ICurrentUser;
    error?: string;
    isLoading: boolean;
}

const initialState: InitialState = {
    isLoading: true,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<ICurrentUser>) => {
            state.user = action.payload;
            state.error = undefined;
        },
        setAuthError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        removeUser: state => {
            state.user = undefined;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setUser, setAuthError, removeUser, setLoading } = authSlice.actions;

export const loginAction = (creditionals: ICreditionals): AppThunk => {
    return async dispatch => {
        try {
            const user = await AuthService.login(creditionals);
            dispatch(setUser(user));
        } catch (e: any) {
            dispatch(setAuthError(getErrorMsg(e)));
        }
    };
};

export const autoLogin = (): AppThunk => {
    return async dispatch => {
        dispatch(setLoading(true));
        const loggedUser = await AuthService.getLocalStorageUserData();
        const refreshToken = TokenService.getRefreshToken();
        const accessToken = TokenService.getAccessToken();
        const isUserExist = await AuthService.isUserExist();
        if (loggedUser && refreshToken && accessToken && isUserExist) {
            dispatch(setUser(loggedUser));
            dispatch(updateUserData());
        } else {
            dispatch(logoutAction());
        }

        dispatch(setLoading(false));
    };
};

export const updateUserData = (): AppThunk => {
    return async dispatch => {
        const accessToken = await AuthService.updateJwtToken();
        const userData = await AuthService.getCurrentUserFromJwtToken(accessToken);

        if (userData) {
            dispatch(setUser(userData));
            await AuthService.saveCurrentUserToLocalStorage(userData);
        }
    };
};

export const logoutAction = (): AppThunk => {
    return async dispatch => {
        dispatch(removeUser());
        await AuthService.removeLocalStorageUserData();
    };
};

export const selectAuthState = (state: RootState) => state.auth;

export default authSlice.reducer;
