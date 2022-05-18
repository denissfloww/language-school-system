import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { hasChildren } from '../../../../utils/helperFunc';
import { IMenuItem } from './items';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthState } from '../../../../redux/reducers/auth/authReducer';
import Divider from '@mui/material/Divider';

interface IProps {
    item: IMenuItem;
}

export const MenuItem = ({ item }: IProps) => {
    const { user } = useSelector(selectAuthState);
    let userHasRole: boolean | undefined = true;
    if (item.availableRoles) {
        const intersection: any = user?.roles.filter(element => item.availableRoles?.includes(element.name));
        userHasRole = intersection.length > 0;
    }
    if (userHasRole) {
        const Component = hasChildren(item) ? MultiLevel : SingleLevel;
        return <Component item={item} />;
    }
    return <></>;
};

const SingleLevel = ({ item }: IProps) => {
    const { pathname } = useLocation();
    const match = (path: string) => (path ? !!matchPath({ path, end: true }, pathname) : false);
    if (item.link) {
        return (
            <ListItem button selected={match(item.link ?? '')} component={Link} to={item.link}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
            </ListItem>
        );
    }

    return (
        <ListItem button>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
        </ListItem>
    );
};

const MultiLevel = ({ item }: IProps) => {
    const { items: children } = item;
    const [open, setOpen] = useState(!!item.defaultOpen);

    const handleClick = () => {
        setOpen(prev => !prev);
    };

    return (
        <>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>
                    <b>{item.title}</b>
                </ListItemText>
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItem>
            <Collapse in={open} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                    {children?.map((child, key) => (
                        <MenuItem key={key} item={child} />
                    ))}
                </List>
            </Collapse>
            <Divider />
        </>
    );
};
