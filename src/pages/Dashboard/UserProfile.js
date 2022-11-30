
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
        window.location.href = "/"
    }

    let UserName = sessionStorage.getItem('userName')

    return (
        <Box className="Profile">
            <Box className="pointer" sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: "center",
                gap: '10px'
            }} >
                <span style={{ color: "#808080" }}>{UserName}</span>

                <Avatar onClick={handleClick}
                    sx={{ width: '32px', height: '32px', bgcolor: "#808080" }}

                >{UserName?.charAt(0)?.toUpperCase()}</Avatar>
            </Box>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{
                    fontFamily: "Poppins, sans-serif !important"
                }}
            >
                <Box sx={{ width: '200px' }}>
                    <MenuItem sx={{
                        fontFamily: "Poppins, sans-serif !important"
                    }} className="pointer">
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                    </MenuItem>
                    <MenuItem sx={{
                        fontFamily: "Poppins, sans-serif !important"
                    }} className="pointer" onClick={logOut}>
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


