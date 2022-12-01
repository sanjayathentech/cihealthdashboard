import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Grid, Skeleton, Stack, Tooltip, Fab, Checkbox, Paper } from '@mui/material';
import './Health.css';
import { statusIndicator } from '../../utils/status/statusIndicator';
import { useNavigate } from "react-router-dom";
import { ResourceContext } from '../Dashboard/Sidebar';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import CircularProgress from '@mui/material/CircularProgress';
import { NoBackpackSharp } from '@mui/icons-material';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


let skeletonStyle = {
    height: '20px'
}

let test = [
    {
        friendlyname: "test",
        data: {
            properties: {
                availabilityState: "Available",
                summary: "test"
            }
        }
    },
    {
        friendlyname: "test",
        data: {
            properties: {
                availabilityState: "Unknown",
                summary: "test"
            }
        }
    },
    {
        friendlyname: "test",
        data: {
            properties: {
                availabilityState: "Degraded",
                summary: "test"
            }
        }
    },
    {
        friendlyname: "test",
        data: {
            properties: {
                availabilityState: "Unavailable",
                summary: "test"
            }
        }
    },
    {
        friendlyname: "test",
        data: {
            properties: {
                availabilityState: "Available",
                summary: "test"
            }
        }
    },
]
let SelectConstant = [
    'All', 'Available', 'Unknown', 'Degraded', 'Unavailable'
]


function Health() {

    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const navigate = useNavigate()
    const dummyArray = [1, 2, 3, 4, 5]

    const { health, loader, pullResources, fetchloader, filteredhealth, setfilteredhealth } = useContext(ResourceContext)

    const [age, setAge] = React.useState('All');

    const handleSelectChange = (event) => {
        setAge(event.target.value);
        setfilteredhealth(health.filter((x, index, arr) =>
            (event.target.value === "All" ? arr : x.data.properties.availabilityState === event.target.value)))
    };


    return (
        <>
            {/* <Paper elevation={1}> */}
            <Box className="health-table">
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px"
                    }}
                >
                    <span style={{ fontWeight: 600, fontSize: "18px" }}>Health Status</span>

                    <span style={{ fontWeight: 500, fontSize: "14px", display: 'flex', flexGrow: 1, justifyContent: 'end' }}>Filter by Status</span>
                    &emsp;
                    <FormControl size="small" variant="outlined" sx={{
                        minWidth: 120,
                        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: 'none',
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                            color: "#0A0A0A"
                        },
                    }}>
                        {/* <InputLabel id="demo-simple-select-label" sx={{ 
                             fontFamily: [
                                    '-apple-system',
                                    'BlinkMacSystemFont',
                                    '"Segoe UI"',
                                    'system-ui',
                                    '"Apple Color Emoji"',
                                    '"Segoe UI Emoji"',
                                    '"Segoe UI Web"',
                                    'sans-serif',
                                ].join(','),
                            , fontSize: '14px', fontWeight: 500, display: "flex", alignItems: 'center', justifyContent: "center" }}>By status</InputLabel> */}

                        <Select
                            sx={{
                                fontFamily: [
                                    '-apple-system',
                                    'BlinkMacSystemFont',
                                    '"Segoe UI"',
                                    'system-ui',
                                    '"Apple Color Emoji"',
                                    '"Segoe UI Emoji"',
                                    '"Segoe UI Web"',
                                    'sans-serif',
                                ].join(','),
                                fontSize: '14px', fontWeight: 600, backgroundColor: "#ECEDEF",
                                boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 },
                            }}
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={age}
                            onChange={handleSelectChange}
                            label="Status"
                        >
                            {SelectConstant.map((item, index) => (
                                <MenuItem value={item} sx={{
                                    fontFamily: [
                                        '-apple-system',
                                        'BlinkMacSystemFont',
                                        '"Segoe UI"',
                                        'system-ui',
                                        '"Apple Color Emoji"',
                                        '"Segoe UI Emoji"',
                                        '"Segoe UI Web"',
                                        'sans-serif',
                                    ].join(','), fontSize: '14px', fontWeight: 500
                                }}>{item}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Box className="tableHeaderContainer">
                    <Grid container direction="row"
                        justifyContent="flex-start"
                        alignItems="center" rowSpacing={0} columnSpacing={10}>
                        <Grid item xs={1}><span className="tableHeader">No</span></Grid>
                        <Grid item xs={3}><span className="tableHeader">Status</span></Grid>
                        <Grid item xs={3}><span className="tableHeader">Friendly Name</span></Grid>
                        <Grid item xs={3}><span className="tableHeader">Status Overview</span></Grid>
                    </Grid>
                </Box>
                <Box>

                    {loader ? dummyArray.map((item, index) => (
                        <Box className='loader_spacing'>
                            <Grid container rowSpacing={0} columnSpacing={10}>
                                <Grid item xs={1}>
                                    <Box>
                                        <Skeleton sx={skeletonStyle} />
                                    </Box>
                                </Grid>
                                <Grid item xs={3}>
                                    <Box>
                                        <Skeleton sx={skeletonStyle} />
                                    </Box>
                                </Grid>

                                <Grid item xs={3}><Skeleton sx={skeletonStyle} /></Grid>
                                <Grid item xs={3}><Skeleton sx={skeletonStyle} /></Grid>
                            </Grid>
                        </Box>
                    ))
                        : filteredhealth.map((item, index) => (
                            <Box className="tableRow">
                                <Grid container direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    rowSpacing={0} columnSpacing={10}>
                                    <Grid item xs={1}>
                                        <span>
                                            {index + 1}
                                        </span>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <span>
                                            {
                                                statusIndicator(item.data.properties.availabilityState)
                                            }
                                        </span>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <span>
                                            {item.friendlyname}
                                        </span>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <span >
                                            {item.data.properties.summary}
                                        </span>
                                    </Grid>
                                </Grid>
                            </Box>
                        ))
                    }
                </Box>
            </Box>
            {/* </Paper> */}
        </>
    )
}


export default Health


