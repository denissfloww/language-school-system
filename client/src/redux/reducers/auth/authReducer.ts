import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../store';
import AuthService from '../../../services/AuthService';
import { ICreditionals } from './types';
import { getErrorMsg } from '../../../utils/helperFunc';
import { ICurrentUser } from '../../../interfaces/ICurrentUser';
import TokenService from '../../../services/TokenService';

interface InitialState {
    user: ICurrentUser | null;
    error?: string;
    isLoading: boolean;
}

const initialState: InitialState = {
    user: null,
    isLoading: false,
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
            state.user = null;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setUser, setAuthError, removeUser } = authSlice.actions;

export const loginAction = (creditionals: ICreditionals): AppThunk => {
    return async dispatch => {
        try {
            const user = await AuthService.login(creditionals);
            dispatch(setUser(user));
            console.log(user);
        } catch (e: any) {
            dispatch(setAuthError(getErrorMsg(e)));
            //console.log(getErrorMsg(e));
        }
    };
};

export const autoLogin = (): AppThunk => {
    return async dispatch => {
        const loggedUser = await AuthService.getLocalStorageUserData();
        const refreshToken = TokenService.getRefreshToken();
        const accessToken = TokenService.getAccessToken();
        const isUserExist = await AuthService.isUserExist()
        console.log(isUserExist);
        if (loggedUser && refreshToken && accessToken && isUserExist) {
            dispatch(setUser(loggedUser));
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
