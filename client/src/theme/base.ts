import React from 'react';
import { Theme } from '@mui/material/styles';
import { DefaultTheme } from './DefaultTheme';

export function themeCreator(theme: string): Theme {
    return themeMap[theme];
}

declare module '@mui/material/styles' {
    interface Theme {
        status: {
            danger: string;
        };
        sidebar: {
            background: React.CSSProperties['color'];
            boxShadow: React.CSSProperties['color'];
            width: string;
            textColor: React.CSSProperties['color'];
            dividerBg: React.CSSProperties['color'];
            menuItemColor: React.CSSProperties['color'];
            menuItemColorActive: React.CSSProperties['color'];
            menuItemBg: React.CSSProperties['color'];
            menuItemBgActive: React.CSSProperties['color'];
            menuItemIconColor: React.CSSProperties['color'];
            menuItemIconColorActive: React.CSSProperties['color'];
            menuItemHeadingColor: React.CSSProperties['color'];
        };
    }

    interface ThemeOptions {
        status?: {
            danger?: string;
        };
        sidebar: {
            background: React.CSSProperties['color'];
            boxShadow: React.CSSProperties['color'];
            width: string;
            textColor: React.CSSProperties['color'];
            dividerBg: React.CSSProperties['color'];
            menuItemColor: React.CSSProperties['color'];
            menuItemColorActive: React.CSSProperties['color'];
            menuItemBg: React.CSSProperties['color'];
            menuItemBgActive: React.CSSProperties['color'];
            menuItemIconColor: React.CSSProperties['color'];
            menuItemIconColorActive: React.CSSProperties['color'];
            menuItemHeadingColor: React.CSSProperties['color'];
        };
    }
}

const themeMap: { [key: string]: Theme } = {
    DefaultTheme,
};
