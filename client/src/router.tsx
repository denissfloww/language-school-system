import { RouteObject } from 'react-router-dom';
import SidebarLayout from './layouts/SidebarLayout';
import Test2 from './pages/Test2';
import React from 'react';
import Login from './pages/Login';
import { Suspense, lazy } from 'react';
import SuspenseLoader from './components/SuspenseLoader';

// @ts-ignore
// eslint-disable-next-line react/display-name
const Loader = Component => props =>
    (
        <Suspense fallback={<SuspenseLoader />}>
            <Component {...props} />
        </Suspense>
    );

const Test = Loader(lazy(() => import('./pages/Test')));

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <SidebarLayout />,
        children: [
            { index: true, element: <Test /> },
            {
                path: '/courses',
                element: <Test2 />,
            },
            { path: '*', element: <Test /> },
        ],
    },
    {
        path: '/login',
        element: <Login />,
    },
];
