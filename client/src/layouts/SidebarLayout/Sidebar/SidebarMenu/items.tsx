import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupsIcon from '@mui/icons-material/Groups';
import React, { ReactNode } from "react";

export interface IMenuItem {
    icon: ReactNode;
    title: string;
    link?:string;
    items?: any[];
}

export const menu: IMenuItem[] = [
    {
        icon: <CalendarTodayIcon />,
        title: 'Расписание',
        link:'/dashboard/schedule',
        items: [],
    },
    {
        icon: <SettingsIcon />,
        title: 'Настройки',
        items: [
            {
                icon: <GroupsIcon />,
                title: 'Группы',
                link:'/dashboard/settings/groups',
            },
            {
                icon: <GroupIcon />,
                title: 'Ученики',
                link:'/dashboard/settings/students',
            },
        ],
    },
];
