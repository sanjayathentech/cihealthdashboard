
import React, { useState } from "react";

import { Menu, MenuItem, Button, Avatar, Box, ListItemIcon } from "@mui/material";
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';


function UserProfile() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <Box className="Profile">
            <Avatar
                id="basic-button"
                onClick={handleClick}
                sx={{ width: '32px', height: '32px' }}
            />
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <Box sx={{ width: '200px' }}>
                    <MenuItem>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                    </MenuItem>
                    <MenuItem>
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


