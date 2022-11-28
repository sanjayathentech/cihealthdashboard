
import React, { useState } from "react";

import { Menu, MenuItem, Button, Avatar, Box, ListItemIcon } from "@mui/material";
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';



function UserProfile() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logOut = () => {
        localStorage.clear()
        sessionStorage.clear()
        window.location.href="/"
    }

    return (
        <Box className="Profile">
            <PersonIcon onClick={handleClick}
                sx={{ width: '28px', height: '28px' }}
                className="pointer" />
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <Box sx={{ width: '200px' }}>
                    <MenuItem className="pointer">
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                    </MenuItem>
                    <MenuItem className="pointer" onClick={logOut}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Box>
            </Menu>
        </Box>
    )
}

export default UserProfile


