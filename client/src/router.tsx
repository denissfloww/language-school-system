import { Navigate } from 'react-router-dom';
import SidebarLayout from './layouts/SidebarLayout';
import React from 'react';
import Login from './pages/Login';
import { Suspense } from 'react';
import SuspenseLoader from './components/SuspenseLoader';
import Schedule from './pages/Schedule';
import { Routes, Route } from 'react-router-dom';
import GroupSettings from './pages/GroupSettings';
import StudentsSettings from './pages/StudentsSettings';

// @ts-ignore
// eslint-disable-next-line react/display-name
const Loader = Component => props =>
    (
        <Suspense fallback={<SuspenseLoader />}>
            <Component {...props} />
        </Suspense>
    );

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/dashboard/schedule' />} />
            <Route path='dashboard' element={<SidebarLayout />}>
                <Route path='*' element={<Navigate to='/dashboard/schedule' replace />}  />
                <Route path='schedule' element={<Schedule />} />
                <Route path='settings'>
                    <Route path='groups' element={<GroupSettings />} />
                    <Route path='students' element={<StudentsSettings />} />
                </Route>
            </Route>
            <Route path='/login' element={<Login />} />
        </Routes>
    );
};

export default Router;

// export const routes: RouteObject[] = [
//     {
//         path: '/',
//         element: <SidebarLayout />,
//         children: [
//             {
//                 path: '/schedule',
//                 element: <Schedule />,
//             },
//             {
//                 path: 'settings',
//                 children: []
//             }
//         ],
//     },
//     {
//         path: '/login',
//         element: <Login />,
//     },
// ];
