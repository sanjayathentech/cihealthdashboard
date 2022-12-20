import * as React from 'react';
import { Avatar, Box, IconButton, Divider, getIconButtonUtilityClass, Tooltip } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { styled, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
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
import AltigenLogo from '../../assets/logo.jpg'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import DisplaySettingsOutlinedIcon from '@mui/icons-material/DisplaySettingsOutlined';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';

import "./Dashboard.css";
import UserProfile from './UserProfile';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { getApi } from '../../api/apiMethods/apiMethods';
import { sidebarlist } from '../../layouts/sidebarlist'
import { GetMethod } from '../../api/apiMethods/apiMethods'
import MonitorHeartOutlinedIcon from '@mui/icons-material/MonitorHeartOutlined';

import { useDispatch, useSelector } from 'react-redux';
import { GetAllTenant } from '../../Redux/InsightSlice/InsightSlice';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';

import { GetAllresourcesandResourcetype } from "../../Redux/ReportsSlice/ReportSlice"

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
            '& .MuiDrawer-paper': openedMixin(theme)
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),

        }),
    }),
);

export const ResourceContext = createContext()


function Sidebar({ Children }) {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GetAllTenant())

    }, [])
    const location = useLocation()
    const navigate = useNavigate()
    const activeRoute = (routeName) => {
        return location.pathname === routeName ? true : false;
    }
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const [friendlyValue, setfriendlyValue] = useState([])
    const [health, setHealth] = useState([])
    const [loader, setLoader] = useState(true)
    const [fetchloader, setfetchLoader] = useState(false)
    const [manageResources, setmanageResources] = useState([])
    const [loaderMR, setloaderMr] = useState(true)

    const [filteredhealth, setfilteredhealth] = useState([])

    const [dummystate, setdummystate] = useState(false)
    const dummyFunction = (id) => {
        setdummystate(id)
    }
    useEffect(() => {
        getmanageResource()
    }, [])
    async function getmanageResource() {
        setloaderMr(true)
        try {
            let res = await GetMethod(endPoints.getResourceId)
            let tempFriendlyValue = [];
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
    async function refetchmanageResource() {

        try {
            let res = await GetMethod(endPoints.getResourceId)
            let tempFriendlyValue = [];
            setfriendlyValue([]);
            if (res) {
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].friendlyName != "") {
                        tempFriendlyValue.push(res.data[i]);
                    }
                }
                setmanageResources(res.data)
            }
            setfriendlyValue(tempFriendlyValue);
            getResources(tempFriendlyValue);
            tempFriendlyValue = [];
        } catch (error) {
            console.log(error)
        }
    }

    const getResources = async (friendlyData) => {

        try {
            let res = await GetMethod(endPoints.generateToken)
            localStorage.setItem('token', res.data);
            if (res) {
                proceedAzureApi(friendlyData);
            }

        } catch (error) {
            console.log(error)
        }
    }

    const proceedAzureApi = async () => {
        setLoader(true)
        try {
            let res = await GetMethod(endPoints.getHealthStatus)
            setLoader(false)
            setHealth(res.data);
            setfilteredhealth(res.data)
        } catch (error) {
            setLoader(false)
            console.log(error)
        }
    }

    // const proceedAzureApi = async (friendlyData) => {
    //     setLoader(true)
    //     setHealth([]);
    //     setfilteredhealth([])
    //     for (let i = 0; i < friendlyData.length; i++) {
    //         GetMethod(`https://management.azure.com${friendlyData[i].resourceId}/providers/Microsoft.ResourceHealth/availabilityStatuses/current?api-version=2018-07-01`).then((res) => {
    //             setHealth(previousState => [...previousState, { ...res, friendlyname: friendlyData[i].friendlyName }])
    //             setfilteredhealth(previousState => [...previousState, { ...res, friendlyname: friendlyData[i].friendlyName }])
    //             if (i <= friendlyData.length) {
    //                 console.log(i)
    //                 setLoader(false)
    //             }
    //         })
    //     }

    // }

    return (
        <Box sx={{ display: 'flex' }} >
            <CssBaseline />
            <AppBar elevation={0} sx={{ justifyContent: "flex-end", backgroundColor: "#ffffff", zIndex: 1 }} position="fixed" open={open}>
                <Toolbar>
                    <Box sx={{ width: '100%', marginLeft: "60px", display: 'flex', justifyContent: "space-between", alignItems: "center", color: "grey" }}>
                        <span>CI Health Dashboard</span>
                        <UserProfile />
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer sx={{ zIndex: 2 }} variant="permanent"
                open={open}>
                <div style={{ background: '#0078d4', height: '100vh' }}>
                    <DrawerHeader sx={{ minHeight: "50px !important", alignItems: "center", color: 'white', justifyContent: "center" }}>
                        <Avatar alt="Altigen" src={AltigenLogo} sx={{
                            marginTop: "8px",
                            width: "30px",
                            height: "30px",
                        }} />
                    </DrawerHeader>
                    <List>
                        {sidebarlist.map((item, index) => (
                            <Tooltip title={item.name} placement="right">
                                <ListItem key={item.name} disablePadding sx={{
                                    display: 'block',
                                }}>
                                    <Box>
                                        <ListItemButton
                                            onClick={() => navigate(item.path)}
                                            selected={activeRoute(`/${item.path}`)}
                                            sx={{
                                                minHeight: 48,
                                                justifyContent: open ? 'initial' : 'center',
                                                px: 2.5,
                                                "&.Mui-selected": {
                                                    borderLeft: '2px solid #ffffff',
                                                },
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{

                                                    minWidth: 0,
                                                    mr: open ? 3 : 'auto',
                                                    justifyContent: 'center',
                                                    color: "#ffffff"
                                                }}
                                            >
                                                {gettingIcon(item)}
                                            </ListItemIcon>
                                            <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
                                        </ListItemButton>
                                    </Box>
                                </ListItem>
                            </Tooltip>
                        ))}
                    </List>
                </div>
            </Drawer>
            <ResourceContext.Provider value={{ health, loader, filteredhealth, setfilteredhealth, setHealth, getResources, fetchloader, manageResources, loaderMR, dummyFunction, dummystate, getmanageResource, refetchmanageResource }}>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <PageRoutes />
                </Box>
            </ResourceContext.Provider >
        </Box >

    );
}

export default Sidebar;

function gettingIcon(item) {
    switch (item.icon) {
        case "health": return <MonitorHeartOutlinedIcon />
        case "insights": return <InsightsOutlinedIcon />
        case "manageResources": return <DisplaySettingsOutlinedIcon />
        case "reports": return <AssessmentOutlinedIcon />
    }
}


