import { IUser } from '../../../interfaces/IUser';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../store';
import UsersService from '../../../services/UsersService';
import { ICreatedUser, ICreateUserData } from './types';
import { toast } from 'react-toastify';
import { getErrorMsg } from '../../../utils/helperFunc';
import { getCurrentValidation } from '../../../pages/CreateUserPage/FormModel/validationSchema';
import { IPageDataResponse } from '../../../services/responses/types';

interface InitialState {
    users?: IPageDataResponse<IUser>;
    createdUser?: ICreatedUser;
    isLoading: boolean;
    validationSchema: any[];
    user?: IUser;
}

const initialState: InitialState = {
    isLoading: false,
    validationSchema: getCurrentValidation(false),
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<IPageDataResponse<IUser>>) => {
            state.users = action.payload;
        },
        setCreatedUserData: (state, action: PayloadAction<ICreatedUser>) => {
            state.createdUser = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setValidationSchema: (state, action: PayloadAction<any[]>) => {
            state.validationSchema = action.payload;
        },
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
    },
});

export const { setUsers, setCreatedUserData, setValidationSchema, setUser, setLoading } = usersSlice.actions;

export const fetchUsers = (): AppThunk => {
    return async dispatch => {
        try {
            const users = await UsersService.getUsers();
            dispatch(setUsers(users));
        } catch (e) {
            console.log(e);
        }
    };
};

export const createUserAction = (createdUser: ICreateUserData): AppThunk => {
    return async dispatch => {
        try {
            dispatch(setLoading(true));
            const createdUserData = await UsersService.createUser(createdUser);
            dispatch(setCreatedUserData(createdUserData));
            dispatch(setLoading(false));
        } catch (e: any) {
            toast.error(getErrorMsg(e));
        }
    };
};

export const changePasswordAction = (values: any): AppThunk => {
    return async (dispatch, getState) => {
        try {
            await UsersService.changePassword({
                oldPassword: values.oldPassword,
                newPassword: values.newPassword,
            });
        } catch (e: any) {
            toast.error(getErrorMsg(e));
        }
    };
};

export const fetchCurrentUserInfoByIdAction = (): AppThunk => {
    return async (dispatch, getState) => {
        try {
            const { user: currentUser } = getState().auth;
            if (currentUser) {
                const user = await UsersService.getUserById(currentUser.id);
                dispatch(setUser(user));
            }
        } catch (e: any) {
            toast.error(getErrorMsg(e));
        }
    };
};

export const selectUsersState = (state: RootState) => state.users;

export default usersSlice.reducer;
