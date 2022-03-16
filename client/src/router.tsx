import { Navigate, Outlet, useLocation } from 'react-router-dom';
import SidebarLayout from './layouts/SidebarLayout';
import React, { lazy } from 'react';
import Login from './pages/Login';
import { Suspense } from 'react';
import SuspenseLoader from './components/SuspenseLoader';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthState } from './redux/reducers/auth/authReducer';
import { RoleTypes } from './interfaces/IUser';

// @ts-ignore
// eslint-disable-next-line react/display-name
const Loader = Component => props =>
    (
        <Suspense fallback={<SuspenseLoader />}>
            <Component {...props} />
        </Suspense>
    );

const Schedule = Loader(lazy(() => import('./pages/Schedule')));
const GroupSettings = Loader(lazy(() => import('./pages/GroupSettings')));
const StudentsSettings = Loader(lazy(() => import('./pages/StudentsSettings')));
const CreateUserPage = Loader(lazy(() => import('./pages/CreateUserPage')));
const UserSettings = Loader(lazy(() => import('./pages/UsersSettings')));

const Router = () => {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route element={<RequireAuth />}>
                <Route path='/' element={<Navigate to='/dashboard/schedule' />} />
                <Route path='dashboard' element={<SidebarLayout />}>
                    <Route path='*' element={<Navigate to='/dashboard/schedule' replace />} />
                    <Route path='schedule' element={<Schedule />} />
                    <Route path='settings'>
                        <Route path='groups' element={<GroupSettings />} />
                        <Route path='students' element={<StudentsSettings />} />
                        <Route path='user/create' element={<CreateUserPage />} />
                        <Route
                            path='users'
                            element={
                                <RoleGuardRouter roles={[RoleTypes.Admin, RoleTypes.student]}>
                                    <UserSettings />
                                </RoleGuardRouter>
                            }
                        />
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
};

export default Router;

function RequireAuth() {
    const { user } = useSelector(selectAuthState);
    const isAuth = !!user;
    let location = useLocation();

    if (!isAuth) {
        return <Navigate to='/login' state={{ from: location }} />;
    }

    return <Outlet />;
}


// eslint-disable-next-line no-undef
const RoleGuardRouter = ({ children, roles }: { children: JSX.Element; roles: Array<RoleTypes> }) => {
    const { user } = useSelector(selectAuthState);
    const userHasRole = user?.roles.every(val => roles.includes(val.name));

    if (!userHasRole) {
        return <></>;
    }

    return children;
};
