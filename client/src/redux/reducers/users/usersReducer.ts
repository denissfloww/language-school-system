import { IUser } from '../../../interfaces/IUser';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../store';
import UsersService from '../../../services/UsersService';
import { ICreatedUser, ICreateUserData } from './types';
import { toast } from 'react-toastify';
import { getErrorMsg } from '../../../utils/helperFunc';

interface InitialState {
    users: IUser[];
    createdUser?: ICreatedUser;
    isLoading: boolean;
}

const initialState: InitialState = {
    users: [],
    isLoading: false,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<IUser[]>) => {
            state.users = action.payload;
        },
        setCreatedUserData: (state, action: PayloadAction<ICreatedUser>) => {
            state.createdUser = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setUsers, setCreatedUserData } = usersSlice.actions;

export const fetchUsers = (): AppThunk => {
    return async dispatch => {
        try {
            const users = UsersService.getUsers();
            dispatch(setUsers(users));
        } catch (e) {
            console.log(e);
        }
    };
};

export const createUserAction = (createdUser: ICreateUserData): AppThunk => {
    return async dispatch => {
        try {
            // toast('Wow so easy!');
            const createdUserData = await UsersService.createUser(createdUser);
            dispatch(setCreatedUserData(createdUserData));
        } catch (e: any) {
            toast.error(getErrorMsg(e));
        }
    };
};

export const selectUsersState = (state: RootState) => state.users;

export default usersSlice.reducer;
