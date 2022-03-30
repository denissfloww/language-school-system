import { IMenuItem } from '../layouts/SidebarLayout/Sidebar/SidebarMenu/items';

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 10) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

export function stringAvatar(name: string, width: number) {
    return {
        sx: {
            bgcolor: stringToColor(name),
            width: width,
            height: width,
            color: 'black',
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

export function hasChildren(item: IMenuItem) {
    const { items: children } = item;

    if (children === undefined) {
        return false;
    }

    if (children.constructor !== Array) {
        return false;
    }

    if (children.length === 0) {
        return false;
    }

    return true;
}

export interface ReturnedError {
    response?: {
        data?: {
            message: string;
        };
    };
    message: string;
}

export const getErrorMsg = (err: ReturnedError) => {
    if (err?.response?.data?.message) {
        return err.response.data.message;
    } else {
        return err.message;
    }
};
