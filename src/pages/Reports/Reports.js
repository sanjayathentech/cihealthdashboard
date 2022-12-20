import React, { useState, useEffect, useMemo, useContext } from 'react';
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
import { ResourceContext } from '../Dashboard/Sidebar';

const endpointsParams = ["SuccessfulRequests", "FailedRequests", "Capacity", "UnauthorizedRequests"]

let apiManagementinitialState = {
    SuccessfulRequests: {},
    FailedRequests: {},
    Capacity: {},
    UnAuthorized: {}
}

function Reports() {
    const dispatch = useDispatch()
    const [APIManagement, setAPIManagement] = useState({
        SuccessfulRequests: {},
        FailedRequests: {},
        Capacity: {},
        UnauthorizedRequests: {}
    })
    const {
        manageResources,
    } = useContext(ResourceContext);
    console.log(APIManagement)
    const { ResourceTypes, Resources, SelectedResourceType, SelectedResource } = useSelector((state) => state.Reports)

    useEffect(() => {
        dispatch(GetAllresourcesandResourcetype())
    }, [])

    useEffect(() => {
        gettingEndpoints()
    }, [SelectedResourceType])

    const getWorkFlowStatus = () => {
        endpointsParams.map(async (paramsName, index) => {
            try {
                let res = await GetMethod(endPoints.getMetricsAPIManagement(paramsName))
                let [firstItem] = res.data.value
                setAPIManagement(state => ({
                    ...state, [paramsName]: firstItem
                }))
            } catch (error) {
                console.log(error)
            }
        })
    }

    function gettingEndpoints() {
        switch (SelectedResourceType) {
            case 'APIManagement': getWorkFlowStatus()
            case 'LogicApp': return endPoints.getMetricsLogicApp
            case 'BotServices': return endPoints.getMetricsbotServices
            case 'SQLDataBase': return endPoints.getMetricsSQLDatabase
        }
    }

    let subscriptionSelect = useMemo(() => manageResources.filter(x => x.resourceType == SelectedResourceType).filter(x => x.friendlyName != ""), [SelectedResourceType])
    console.log(subscriptionSelect)

    let successfullRequest = useMemo(() => APIManagement?.SuccessfulRequests?.timeseries ? APIManagement?.SuccessfulRequests?.timeseries[0] : [], [APIManagement])
    let failedRequest = useMemo(() => APIManagement?.FailedRequests?.timeseries ? APIManagement?.FailedRequests?.timeseries[0] : [], [APIManagement])
    let capacity = useMemo(() => APIManagement?.Capacity?.timeseries ? APIManagement?.Capacity?.timeseries[0] : [], [APIManagement])
    let UnAuthorized = useMemo(() => APIManagement?.UnauthorizedRequests?.timeseries ? APIManagement?.UnauthorizedRequests?.timeseries[0] : [], [APIManagement])
    return (
        <>
            <Box>
                <Box className="ReportGridContainer">
                    <Box sx={{
                        display: 'flex',
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <span style={{ fontWeight: 600, fontSize: "18px" }}>Resource Health</span>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <span style={{ fontWeight: 500, fontSize: "14px" }}>Subscription</span> &emsp;
                            <FormSelect
                                menuItems={subscriptionSelect.map((x) => ({
                                    name: x.friendlyName, id: x.resourceId
                                }))}
                                labelVisible={false}
                                backGroundColor="#ECEDEF"
                            />

                        </Box>
                    </Box>

                    <Grid container spacing={2} mt={2} mb={2} mr={2}>
                        <Grid item xs={5} md={2} justifyContent={"flex-start"} sx={{ height: "70vh", overflowY: "scroll" }}>
                            <List dense={true}>
                                {ResourceTypes.map((item, index) => (
                                    <Tooltip title={item.resourceTypeFriendlyName.length > 20 ? item.resourceTypeFriendlyName : null} placement="top" followCursor>
                                        <ListItem>
                                            <ListItemButton
                                                onClick={(e) => {
                                                    e.preventDefault()
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
                            {{
                                'APIManagement':
                                    <Grid container >
                                        <Grid item md={6}>
                                            <LineChart xAxis={successfullRequest?.data?.map(x => dayjs(x.timeStamp).format("HH:mm"))} data={successfullRequest?.data?.map(x => x.total)} title="Successfull Request" xAxisName="Time" yAxisName="Count" />
                                        </Grid>
                                        <Grid item md={6}>
                                            <LineChart xAxis={failedRequest?.data?.map(x => dayjs(x.timeStamp).format("HH:mm"))} data={failedRequest?.data?.map(x => x.total)} title="Failed Request" xAxisName="Time" yAxisName="Count" />
                                        </Grid>
                                        <Grid item md={6}>
                                            <LineChart xAxis={capacity?.data?.map(x => dayjs(x.timeStamp).format("HH:mm"))} data={capacity?.data?.map(x => x.average)} title="Capacity" xAxisName="Time" yAxisName="Count" />
                                        </Grid>
                                        <Grid item md={6}>
                                            <LineChart xAxis={UnAuthorized?.data?.map(x => dayjs(x.timeStamp).format("HH:mm"))} data={UnAuthorized?.data?.map(x => x.total)} title="UnAuthorized Request" xAxisName="Time" yAxisName="Count" />
                                        </Grid>

                                    </Grid>,
                                // 'LogicApp': <LineChart xAxis={ChartData?.timeseries[0]?.data.map(x => dayjs(x.timeStamp).format('DD/MM/YYYY'))} data={ChartData?.timeseries[0]?.data.map(x => x.total ? x.total : 0)} title="Run Failure Percentage" xAxisName="Date" yAxisName="Percentage" />,
                                // 'BotServices': <LineChart xAxis={ChartData?.timeseries[0]?.data.map(x => dayjs(x.timeStamp).format("HH:mm"))} data={ChartData?.timeseries[0]?.data.map(x => x.count ? x.count : 0)} title="Request traffic" xAxisName="Time" yAxisName="Count" />,
                                // 'SQLDataBase': <LineChart xAxis={ChartData?.timeseries[0]?.data.map(x => dayjs(x.timeStamp).format('DD/MM/YYYY'))} data={ChartData?.timeseries[0]?.data.map(x => x.total)} title="Total dead locks" xAxisName="Date" yAxisName="Count" />
                            }[SelectedResourceType]}
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
