import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonAddAltSharpIcon from '@mui/icons-material/PersonAddAltSharp';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import SchoolIcon from '@mui/icons-material/School';
import React, { ReactNode } from 'react';
import { RoleTypes } from '../../../../interfaces/IRole';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LanguageIcon from '@mui/icons-material/Language';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FeedIcon from '@mui/icons-material/Feed';
import AddIcon from '@mui/icons-material/Add';
import TableRowsIcon from '@mui/icons-material/TableRows';
import NewspaperIcon from '@mui/icons-material/Newspaper';

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
        icon: <NewspaperIcon />,
        title: 'Доска объявлений',
        link: '/dashboard/feeds/board',
        items: [],
        // availableRoles: [RoleTypes.Admin, RoleTypes.None, RoleTypes.Student],
    },
    {
        icon: <CalendarTodayIcon />,
        title: 'Расписание',
        link: '/dashboard/schedule',
        items: [],
        // availableRoles: [RoleTypes.Admin, RoleTypes.None, RoleTypes.Student],
    },
    {
        icon: <ImportContactsIcon />,
        title: 'Журнал',
        link: '/dashboard/journal',
        items: [],
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
                icon: <SchoolIcon />,
                title: 'Типы занятий',
                link: '/dashboard/settings/lesson-types',
            },
            {
                icon: <LanguageIcon />,
                title: 'Языки',
                link: '/dashboard/settings/languages',
            },
            {
                icon: <AttachMoneyIcon />,
                title: 'Тарифы',
                link: '/dashboard/settings/costs',
            },
            {
                icon: <FeedIcon />,
                title: 'Объявления',
                items: [
                    {
                        icon: <AddIcon />,
                        title: 'Добавить',
                        link: '/dashboard/settings/feeds/create',
                    },
                    {
                        icon: <TableRowsIcon />,
                        title: 'Список',
                        link: '/dashboard/settings/feeds',
                    },
                ],
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
    {
        icon: <AccountBoxIcon />,
        title: 'Профиль',
        link: '/dashboard/personal',
        items: [],
    },
];
