import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonAddAltSharpIcon from '@mui/icons-material/PersonAddAltSharp';
import React, { ReactNode } from 'react';
import { RoleTypes } from '../../../../interfaces/IUser';

export interface IMenuItem {
    icon: ReactNode;
    title: string;
    link?: string;
    items?: any[];
    availableRoles?: RoleTypes[];
    defaultOpen?: boolean;
}

export const menu: IMenuItem[] = [
    {
        icon: <CalendarTodayIcon />,
        title: 'Расписание',
        link: '/dashboard/schedule',
        items: [],
        availableRoles: [RoleTypes.Admin, RoleTypes.None, RoleTypes.student],
    },
    {
        icon: <SettingsIcon />,
        title: 'Настройки',
        defaultOpen: true,
        items: [
            {
                icon: <PersonAddAltSharpIcon />,
                title: 'Создать пользователя',
                link: '/dashboard/settings/user/create',
            },
            {
                icon: <GroupsIcon />,
                title: 'Группы',
                link: '/dashboard/settings/groups',
            },
            {
                icon: <GroupIcon />,
                title: 'Пользователи',
                link: '/dashboard/settings/users',
            },
            {
                icon: <GroupIcon />,
                title: 'Ученики',
                link: '/dashboard/settings/students',
            },
        ],
    },
];
