import * as React from 'react';
import { FC, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../redux/reducers/auth/authReducer';

type Props = {
    children: ReactNode;
    parent: any;
};

const LogoutButton: FC<Props> = ({ parent, children }): any => {
    const dispatch = useDispatch();
    const Button = parent;

    const handleLogout = () => {
        dispatch(logoutAction());
    };

    return <Button onClick={handleLogout}>{children}</Button>;
};

export default LogoutButton;
