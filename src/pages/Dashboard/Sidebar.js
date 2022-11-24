import * as React from 'react';
import { Avatar, Box } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
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

import "./Dashboard.css";
import UserProfile from './UserProfile';
import { NavLink, useNavigate } from 'react-router-dom';
import { getApi } from '../../api/apiMethods/apiMethods';

const drawerWidth = 170;
let activeStyle = {
  color: "black",
  textDecoration: "none",
};
let inactiveStyle = {
  color: "grey",
  textDecoration: "none"
};


export const ResourceContext = createContext()

export default function Sidebar({ Children }) {
  // const [healthIDs, sethealthIDs] = useState([])
  const [health, setHealth] = useState([])
  const [loader, setLoader] = useState(false)
  const [fetchloader, setfetchLoader] = useState(false)
  const [manageResources, setmanageResources] = useState([])
  const [loaderMR, setloaderMr] = useState(false)


  var healthIDs = []
  console.log("my", healthIDs)

  // const receivingID = (id) => {
  //   sethealthIDs(id)
  // }
  useEffect(() => {
    getmanageResources()
  }, [])
  const getmanageResources = async () => {
    healthIDs = []

    setloaderMr(true)
    try {
      let res = await getApi(`${parentUrl.url}${endPoints.getResourceId}`)
      console.log(res.data)
      if (res) {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].friendlyName != "") {
            console.log("RES", res.data[i])
            healthIDs.push(res.data[i])
            // sethealthIDs(prev => [...prev, res.data[i]])
            console.log(res.data[i].resourceId)
          }
        }
        setloaderMr(false)
        setmanageResources(res.data)
        getResources()
      }

    } catch (error) {
      console.log(error)
    }
  }
  console.log(healthIDs)


  // const getResources = async () => {
  //   setLoader(true)
  //   // const api1 = `${parentUrl.url}${endPoints.generateToken}`;
  //   // const api2 = `${parentUrl.url}${endPoints.getResourceId}`
  //   // axios.all([axios(api1), axios(api2)
  //   // ]).then(res => {
  //   //   localStorage.setItem('token', res[0].data);
  //   //   console.log(res[1])
  //   //   for (let i = 0; i < res[1].data.length; i++) {
  //   //     console.log(res[1].data[i].friendlyName)
  //   //     axios.get(`https://management.azure.com${res[1].data[i].resourceId}/providers/Microsoft.ResourceHealth/availabilityStatuses/current?api-version=2018-07-01`).then(response => {
  //   //       setHealth(previousState => [...previousState, { ...response, friendlyname: res[1].data[i].friendlyName, autoid: res[1].data[i].resourceAutoId }])
  //   //       setLoader(false)
  //   //     }).catch(e => {
  //   //       console.log(e)
  //   //     })
  //   //   }
  //   // })
  // }

  const getResources = async () => {
    debugger;
    setLoader(true)
    try {
      let res = await getApi(`${parentUrl.url}${endPoints.generateToken}`)
      localStorage.setItem('token', res.data);

      if (res) {
        console.log(res)
        setLoader(false)

        for (let i = 0; i < healthIDs.length; i++) {
          console.log(healthIDs[i])
          axios(`https://management.azure.com${healthIDs[i].resourceId}/providers/Microsoft.ResourceHealth/availabilityStatuses/current?api-version=2018-07-01`).then((res) => {
            console.log(res)
            setHealth(previousState => [...previousState, { ...res, friendlyname: healthIDs[i].friendlyName }])
          })
          // console.log(response)


        }

        // healthIDs.map(async (item, i) => {
        //   console.log("res", item)
        //   try {
        //     let response = await getApi(`https://management.azure.com${item.resourceId}/providers/Microsoft.ResourceHealth/availabilityStatuses/current?api-version=2018-07-01`)
        //     console.log(response)
        //     // setHealth(previousState => [...previousState, { ...response, friendlyname: item.friendlyName }])
        //   } catch (error) {
        //     console.log(error)
        //   }
        // })
      }

    } catch (error) {
      setLoader(false)
    }
  }



  return (
    <ResourceContext.Provider value={{ health, loader, setHealth, getResources, fetchloader, manageResources, loaderMR, getmanageResources }}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, }} >
          <Box className="appBar_userprofile">
            <Toolbar>
              <Avatar src="https://pbs.twimg.com/profile_images/1057293119090233344/EEs06nhL_400x400.jpg" sx={{ width: '35px', height: '35px' }} /> &emsp;
              <Typography variant="body" noWrap component="div">
                CI Health Dashboard
              </Typography>
            </Toolbar>
            <UserProfile />
          </Box>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              <NavLink style={({ isActive }) => isActive ? activeStyle : inactiveStyle} to="health">
                <ListItem disablePadding>
                  <ListItemButton>
                    {<LocalHospitalIcon sx={{ color: 'green', marginRight: '10px' }} />}
                    <ListItemText primary="Health Status" />
                  </ListItemButton>
                </ListItem>
              </NavLink>
              <NavLink style={({ isActive }) => isActive ? activeStyle : inactiveStyle} to="insights">
                <ListItem disablePadding>
                  <ListItemButton>
                    {<InsightsIcon sx={{ color: '#6495ED', marginRight: '10px' }} />}
                    <ListItemText primary="Insights" />
                  </ListItemButton>
                </ListItem>
              </NavLink>
              <NavLink style={({ isActive }) => isActive ? activeStyle : inactiveStyle} to="manage-resources">
                <ListItem disablePadding>
                  <ListItemButton>
                    {<ManageAccountsRoundedIcon sx={{ color: 'grey', marginRight: '10px' }} />}
                    <ListItemText primary="Manage Resources" />
                  </ListItemButton>
                </ListItem>
              </NavLink>

            </List>
          </Box>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <PageRoutes />
        </Box>
      </Box >

    </ResourceContext.Provider>
  );
}
