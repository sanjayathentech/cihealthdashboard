import React from 'react'
import { Box, Grid, Stack } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import './Health.css'

const serviceHealths = [
    {
        serviceName: "zaactcoreinteract",
        friendlyName: "Zaact Core Interact",
        statusOverview: "Safe",
        status: "green"
    },
    {
        serviceName: "Athencoreinteract",
        friendlyName: "Athen Core Interact",
        statusOverview: "Warning",
        status: "amber"
    },
    {
        serviceName: "Altigencoreinteract",
        friendlyName: "Altigen Core Interact",
        statusOverview: "Danger",
        status: "red"
    }
]

let colorClass = {
    red: "circleRed",
    amber: "circleAmber",
    green: "circleGreen"
}

function Health() {
    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Box className="tableHeaderContainer">
                <Grid container rowSpacing={0} columnSpacing={2} >
                    <Grid item xs={3}><span className="tableHeader">Service Name</span></Grid>
                    <Grid item xs={6}><span className="tableHeader">Friendly Name</span></Grid>
                    <Grid item xs={3}><span className="tableHeader">Status Overview</span></Grid>
                </Grid>
            </Box>
            <Box>
                {serviceHealths?.map((item, index) => (
                    <Box className="tableRow">
                        <Grid container rowSpacing={0} columnSpacing={3}>
                            <Grid item xs={3}>
                                <Stack direction="row" alignItems="center" gap={2}>
                                    <Box className={colorClass[item.status]} ></Box>
                                    <span>{item.serviceName}</span>
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>{item.friendlyName}</Grid>
                            <Grid item xs={3}>{item.statusOverview}</Grid>
                        </Grid>
                    </Box>
                ))}
            </Box>
        </Box >
    )
}

export default Health


