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

import "./Dashboard.css";
import UserProfile from './UserProfile';
import { NavLink, useNavigate } from 'react-router-dom';

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


  useEffect(() => {
    getResources();
  }, [])


  const [health, setHealth] = useState([])
  const [loader, setLoader] = useState(false)

  const getResources = async () => {
    setLoader(true)
    const api1 = `${parentUrl.url}${endPoints.generateToken}`;
    const api2 = `${parentUrl.url}${endPoints.getResourceId}`
    axios.all([axios(api1), axios(api2)
    ]).then(res => {
      localStorage.setItem('token', res[0].data);

      const config = {
        headers: {
          "Retry-After": 2000
        }
      };
      for (let i = 0; i < res[1].data.length; i++) {
        console.log(res[1].data[i].friendlyName)
        setTimeout(function () {
          axios.get(`https://management.azure.com${res[1].data[i].resourceId}/providers/Microsoft.ResourceHealth/availabilityStatuses/current?api-version=2018-07-01`, config).then(response => {
            setHealth(previousState => [...previousState, { ...response, friendlyname: res[1].data[i].friendlyName }])
            setLoader(false)
          }).catch(e => {
            console.log(e)
          })
        }, 1000);

      }
    })
  }

  return (
    <ResourceContext.Provider value={{ health, loader, setHealth }}>
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
