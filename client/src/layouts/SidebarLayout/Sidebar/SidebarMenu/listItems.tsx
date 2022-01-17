import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarTodayTwoToneIcon from '@mui/icons-material/CalendarTodayTwoTone';
import { Link } from 'react-router-dom';

export const mainListItems = (
    <div>
        <ListItem button component={Link} to='/courses' selected={'/courses' === location.pathname}>
            <ListItemIcon>
                <CalendarTodayTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary='Test1' />
        </ListItem>
        <ListItem button component={Link} to='/' selected={true}>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary='Test3423' />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary='Test2' />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary='Test' />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <LayersIcon />
            </ListItemIcon>
            <ListItemText primary='Test' />
        </ListItem>
    </div>
);

export const secondaryListItems = (
    <div>
        <ListSubheader inset>Saved reports</ListSubheader>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary='Current month' />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary='Last quarter' />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary='Year-end sale' />
        </ListItem>
    </div>
);
