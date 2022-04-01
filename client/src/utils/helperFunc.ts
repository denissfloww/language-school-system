import { IMenuItem } from '../layouts/SidebarLayout/Sidebar/SidebarMenu/items';

function stringToColor(str: string, s: string = '30', l: string = '80') {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const h = hash % 360;
    return 'hsl('+h+', '+s+'%, '+l+'%)';
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
