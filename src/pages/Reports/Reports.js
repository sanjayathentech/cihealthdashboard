import React, { useState, useEffect, useMemo, useContext } from 'react';
import { Grid, Box, ListItem, List, ListItemText, ListItemButton, Tooltip } from '@mui/material';
import './reports.css';
import FormSelect from '../../components/Forms/FormSelect';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllresourcesandResourcetype, setSelectedResourceType, setSelectedResources, setSelectedResourceId } from "../../Redux/ReportsSlice/ReportSlice"
import { GetMethod, GetMethodwithTimespan } from '../../api/apiMethods/apiMethods';
import { endPoints } from '../../api/apiEndpoints/endPoints';
import BarChart from './Charts/BarChart';
import DeploymentChart from './Charts/DeploymentChart';
import LineChart from './Charts/lineChart';
import dayjs from 'dayjs';
import { ResourceContext } from '../Dashboard/Sidebar';

import { GetApiManagement, GetLogicApp, GetSqlDatabase, GetAppServiceSite } from "../../Redux/ReportsSlice/ReportSlice"
import StackedLineChart from './Charts/StackedLineChart';
import loaderGIF from '../../assets/loadergif.gif'
import StackedChart2 from './Charts/StackedChart2';

const endpointsParams = ["SuccessfulRequests", "FailedRequests", "Capacity", "UnauthorizedRequests"]

function Reports() {
    const dispatch = useDispatch()
    const {
        manageResources,
    } = useContext(ResourceContext);
    const [selectedResources, setselectedResources] = useState([])

    let logicAppSelect = useMemo(() => selectedResources.filter(x => x.friendlyName != ""), [selectedResources])
    const { ResourceTypes, Resources, SelectedResourceType, SelectedResource, resourceId, metricsLoader } = useSelector((state) => state.Reports)
    const [Loader, setLoader] = useState(false)

    const { apiManagement, logicApp, sqlDatabase, AppServiceSite } = useSelector((state) => state.Reports)

    let ResourceSelect = useMemo(() => manageResources.filter(x => x.resourceType == SelectedResourceType).filter(i => i.friendlyName != ""), [SelectedResourceType])

    useEffect(() => {
        dispatch(GetAllresourcesandResourcetype())
    }, [])

    useEffect(() => {
        FunctionBasedonResourceType()
    }, [SelectedResourceType, resourceId])

    useEffect(() => {
        if (selectedResources[0]) {

            if (SelectedResourceType == "LogicApp") {
                dispatch(setSelectedResourceId(selectedResources[0]?.resourceId))
            } else {
                if (logicAppSelect[0]) {
                    dispatch(setSelectedResourceId(logicAppSelect[0]?.resourceId))
                }
            }
        }
    }, [SelectedResourceType, selectedResources, logicAppSelect])
    useEffect(() => {

        getResources()
    }, [SelectedResourceType])


    const getResources = async () => {
        try {
            let res = await GetMethod(endPoints.getResourcesbysubidandresourceid(SelectedResourceType))
            setselectedResources(res?.data)
        } catch (error) {
            console.log(error)
        }
    }

    function FunctionBasedonResourceType() {
        switch (SelectedResourceType) {
            case 'APIManagement': dispatch(GetApiManagement(resourceId)); break;
            case 'LogicApp': dispatch(GetLogicApp(resourceId)); break;
            case 'AppServiceSite': dispatch(GetAppServiceSite(resourceId)); break;
            case 'SQLDataBase': dispatch(GetSqlDatabase(resourceId)); break;
        }
    }


    console.log(logicAppSelect)

    let series400 = [
        {
            name: '4xx',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            showSymbol: false,
            data: AppServiceSite?.http4xxCount
        },
        {
            name: '401',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            showSymbol: false,
            data: AppServiceSite?.http401Count
        },
        {
            name: '403',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            showSymbol: false,
            data: AppServiceSite?.http403Count
        },
        {
            name: '404',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            showSymbol: false,
            data: AppServiceSite?.http404Count
        },
        {
            name: '406',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            showSymbol: false,
            data: AppServiceSite?.http406Count
        },
    ]

    let seriesxx = [
        {
            name: '3xx',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            showSymbol: false,
            data: AppServiceSite?.http3xxCount
        },
        {
            name: '5xx',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            showSymbol: false,
            data: AppServiceSite?.http5xxCount
        },

    ]

    return (
        <>
            <Box>
                <Box className="ReportGridContainer">
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: "100px"
                        }}
                    >
                        <span style={{ fontWeight: 600, fontSize: "18px" }}>Resource Health</span>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <span style={{ fontWeight: 500, fontSize: "14px" }}>Resource</span> &emsp;
                            <FormSelect
                                menuItems={SelectedResourceType == "LogicApp" ? selectedResources?.map((x) => ({
                                    name: x.resourceName, id: x.resourceId
                                })) : logicAppSelect.map((x) => ({
                                    name: x.friendlyName, id: x.resourceId
                                }))
                                }
                                handleSelectChange={(e) => {
                                    dispatch(setSelectedResourceId(e.target.value))
                                }}
                                selectOption={resourceId}
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

                            {metricsLoader ? <div
                                style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}
                            ><img style={{ height: "20px", widht: "20px" }} src={loaderGIF}></img></div> : {
                                'APIManagement':
                                    <Grid container>
                                        <Grid item md={6}>
                                            <LineChart xAxis={apiManagement?.successFulRequestsTime?.map(x => dayjs(x).format("HH:mm"))} data={apiManagement?.successFulRequestsCount} title="Successfull Request" xAxisName="Time" yAxisName="Count" />
                                        </Grid>
                                        <Grid item md={6}>
                                            <LineChart xAxis={apiManagement?.failedRequestsTime?.map(x => dayjs(x).format("HH:mm"))} data={apiManagement?.failedRequestsCount} title="Failed Request" xAxisName="Time" yAxisName="Count" />
                                        </Grid>
                                        <Grid item md={6}>
                                            <LineChart xAxis={apiManagement?.capacityTime?.map(x => dayjs(x).format("HH:mm"))} data={apiManagement?.capacityAverage} title="Capacity" xAxisName="Time" yAxisName="Count" />
                                        </Grid>
                                        <Grid item md={6}>
                                            <LineChart xAxis={apiManagement?.unAuthorizedRequestsTime?.map(x => dayjs(x).format("HH:mm"))} data={apiManagement?.unAuthorizedRequestsCount} title="Un authorized Request" xAxisName="Time" yAxisName="Count" />
                                        </Grid>
                                    </Grid>,
                                'LogicApp':
                                    <Grid container>
                                        <Grid item md={6}>
                                            <LineChart xAxis={logicApp?.actionsFailedTime?.map(x => dayjs(x).format("HH:mm"))} data={logicApp?.actionsFailedCount} title="Action Failed" xAxisName="Time" yAxisName="Count" />
                                        </Grid>
                                        <Grid item md={6}>
                                            <LineChart xAxis={logicApp?.runsFailedTime?.map(x => dayjs(x).format("HH:mm"))} data={logicApp?.runsFailedCount} title="Run Failed" xAxisName="Time" yAxisName="Count" />
                                        </Grid>
                                        <Grid item md={6}>
                                            <LineChart xAxis={logicApp?.totalBillableExecutionsTime?.map(x => dayjs(x).format("HH:mm"))} data={logicApp?.totalBillableExecutions} title="Total Bill Execution" xAxisName="Time" yAxisName="Count" />
                                        </Grid>
                                        <Grid item md={6}>
                                            <LineChart xAxis={logicApp?.triggersFailedTime?.map(x => dayjs(x).format("HH:mm"))} data={logicApp?.triggersFailedCount} title="Trigger Failed Time" xAxisName="Time" yAxisName="Count" />
                                        </Grid>
                                    </Grid>,
                                'SQLDataBase':
                                    <Grid container >
                                        <Grid item md={6}>
                                            <LineChart xAxis={sqlDatabase?.connectionFailedTime?.map(x => dayjs(x).format("HH:mm"))} data={sqlDatabase?.connectionFailedCount} title="Connection Failed" xAxisName="Time" yAxisName="Count" />
                                        </Grid>
                                        <Grid item md={6}>
                                            <LineChart xAxis={sqlDatabase?.connectionSuccessTime?.map(x => dayjs(x).format("HH:mm"))} data={sqlDatabase?.connectionSuccessCount} title="Connection Success" xAxisName="Time" yAxisName="Count" />
                                        </Grid>
                                        <Grid item md={6}>
                                            <LineChart xAxis={sqlDatabase?.cpuPercentTime?.map(x => dayjs(x).format("HH:mm"))} data={sqlDatabase?.cpuPercentCount} title="CPU Percent" xAxisName="Time" yAxisName="Count" />
                                        </Grid>
                                        <Grid item md={6}>
                                            <LineChart xAxis={sqlDatabase?.connectionFailedUserErrorTime?.map(x => dayjs(x).format("HH:mm"))} data={sqlDatabase?.connectionFailedUserErrorCount} title="Connection Failed User Error" xAxisName="Time" yAxisName="Count" />
                                        </Grid>
                                    </Grid>,
                                'AppServiceSite':
                                    <Grid container>
                                        <Grid item md={6}>
                                            <LineChart xAxis={AppServiceSite?.requestsTime?.map(x => dayjs(x).format("HH:mm"))} data={AppServiceSite?.http2xxCount} title="Http 2xx" xAxisName="Time" yAxisName="Count" />
                                        </Grid>
                                        <Grid item md={6}>
                                            <StackedLineChart series={series400} xAxis={AppServiceSite?.requestsTime?.map(x => dayjs(x).format("HH:mm"))} title="Http 400" xAxisName="Time" yAxisName="Count" />
                                        </Grid>
                                        <Grid item md={6}>
                                            <StackedLineChart series={seriesxx} xAxis={AppServiceSite?.requestsTime?.map(x => dayjs(x).format("HH:mm"))} title="Http 3xx & Http 5xx" xAxisName="Time" yAxisName="Count" />
                                        </Grid>
                                        <Grid item md={6}>
                                            <LineChart xAxis={AppServiceSite?.requestsTime?.map(x => dayjs(x).format("HH:mm"))} data={AppServiceSite?.http101Count} title="Http 101" xAxisName="Time" yAxisName="Count" />
                                        </Grid>
                                    </Grid>,

                            }[SelectedResourceType]}
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}

export default Reports

let status400 = {
    "4xx": "http4xxCount"
}
