import { IUser } from '../../../interfaces/IUser';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../store';
import UsersService from '../../../services/UsersService';
import { ICreatedUser, ICreateUserData } from './types';
import { toast } from 'react-toastify';
import { getErrorMsg } from '../../../utils/helperFunc';
import { getCurrentValidation } from '../../../pages/CreateUserPage/FormModel/validationSchema';

interface InitialState {
    users: IUser[];
    createdUser?: ICreatedUser;
    isLoading: boolean;
    validationSchema: any[];
}

const initialState: InitialState = {
    users: [],
    isLoading: false,
    validationSchema: getCurrentValidation(false),
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
        setValidationSchema: (state, action: PayloadAction<any[]>) => {
            state.validationSchema = action.payload;
        },
    },
});

export const { setUsers, setCreatedUserData, setValidationSchema } = usersSlice.actions;

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
