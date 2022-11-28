import * as React from 'react';
import { Avatar, Box, IconButton, Divider, getIconButtonUtilityClass } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { styled, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { PageRoutes } from '../../layouts/pageRoutes';
import InsightsIcon from '@mui/icons-material/Insights';
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { endPoints } from '../../api/apiEndpoints/endPoints';
import { parentUrl } from '../../api/parentUrl/parentUrl';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import CISnackbar from '../../components/SnackBar/SnackBar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import "./Dashboard.css";
import UserProfile from './UserProfile';
import { NavLink, useNavigate } from 'react-router-dom';
import { getApi } from '../../api/apiMethods/apiMethods';
import { sidebarlist } from '../../layouts/sidebarlist'

let activeStyle = {
    color: "black",
    textDecoration: "none",
};
let inactiveStyle = {
    color: "grey",
    textDecoration: "none"
};

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export const ResourceContext = createContext()

export default function Sidebar({ Children }) {

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    const [friendlyValue, setfriendlyValue] = useState([])
    const [health, setHealth] = useState([])
    const [loader, setLoader] = useState(false)
    const [fetchloader, setfetchLoader] = useState(false)
    const [manageResources, setmanageResources] = useState([])
    const [loaderMR, setloaderMr] = useState(false)


    const [dummystate, setdummystate] = useState(false)
    const dummyFunction = (id) => {
        setdummystate(id)
    }
    useEffect(() => {
        getmanageResource();
    }, [dummystate])
    async function getmanageResource() {
        setloaderMr(true)
        try {
            let res = await getApi(`${parentUrl.url}${endPoints.getResourceId}`)
            const tempFriendlyValue = [];
            setfriendlyValue([]);
            if (res) {
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].friendlyName != "") {
                        tempFriendlyValue.push(res.data[i]);
                    }
                }
                setloaderMr(false)
                setmanageResources(res.data)
            }
            setfriendlyValue(tempFriendlyValue);
            getResources(tempFriendlyValue);
            tempFriendlyValue = [];
        } catch (error) {
            console.log(error)
        }
    }

    console.log(friendlyValue)
    useEffect(() => {
        console.log('test')
    }, [friendlyValue])

    const getResources = async (friendlyData) => {
        setLoader(true)
        try {
            let res = await getApi(`${parentUrl.url}${endPoints.generateToken}`)
            localStorage.setItem('token', res.data);
            if (res) {
                proceedAzureApi(friendlyData);
            }

        } catch (error) {
            console.log(error)
        }
    }


    const proceedAzureApi = async (friendlyData) => {
        setHealth([]);
        for (let i = 0; i < friendlyData.length; i++) {
            axios(`https://management.azure.com${friendlyData[i].resourceId}/providers/Microsoft.ResourceHealth/availabilityStatuses/current?api-version=2018-07-01`).then((res) => {
                setHealth(previousState => [...previousState, { ...res, friendlyname: friendlyData[i].friendlyName }])
            })
        }
        setLoader(false)
    }


    return (
        <ResourceContext.Provider value={{ health, loader, setHealth, getResources, fetchloader, manageResources, loaderMR, dummyFunction, dummystate, getmanageResource }}>

            <Box sx={{ display: 'flex' }} >
                <CssBaseline />
                <AppBar sx={{ background: '#0a0a0a' }} position="fixed" open={open}>

                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box className="appBar_userprofile">
                            <Typography variant="h6" noWrap component="div">
                                CI Health Dashboard
                            </Typography>
                            <UserProfile />
                        </Box>
                    </Toolbar>

                </AppBar>
                <Drawer variant="permanent" open={open} >
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        {sidebarlist.map((item, index) => (
                            <ListItem key={item.name} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {gettingIcon(item)}
                                    </ListItemIcon>
                                    <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <PageRoutes />
                </Box>
            </Box >

        </ResourceContext.Provider >
    );
}


function gettingIcon(item) {
    if (item.icon === "health") {
        return <LocalHospitalIcon />
    }
    if (item.icon === "insights") {
        return <InsightsIcon />
    }
    if (item.icon === "manageResources") {
        return <ManageAccountsRoundedIcon />
    }
}