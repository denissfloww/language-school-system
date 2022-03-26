import { IRole } from '../../../interfaces/IRole';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../store';
import RolesService from '../../../services/RolesService';

interface InitialState {
    roles: IRole[];
}

const initialState: InitialState = {
    roles: [],
};

const rolesSlice = createSlice({
    name: 'groups',
    initialState,
    reducers: {
        setRoles: (state, action: PayloadAction<IRole[]>) => {
            state.roles = action.payload;
        },
    },
});

export const { setRoles } = rolesSlice.actions;

export const fetchRoles = (): AppThunk => {
    return async dispatch => {
        try {
            const roles = await RolesService.getRoles();
            dispatch(setRoles(roles));
        } catch (e) {
            console.log(e);
        }
    };
};

export const selectRolesState = (state: RootState) => state.roles;

export default rolesSlice.reducer;
