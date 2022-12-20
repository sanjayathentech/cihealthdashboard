import React, { useState, useEffect } from 'react';
import { Grid, Box, ListItem, List, ListItemText, ListItemButton, Tooltip } from '@mui/material';
import './reports.css';
import FormSelect from '../../components/Forms/FormSelect';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllresourcesandResourcetype, setSelectedResourceType, setSelectedResources } from "../../Redux/ReportsSlice/ReportSlice"
import { GetMethod, GetMethodwithTimespan } from '../../api/apiMethods/apiMethods';
import { endPoints } from '../../api/apiEndpoints/endPoints';
import BarChart from './Charts/BarChart';
import DeploymentChart from './Charts/DeploymentChart';
import LineChart from './Charts/lineChart';
import dayjs from 'dayjs';


function Reports() {
    const dispatch = useDispatch()
    const [ChartData, setChartData] = useState()

    const { ResourceTypes, Resources, SelectedResourceType, SelectedResource } = useSelector((state) => state.Reports)

    useEffect(() => {
        dispatch(GetAllresourcesandResourcetype())
    }, [])

    console.log(SelectedResourceType)

    useEffect(() => {
        getWorkFlowStatus()
    }, [SelectedResourceType])

    const getWorkFlowStatus = async () => {
        if (SelectedResourceType === "APIManagement" || SelectedResourceType === "LogicApp" || SelectedResourceType === "BotServices" || SelectedResourceType === "SQLDataBase") {
            try {
                let res = await GetMethodwithTimespan(gettingEndpoints())
                let [firstItem] = res.data.value
                setChartData(firstItem)
            } catch (error) {
                console.log(error)
            }
        } else {
            console.log("test")
        }
    }

    function gettingEndpoints() {
        switch (SelectedResourceType) {
            case 'APIManagement': return endPoints.getMetricsAPIManagement()
            case 'LogicApp': return endPoints.getMetricsLogicApp
            case 'BotServices': return endPoints.getMetricsbotServices
            case 'SQLDataBase': return endPoints.getMetricsSQLDatabase
        }
    }

    return (
        <>
            <Box>
                <Box className="ReportGridContainer">
                    <span style={{ fontWeight: 600, fontSize: "18px" }}>Resource Health</span>
                    <Grid container spacing={2} mt={2} mb={2} mr={2}>
                        <Grid item xs={5} md={2} justifyContent={"flex-start"} sx={{ height: "70vh", overflowY: "scroll" }}>
                            <List dense={true}>
                                {ResourceTypes.map((item, index) => (
                                    <Tooltip title={item.resourceTypeFriendlyName.length > 20 ? item.resourceTypeFriendlyName : null} placement="top" followCursor>
                                        <ListItem >
                                            <ListItemButton
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    console.log(item)
                                                    dispatch(setSelectedResourceType(item.resourceTypeFriendlyName))
                                                }}
                                                selected={ResourceTypes[index]?.resourceTypeFriendlyName == SelectedResourceType}
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

                            {SelectedResourceType &&
                                {
                                    'APIManagement': <LineChart xAxis={ChartData?.timeseries[0]?.data.map(x => dayjs(x.timeStamp).format("HH:mm"))} data={ChartData?.timeseries[0]?.data.map(x => x.total)} title="Failed Request" xAxisName="Time" yAxisName="Count" />,
                                    'LogicApp': <LineChart xAxis={ChartData?.timeseries[0]?.data.map(x => dayjs(x.timeStamp).format('DD/MM/YYYY'))} data={ChartData?.timeseries[0]?.data.map(x => x.total ? x.total : 0)} title="Run Failure Percentage" xAxisName="Date" yAxisName="Percentage" />,
                                    'BotServices': <LineChart xAxis={ChartData?.timeseries[0]?.data.map(x => dayjs(x.timeStamp).format("HH:mm"))} data={ChartData?.timeseries[0]?.data.map(x => x.count ? x.count : 0)} title="Request traffic" xAxisName="Time" yAxisName="Count" />,
                                    'SQLDataBase': <LineChart xAxis={ChartData?.timeseries[0]?.data.map(x => dayjs(x.timeStamp).format('DD/MM/YYYY'))} data={ChartData?.timeseries[0]?.data.map(x => x.total)} title="Total dead locks" xAxisName="Date" yAxisName="Count" />
                                }[SelectedResourceType]

                            }

                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}

export default Reports



{/* <Box className='reportTable'>
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
                            </Box> */}
