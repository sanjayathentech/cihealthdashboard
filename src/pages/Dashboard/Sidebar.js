import * as React from 'react';
import { Box, Grid, Stack } from '@mui/material';
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

import "./Dashboard.css";
import UserProfile from './UserProfile';

const drawerWidth = 240;

export default function Sidebar({ Children }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Box className="appBar_userprofile">
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
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
            <ListItem disablePadding>
              <ListItemButton >
                <ListItemIcon>
                  {<LocalHospitalIcon />}
                </ListItemIcon>
                <ListItemText primary="Health" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <PageRoutes />
    </Box>
  );
}
