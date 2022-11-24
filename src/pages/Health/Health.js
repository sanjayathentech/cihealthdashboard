import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Grid, Skeleton, Stack, Tooltip, Fab } from '@mui/material';
import './Health.css';
import { statusIndicator } from '../../utils/status/statusIndicator';
import { useNavigate } from "react-router-dom";
import { ResourceContext } from '../Dashboard/Sidebar';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import CircularProgress from '@mui/material/CircularProgress';
import { NoBackpackSharp } from '@mui/icons-material';


let skeletonStyle = {
    height: '20px'
}


function Health() {

    const navigate = useNavigate()
    const dummyArray = [1, 2, 3, 4, 5]

    const { health, loader, pullResources, fetchloader } = useContext(ResourceContext)

    return (
        <>

            <Box className="tableHeaderContainer">
                <Grid container direction="row"
                    justifyContent="flex-start"
                    alignItems="center" rowSpacing={0} columnSpacing={10}>
                    <Grid item xs={1}><span className="tableHeader">Status</span></Grid>
                    <Grid item xs={3}><span className="tableHeader">Friendly Name</span></Grid>
                    <Grid item xs={7}><span className="tableHeader">Status Overview</span></Grid>
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

                            <Grid item xs={3}><Skeleton sx={skeletonStyle} /></Grid>
                            <Grid item xs={7}><Skeleton sx={skeletonStyle} /></Grid>
                        </Grid>
                    </Box>
                ))
                    : health.filter(x => x.friendlyname != "")?.map((item, index) => (
                        <Box className="tableRow" onClick={() => navigate('/insights')}>
                            <Grid container direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                rowSpacing={0} columnSpacing={10}>
                                <Grid item xs={1}>
                                    <Box>
                                        {
                                            statusIndicator(item.data.properties.availabilityState)
                                        }
                                    </Box>
                                </Grid>
                                <Grid item xs={3}>
                                    <Box className="data">
                                        {item.friendlyname}
                                    </Box>
                                </Grid>
                                <Grid item xs={7}>
                                    <Box className="health_data">
                                        {item.data.properties.summary}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    ))
                }
            </Box>

        </>
    )
}


export default Health


