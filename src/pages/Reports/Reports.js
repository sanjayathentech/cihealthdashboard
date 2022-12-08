import React, { useState, useEffect } from 'react';
import { Grid, Box, ListItem, List, ListItemText, ListItemButton, Tooltip } from '@mui/material';
import './reports.css';
import FormSelect from '../../components/Forms/FormSelect';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllresourcesandResourcetype, setSelectedResourceType, setSelectedResources } from "../../Redux/ReportsSlice/ReportSlice"
import { GetMethod } from '../../api/apiMethods/apiMethods';
import { endPoints } from '../../api/apiEndpoints/endPoints';
import BarChart from './Charts/BarChart';
import DeploymentChart from './Charts/DeploymentChart';

function Reports() {
    const dispatch = useDispatch()
    // const [WorkflowStatus, setWorkflowStatus] = useState([])


    const { ResourceTypes, Resources, SelectedResourceType, SelectedResource } = useSelector((state) => state.Reports)

    useEffect(() => {
        dispatch(GetAllresourcesandResourcetype())
    }, [])
    // useEffect(() => {
    //     if (SelectedResource) {
    //         getWorkFlowStatus()
    //     }

    // }, [SelectedResource])

    // const getWorkFlowStatus = async () => {
    //     try {
    //         let res = await GetMethod(gettingEndpoints(SelectedResource))
    //         setWorkflowStatus(res.data ?? [])
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // function gettingEndpoints(id) {
    //     switch (SelectedResourceType) {
    //         case 'LogicApp': return endPoints.getWorkflowStatus(id);
    //         case 'AppServiceSite': return endPoints.getDeploymentslotsstatus(id);
    //         case 'AppServiceSiteSlot': return endPoints.getDeploymentslotsstatus(id);
    //     }
    // }

    return (
        <>
            <Box>
                <Box className="ReportGridContainer">
                    <span style={{ fontWeight: 600, fontSize: "18px" }}>Resource Types</span>
                    <Grid container spacing={2} mt={2} mb={2} mr={2}>
                        <Grid item xs={5} md={2} justifyContent={"flex-start"} sx={{ height: "70vh", overflowY: "scroll" }}>
                            <List dense={true}>
                                {ResourceTypes.map((item, index) => (
                                    <Tooltip title={item.resourceTypeFriendlyName.length > 20 ? item.resourceTypeFriendlyName : null} placement="top" followCursor>
                                        <ListItem >
                                            <ListItemButton
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    dispatch(setSelectedResourceType(item.resourceTypeFriendlyName))
                                                }}
                                                selected={item.resourceTypeFriendlyName == SelectedResourceType}
                                                sx={{
                                                    "&.Mui-selected": {
                                                        backgroundColor: "#ECEDEF",
                                                        color: "#1E1E1E",
                                                        fontWeight: 600
                                                    },
                                                }}
                                            >
                                                <ListItemText
                                                    sx={{
                                                        overflow: "hidden", textOverflow: "ellipsis", color: "#141414"
                                                    }} primary={item.resourceTypeFriendlyName} />
                                            </ListItemButton>
                                        </ListItem>
                                    </Tooltip>
                                ))}
                            </List>
                        </Grid>
                        <Grid item xs={5} md={10}>
                            <Box className='reportTable'>
                                <Box className='reportHeader'>
                                    <Grid container>
                                        <Grid item xs={3}>
                                            <span>No</span>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <span>Test Details</span>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <span>Test Details</span>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box className='reportRow'>
                                    <Grid container>
                                        <Grid item xs={3}>
                                            <span>1</span>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <span>Test</span>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <span>Test</span>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}

export default Reports




