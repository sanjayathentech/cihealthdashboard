
import React, { useState } from "react";

import { Menu, MenuItem, Button, Avatar, Box } from "@mui/material";


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
                <Box sx={{ width: '250px' }}>
                    <MenuItem>Profile</MenuItem>
                    <MenuItem>Reset Password</MenuItem>
                    <MenuItem>Settings</MenuItem>
                </Box>
            </Menu>
        </Box>
    )
}

export default UserProfile


