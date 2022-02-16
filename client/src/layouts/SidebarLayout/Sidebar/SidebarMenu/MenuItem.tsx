import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { hasChildren } from '../../../../helpers/helperFunc';
import { IMenuItem } from './items';
import { Link, matchPath, useLocation } from 'react-router-dom';

interface IProps {
    item: IMenuItem;
}

export const MenuItem = ({ item }: IProps) => {
    const Component = hasChildren(item) ? MultiLevel : SingleLevel;
    return <Component item={item} />;
};

const SingleLevel = ({ item }: IProps) => {
    const { pathname } = useLocation();
    const match = (path: string) => (path ? !!matchPath({ path, end: false }, pathname) : false);
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
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(prev => !prev);
    };

    return (
        <>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItem>
            <Collapse in={open} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                    {children?.map((child, key) => (
                        <MenuItem key={key} item={child} />
                    ))}
                </List>
            </Collapse>
        </>
    );
};
