import React, { useEffect } from 'react'
import { Box, Grid, Stack } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import './Health.css'
import axios from 'axios';

const serviceHealths = [
    {
        serviceName: "zaactcoreinteract",
        friendlyName: "Zaact Core Interact",
        statusOverview: "Healthy",
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

    useEffect(() => {

        getResources()

    }, [])

    const getResources = async () => {
        try {
            let res = await axios.get("https://zaacthealthcheck.azurewebsites.net/a10f46b9-0853-4b30-99bc-73c642177ec5/Resources")
            console.log(res)
        }
        catch (error) {
            console.log(error)
        }

    }
    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Box className="tableHeaderContainer">
                <Grid container rowSpacing={0} columnSpacing={2}>
                    <Grid item xs={1}><span className="tableHeader">Status</span></Grid>
                    <Grid item xs={3}><span className="tableHeader">Service Name</span></Grid>
                    <Grid item xs={4}><span className="tableHeader">Friendly Name</span></Grid>
                    <Grid item xs={3}><span className="tableHeader">Status Overview</span></Grid>
                </Grid>
            </Box>
            <Box>
                {serviceHealths?.map((item, index) => (
                    <Box className="tableRow">
                        <Grid container rowSpacing={0} columnSpacing={3}>
                            <Grid item xs={1}><Box className={colorClass[item.status]} ></Box></Grid>
                            <Grid item xs={3}>
                                <Stack direction="row" alignItems="center" gap={2}>
                                    <span>{item.serviceName}</span>
                                </Stack>
                            </Grid>
                            <Grid item xs={4}>{item.friendlyName}</Grid>
                            <Grid item xs={3}>{item.statusOverview}</Grid>
                        </Grid>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default Health


