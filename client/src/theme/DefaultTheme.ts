import { alpha, createTheme, lighten, darken } from '@mui/material';
import { orange } from '@mui/material/colors';

const themeColors = {
    primary: '#298d06',
    secondary: '#ee940d',
    success: '#44D600',
    warning: '#FFA319',
    error: '#FF1943',
    info: '#33C2FF',
    black: '#223354',
    white: '#ffffff',
    primaryAlt: '#000C57',
};

const colors = {
    gradients: {
        blue1: 'linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)',
        blue2: 'linear-gradient(135deg, #ABDCFF 0%, #0396FF 100%)',
        blue3: 'linear-gradient(127.55deg, #141E30 3.73%, #243B55 92.26%)',
        orange1: 'linear-gradient(135deg, #FCCF31 0%, #F55555 100%)',
        orange2: 'linear-gradient(135deg, #FFD3A5 0%, #FD6585 100%)',
        purple1: 'linear-gradient(135deg, #43CBFF 0%, #9708CC 100%)',
        pink1: 'linear-gradient(135deg, #F6CEEC 0%, #D939CD 100%)',
        pink2: 'linear-gradient(135deg, #F761A1 0%, #8C1BAB 100%)',
        green1: 'linear-gradient(135deg, #FFF720 0%, #3CD500 100%)',
        black1: 'linear-gradient(100.66deg, #434343 6.56%, #000000 93.57%)',
    },
    shadows: {
        success: '0px 1px 4px rgba(68, 214, 0, 0.25), 0px 3px 12px 2px rgba(68, 214, 0, 0.35)',
        error: '0px 1px 4px rgba(255, 25, 67, 0.25), 0px 3px 12px 2px rgba(255, 25, 67, 0.35)',
        info: '0px 1px 4px rgba(51, 194, 255, 0.25), 0px 3px 12px 2px rgba(51, 194, 255, 0.35)',
        primary: '0px 1px 4px rgba(85, 105, 255, 0.25), 0px 3px 12px 2px rgba(85, 105, 255, 0.35)',
        warning: '0px 1px 4px rgba(255, 163, 25, 0.25), 0px 3px 12px 2px rgba(255, 163, 25, 0.35)',
        card: '0px 9px 16px rgba(159, 162, 191, 0.18), 0px 2px 2px rgba(159, 162, 191, 0.32)',
        cardSm: '0px 2px 3px rgba(159, 162, 191, 0.18), 0px 1px 1px rgba(159, 162, 191, 0.32)',
        cardLg: '0 5rem 14rem 0 rgb(255 255 255 / 30%), 0 0.8rem 2.3rem rgb(0 0 0 / 60%), 0 0.2rem 0.3rem rgb(0 0 0 / 45%)',
    },
    layout: {
        general: {
            bodyBg: '#ffffff',
        },
        sidebar: {
            background: themeColors.white,
            textColor: themeColors.secondary,
            dividerBg: '#f2f5f9',
            menuItemColor: '#9f916e',
            menuItemColorActive: themeColors.primary,
            menuItemBg: 'transparent',
            menuItemBgActive: lighten(themeColors.primary, 0.7),
            menuItemIconColor: lighten(themeColors.secondary, 0.3),
            menuItemIconColorActive: themeColors.primary,
            menuItemHeadingColor: darken(themeColors.secondary, 0.3),
            boxShadow: '0px 9px 16px rgba(159, 162, 191, 0.18), 0px 2px 2px rgba(159, 162, 191, 0.32)',
        },
    },
    alpha: {
        white: {
            5: alpha(themeColors.white, 0.02),
            10: alpha(themeColors.white, 0.1),
            30: alpha(themeColors.white, 0.3),
            50: alpha(themeColors.white, 0.5),
            70: alpha(themeColors.white, 0.7),
            100: themeColors.white,
        },
        trueWhite: {
            5: alpha(themeColors.white, 0.02),
            10: alpha(themeColors.white, 0.1),
            30: alpha(themeColors.white, 0.3),
            50: alpha(themeColors.white, 0.5),
            70: alpha(themeColors.white, 0.7),
            100: themeColors.white,
        },
        black: {
            5: alpha(themeColors.black, 0.02),
            10: alpha(themeColors.black, 0.1),
            30: alpha(themeColors.black, 0.3),
            50: alpha(themeColors.black, 0.5),
            70: alpha(themeColors.black, 0.7),
            100: themeColors.black,
        },
    },
    secondary: {
        lighter: lighten(themeColors.secondary, 0.85),
        light: lighten(themeColors.secondary, 0.25),
        main: themeColors.secondary,
        dark: darken(themeColors.secondary, 0.2),
    },
    primary: {
        lighter: lighten(themeColors.primary, 0.85),
        light: lighten(themeColors.primary, 0.3),
        main: themeColors.primary,
        dark: darken(themeColors.primary, 0.2),
    },
    success: {
        lighter: lighten(themeColors.success, 0.85),
        light: lighten(themeColors.success, 0.3),
        main: themeColors.success,
        dark: darken(themeColors.success, 0.2),
    },
    warning: {
        lighter: lighten(themeColors.warning, 0.85),
        light: lighten(themeColors.warning, 0.3),
        main: themeColors.warning,
        dark: darken(themeColors.warning, 0.2),
    },
    error: {
        lighter: lighten(themeColors.error, 0.85),
        light: lighten(themeColors.error, 0.3),
        main: themeColors.error,
        dark: darken(themeColors.error, 0.2),
    },
    info: {
        lighter: lighten(themeColors.info, 0.85),
        light: lighten(themeColors.info, 0.3),
        main: themeColors.info,
        dark: darken(themeColors.info, 0.2),
    },
};

export const DefaultTheme = createTheme({
    status: {
        danger: orange[500],
    },
    typography: {
        fontFamily: ['"Nunito"', 'sans-serif'].join(','),
        fontSize: 14,
    },
    palette: {
        common: {
            black: colors.alpha.black[100],
            white: colors.alpha.white[100],
        },
        primary: {
            light: colors.primary.light,
            main: colors.primary.main,
            dark: colors.primary.dark,
        },
        secondary: {
            light: colors.secondary.light,
            main: colors.secondary.main,
            dark: colors.secondary.dark,
        },
        text: {
            primary: colors.alpha.black[100],
            secondary: colors.alpha.black[70],
            disabled: colors.alpha.black[50],
        },
        background: {
            paper: colors.alpha.white[100],
            default: colors.layout.general.bodyBg,
        },
    },

    sidebar: {
        background: colors.layout.sidebar.background,
        textColor: colors.layout.sidebar.textColor,
        dividerBg: colors.layout.sidebar.dividerBg,
        menuItemColor: colors.layout.sidebar.menuItemColor,
        menuItemColorActive: colors.layout.sidebar.menuItemColorActive,
        menuItemBg: colors.layout.sidebar.menuItemBg,
        menuItemBgActive: colors.layout.sidebar.menuItemBgActive,
        menuItemIconColor: colors.layout.sidebar.menuItemIconColor,
        menuItemIconColorActive: colors.layout.sidebar.menuItemIconColorActive,
        menuItemHeadingColor: colors.layout.sidebar.menuItemHeadingColor,
        boxShadow: colors.layout.sidebar.boxShadow,
        width: '280px',
    },

    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    '& .MuiInputAdornment-positionEnd.MuiInputAdornment-outlined': {
                        paddingRight: 6,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: colors.alpha.black[50],
                    },
                    '&.Mui-focused:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: colors.primary.main,
                    },
                },
            },
        },
        MuiButton: {
            defaultProps: {
                disableRipple: true,
            },
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    fontWeight: 'bold',
                    textTransform: 'none',
                    paddingLeft: 16,
                    paddingRight: 16,

                    '.MuiSvgIcon-root': {
                        transition: 'all .2s',
                    },
                },
                endIcon: {
                    marginRight: -8,
                },
                containedSecondary: {
                    backgroundColor: colors.secondary.main,
                    color: colors.alpha.white[100],
                    border: '1px solid ' + colors.alpha.black[30],
                },
                outlinedSecondary: {
                    backgroundColor: colors.alpha.white[100],

                    '&:hover, &.MuiSelected': {
                        backgroundColor: colors.alpha.black[5],
                        color: colors.alpha.black[100],
                    },
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    height: 38,
                    minHeight: 38,
                    overflow: 'visible',
                },
                scrollableX: {
                    overflow: 'visible !important',
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    padding: 0,
                    height: 38,
                    minHeight: 38,
                    borderRadius: 6,
                    transition: 'color .2s',
                    textTransform: 'capitalize',

                    '&.MuiButtonBase-root': {
                        minWidth: 'auto',
                        paddingLeft: 20,
                        paddingRight: 20,
                        marginRight: 4,
                    },
                    '&.Mui-selected, &.Mui-selected:hover': {
                        color: colors.primary.main,
                        zIndex: 5,
                    },
                    '&:hover': {
                        color: colors.alpha.black[100],
                    },
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                head: {
                    background: colors.alpha.black[5],
                },
                root: {
                    transition: 'background-color .2s',

                    '&.MuiTableRow-hover:hover': {
                        backgroundColor: lighten(colors.alpha.black[5], 0.5),
                    },
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottomColor: colors.alpha.black[10],
                    fontSize: 14,
                },
                head: {
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: colors.alpha.black[100],
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    padding: 0,
                },
                elevation0: {
                    boxShadow: 'none',
                },
                elevation: {
                    boxShadow: colors.shadows.card,
                },
                elevation2: {
                    boxShadow: colors.shadows.cardSm,
                },
                elevation24: {
                    boxShadow: colors.shadows.cardLg,
                },
            },
        },
    },
});
