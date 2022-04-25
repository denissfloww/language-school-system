import { Action, configureStore } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import scheduleReducer from './reducers/schedule/scheduleReducer';
import groupsReducer from './reducers/groups/groupsReducer';
import usersReducer from './reducers/users/usersReducer';
import authReducer from './reducers/auth/authReducer';
import globalReducer from './reducers/global/globalReducer';
import rolesReducer from './reducers/roles/rolesReducer';
import lessonTypesReducer from './reducers/lessonTypes/lessonTypesReducer';
import profileReducer from './reducers/profile/profileReducer';
import languageReducer from './reducers/language/languageReducer';
import costReducer from './reducers/cost/costReducer';
import feedsReducer from './reducers/feeds/feedsReducer';

const store = configureStore({
    reducer: {
        schedule: scheduleReducer,
        groups: groupsReducer,
        users: usersReducer,
        auth: authReducer,
        global: globalReducer,
        roles: rolesReducer,
        lessonTypes: lessonTypesReducer,
        profile: profileReducer,
        languages: languageReducer,
        cost: costReducer,
        feeds: feedsReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
