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


import "./Dashboard.css";
import UserProfile from './UserProfile';
import { NavLink } from 'react-router-dom';

const drawerWidth = 170;
let activeStyle = {
  color: "black",
  textDecoration: "none",
};
let inactiveStyle = {
  color: "grey",
  textDecoration: "none"
};
export default function Sidebar({ Children }) {
  return (
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
                  {<LocalHospitalIcon sx={{ color: 'green' }} />}
                  <ListItemText primary="Health Status" />
                </ListItemButton>
              </ListItem>
            </NavLink>
            <NavLink style={({ isActive }) => isActive ? activeStyle : inactiveStyle} to="insights">
              <ListItem disablePadding>
                <ListItemButton>
                  {<InsightsIcon sx={{ color: '#6495ED' }} />}
                  <ListItemText primary="Insights" />
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
  );
}
