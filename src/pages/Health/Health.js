import React, { useEffect,useState } from 'react'
import { Box, Button, Grid, Skeleton, Stack, Tooltip } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import './Health.css'
import { getAll, getApi } from '../../api/apiMethods/apiMethods';
import { endPoints } from '../../api/apiEndpoints/endPoints';
import { parentUrl } from '../../api/parentUrl/parentUrl';
import axios from 'axios';
import { statusIndicator } from '../../utils/status/statusIndicator';

let skeletonStyle = {
    height:'20px'
}

function Health() {
 
    useEffect(() => {
        getResources();
    },[])

    const [health,setHealth] = useState([])
    const [loader,setLoader] = useState(false)

    const getResources = async () => {
        setLoader(true)
        const api1 = `${parentUrl.url}${endPoints.generateToken}`;
        const api2 = `${parentUrl.url}${endPoints.getResourceId}`
      axios.all([axios(api1),axios(api2)
      ]).then(res => {
        localStorage.setItem('token',res[0].data);
        for(let i = 0; i < res[1].data.length; i++){
            console.log(res[1].data[i].friendlyName)
            axios(`https://management.azure.com${res[1].data[i].resourceName}/providers/Microsoft.ResourceHealth/availabilityStatuses/current?api-version=2018-07-01`).then(response => {
            setHealth(previousState => [...previousState,{...response, friendlyname : res[1].data[i].friendlyName }])
            setLoader(false)
            }).catch(e => {
                console.log(e)
            })  
        }
      }) 
    }

    console.log(health);

    const dummyArray = [1,2,3,4,5]
  



    return (
        <>
         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Box className="tableHeaderContainer">
                <Grid container  direction="row"
  justifyContent="flex-start"
  alignItems="center" rowSpacing={0} columnSpacing={10}>
                    <Grid item xs={1}><span className="tableHeader">Status</span></Grid>
                    <Grid item xs={3}><span className="tableHeader">Friendly Name</span></Grid>
                    <Grid item xs={7}><span className="tableHeader">Status Overview</span></Grid>
                </Grid>
            </Box>
            <Box>

            {loader ? dummyArray.map((item,index) => (
                <Box className='loader_spacing'>
                <Grid container rowSpacing={0} columnSpacing={10}>
                    <Grid item xs={1}>
                        <Box>
                        <Skeleton sx={skeletonStyle}/>
                        </Box>
                        </Grid>
                  
                    <Grid item xs={3}><Skeleton sx={skeletonStyle}/></Grid>
                    <Grid item xs={7}><Skeleton sx={skeletonStyle}/></Grid> 
                </Grid>
            </Box>
            ))
                  :  health?.map((item, index) => (
                    <Box className="tableRow">
                        <Grid container   direction="row"
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
        </Box>   
        </>
    )
}


export default Health


