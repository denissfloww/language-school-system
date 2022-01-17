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
    }

    interface ThemeOptions {
        status?: {
            danger?: string;
        };
    }
}

const themeMap: { [key: string]: Theme } = {
    DefaultTheme,
};
