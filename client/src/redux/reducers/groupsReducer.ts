import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGroup } from '../../interfaces/IGroup';
import { AppThunk, RootState } from '../store';
import GroupService from '../../services/GroupService';

interface InitialState {
    groups: IGroup[];
    loading: boolean;
}

const initialState: InitialState = {
    groups: [],
    loading: false,
};

const groupsSlice = createSlice({
    name: 'groups',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setGroups: (state, action: PayloadAction<IGroup[]>) => {
            state.groups = action.payload;
        },
    },
});

export const { setGroups, setLoading } = groupsSlice.actions;

export const fetchGroups = (): AppThunk => {
    return async dispatch => {
        try {
            dispatch(setLoading(true));

            const groups = GroupService.getGroups();
            dispatch(setGroups(groups));

            dispatch(setLoading(false));
        } catch (e) {
            console.log(e);
        }
    };
};

export const selectGroupsState = (state: RootState) => state.groups;

export default groupsSlice.reducer;
