import { Action, configureStore } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import scheduleReducer from './reducers/schedule/scheduleReducer';
import groupsReducer from './reducers/groups/groupsReducer';
import usersReducer from './reducers/users/usersReducer';
import authReducer from './reducers/auth/authReducer';
import globalReducer from './reducers/global/globalReducer';
import rolesReducer from './reducers/roles/rolesReducer';
import lessonTypesReducer from './reducers/lessonTypes/lessonTypesReducer';

const store = configureStore({
    reducer: {
        schedule: scheduleReducer,
        groups: groupsReducer,
        users: usersReducer,
        auth: authReducer,
        global: globalReducer,
        roles: rolesReducer,
        lessonTypes: lessonTypesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
