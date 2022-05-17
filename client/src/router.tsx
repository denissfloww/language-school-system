import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import SidebarLayout from './layouts/SidebarLayout';
import React, { lazy, Suspense } from 'react';
import Login from './pages/Login';
import SuspenseLoader from './components/SuspenseLoader';
import { useSelector } from 'react-redux';
import { selectAuthState } from './redux/reducers/auth/authReducer';
import { RoleTypes } from './interfaces/IRole';
import Journal from './pages/Journal';
import LessonTypeSettings from './pages/LessonTypeSettings';
import PersonalPage from './pages/PersonalPage';
import LanguageSettings from './pages/LanguageSettings';
import CostSettings from './pages/CostSettings';
import CreateFeedPage from './pages/FeedsSettings/CreateFeedPage';
import FeedsPage from './pages/FeedsSettings/FeedsPage';
import UpdateFeedPage from './pages/FeedsSettings/UpdateFeedPage';
import FeedBoardPage from './pages/FeedBoard';
import AuthService from './services/AuthService';
import AttendanceInfo from './pages/PersonalPage/StudentInfo/AttendanceInfo';

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
            <Route element={<ProtectedAuthRoute />}>
                <Route path='/' element={<Navigate replace to='/dashboard/schedule' />} />
                <Route path='dashboard' element={<SidebarLayout />}>
                    {/*<Route path='*' element={<Navigate to='/dashboard/schedule' replace />} />*/}
                    <Route path='schedule' element={<Schedule />} />
                    <Route path='settings'>
                        <Route path='groups' element={<GroupSettings />} />
                        <Route path='students' element={<StudentsSettings />} />
                        <Route path='user/create' element={<CreateUserPage />} />
                        <Route path='lesson-types' element={<LessonTypeSettings />} />
                        <Route path='languages' element={<LanguageSettings />} />
                        <Route path='costs' element={<CostSettings />} />
                        <Route path='feeds'>
                            <Route index element={<FeedsPage />} />
                            <Route path='update/:id' element={<UpdateFeedPage />} />
                            <Route path='create' element={<CreateFeedPage />} />
                        </Route>
                        <Route
                            path='users'
                            element={
                                <RoleGuardRouter roles={[RoleTypes.Admin, RoleTypes.Teacher]}>
                                    <UserSettings />
                                </RoleGuardRouter>
                            }
                        />
                    </Route>
                    <Route path='personal'>
                        <Route index element={<PersonalPage />} />
                    </Route>
                    <Route path='journal' element={<Journal />} />
                    <Route path='feeds/board' element={<FeedBoardPage />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default Router;

const ProtectedAuthRoute = () => {
    const { user, isLoading } = useSelector(selectAuthState);
    const location = useLocation();
    const isAuth = !!user;
    if (isLoading) {
        return null;
    }

    return isAuth ? <Outlet /> : <Navigate to='/login' state={{ from: location }} replace />;
};

// eslint-disable-next-line no-undef
const RoleGuardRouter = ({ children, roles }: { children: JSX.Element; roles: Array<RoleTypes> }) => {
    const { user } = useSelector(selectAuthState);
    const userHasRole = user?.roles.some(val => roles.includes(val.name));

    if (!userHasRole) {
        return <></>;
    }

    return children;
};
