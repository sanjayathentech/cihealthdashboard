// import * as React from 'react';
// import { Avatar, Box } from '@mui/material';
// import Drawer from '@mui/material/Drawer';
// import AppBar from '@mui/material/AppBar';
// import CssBaseline from '@mui/material/CssBaseline';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
// import { PageRoutes } from '../../layouts/pageRoutes';
// import InsightsIcon from '@mui/icons-material/Insights';
// import { createContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import { endPoints } from '../../api/apiEndpoints/endPoints';
// import { parentUrl } from '../../api/parentUrl/parentUrl';
// import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
// import CISnackbar from '../../components/SnackBar/SnackBar';

// import "./Dashboard.css";
// import UserProfile from './UserProfile';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { getApi } from '../../api/apiMethods/apiMethods';

// const drawerWidth = 170;
// let activeStyle = {
//     color: "black",
//     textDecoration: "none",
// };
// let inactiveStyle = {
//     color: "grey",
//     textDecoration: "none"
// };


// export const ResourceContext = createContext()

// export default function Sidebar({ Children }) {
//     const [friendlyValue, setfriendlyValue] = useState([])
//     const [health, setHealth] = useState([])
//     const [loader, setLoader] = useState(false)
//     const [fetchloader, setfetchLoader] = useState(false)
//     const [manageResources, setmanageResources] = useState([])
//     const [loaderMR, setloaderMr] = useState(false)


//     const [dummystate, setdummystate] = useState(false)
//     const dummyFunction = (id) => {
//         setdummystate(id)
//     }
//     useEffect(() => {
//         getmanageResource();
//     }, [dummystate])
//     async function getmanageResource() {
//         setloaderMr(true)
//         try {
//             let res = await getApi(`${parentUrl.url}${endPoints.getResourceId}`)
//             const tempFriendlyValue = [];
//             setfriendlyValue([]);
//             if (res) {
//                 for (let i = 0; i < res.data.length; i++) {
//                     if (res.data[i].friendlyName != "") {
//                         tempFriendlyValue.push(res.data[i]);
//                     }
//                 }
//                 setloaderMr(false)
//                 setmanageResources(res.data)
//             }
//             setfriendlyValue(tempFriendlyValue);
//             getResources(tempFriendlyValue);
//             tempFriendlyValue = [];
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     console.log(friendlyValue)
//     useEffect(() => {
//         console.log('test')
//     }, [friendlyValue])

//     const getResources = async (friendlyData) => {
//         setLoader(true)
//         try {
//             let res = await getApi(`${parentUrl.url}${endPoints.generateToken}`)
//             localStorage.setItem('token', res.data);
//             if (res) {
//                 proceedAzureApi(friendlyData);
//             }

//         } catch (error) {
//             console.log(error)
//         }
//     }


//     const proceedAzureApi = async (friendlyData) => {
//         setHealth([]);
//         for (let i = 0; i < friendlyData.length; i++) {
//             axios(`https://management.azure.com${friendlyData[i].resourceId}/providers/Microsoft.ResourceHealth/availabilityStatuses/current?api-version=2018-07-01`).then((res) => {
//                 setHealth(previousState => [...previousState, { ...res, friendlyname: friendlyData[i].friendlyName }])
//             })
//         }
//         setLoader(false)
//     }


//     return (
//         <ResourceContext.Provider value={{ health, loader, setHealth, getResources, fetchloader, manageResources, loaderMR, dummyFunction, dummystate, getmanageResource }}>

//             <Box sx={{ display: 'flex' }}>
//                 <CssBaseline />
//                 <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, }} >
//                     <Box className="appBar_userprofile">
//                         <Toolbar>
//                             <Avatar src="https://pbs.twimg.com/profile_images/1057293119090233344/EEs06nhL_400x400.jpg" sx={{ width: '35px', height: '35px' }} /> &emsp;
//                             <Typography variant="body" noWrap component="div">
//                                 CI Health Dashboard
//                             </Typography>
//                         </Toolbar>
//                         <UserProfile />
//                     </Box>
//                 </AppBar>
//                 <Drawer variant="permanent" open={open}>
//                     <DrawerHeader>
//                         <IconButton onClick={handleDrawerClose}>
//                             {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
//                         </IconButton>
//                     </DrawerHeader>
//                     <Divider />
//                     <List>
//                         <NavLink style={({ isActive }) => isActive ? activeStyle : inactiveStyle} to="health">
//                             <ListItem disablePadding>
//                                 <ListItemButton>
//                                     {<LocalHospitalIcon sx={{ color: 'green', marginRight: '10px' }} />}
//                                     <ListItemText primary="Health Status" />
//                                 </ListItemButton>
//                             </ListItem>
//                         </NavLink>
//                         <NavLink style={({ isActive }) => isActive ? activeStyle : inactiveStyle} to="insights">
//                             <ListItem disablePadding>
//                                 <ListItemButton>
//                                     {<InsightsIcon sx={{ color: '#6495ED', marginRight: '10px' }} />}
//                                     <ListItemText primary="Insights" />
//                                 </ListItemButton>
//                             </ListItem>
//                         </NavLink>

//                         <ListItem disablePadding>
//                             <ListItemButton>
//                                 {<ManageAccountsRoundedIcon sx={{ color: 'grey', marginRight: '10px' }} />}
//                                 <ListItemText primary="Manage Resources" />
//                             </ListItemButton>
//                         </ListItem>
//                     </List>
//                 </Drawer>
//                 <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//                     <DrawerHeader />
//                     <PageRoutes />
//                 </Box>
//             </Box>

//         </ResourceContext.Provider>
//     );
// }
