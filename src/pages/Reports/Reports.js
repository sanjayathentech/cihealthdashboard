import React, { useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import './reports.css';
import FormSelect from '../../components/Forms/FormSelect';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllresourcesandResourcetype, setSelectedResourceType, setSelectedResources } from "../../Redux/ReportsSlice/ReportSlice"
import { GetMethod } from '../../api/apiMethods/apiMethods';
import { endPoints } from '../../api/apiEndpoints/endPoints';
import BarChart from './Charts/BarChart';

function Reports() {
    const dispatch = useDispatch()

    const [SelectedResource1, setSelectedResource] = useState("")
    const [WorkflowStatus, setWorkflowStatus] = useState([])


    const { ResourceTypes, Resources, SelectedResourceType, SelectedResource } = useSelector((state) => state.Reports)

    useEffect(() => {
        dispatch(GetAllresourcesandResourcetype())
    }, [])
    useEffect(() => {
        if (SelectedResource) {
            getWorkFlowStatus()
        }

    }, [SelectedResource])


    console.log(Resources)
    const handleSelect = (e) => {
        dispatch(setSelectedResourceType(e.target.value))
    }

    const getWorkFlowStatus = async () => {
        try {
            let res = await GetMethod(endPoints.getWorkflowStatus(SelectedResource))
            setWorkflowStatus(res.data)
        } catch (error) {
            console.log(error)
        }
    }


    let WorkFlows = WorkflowStatus.map((x) => (x.workFlows))

    return (
        <>
            <Box>
                <Grid container spacing={2} mb={4}>
                    <Grid item xs={5} md={12}>
                        <Box sx={{
                            marginBottom: "10px",
                            display: 'flex',
                            justifyContent: "flex-start",
                            alignItems: 'center',
                            gap: "20px"
                        }} >
                            <FormSelect menuItems={ResourceTypes.map((x) => ({ name: x.resourceTypeFriendlyName, id: x.resourceTypeFriendlyName }))}
                                labelVisible={false}
                                backGroundColor="#ffffff"
                                selectOption={SelectedResourceType}
                                handleSelectChange={handleSelect}
                            />
                            <FormSelect
                                menuItems={Resources.map((x) => ({ name: x.friendlyName ? x.friendlyName : x.resourceName, id: x.resourceId }))}
                                labelVisible={false}
                                backGroundColor="#ffffff"
                                selectOption={SelectedResource}
                                handleSelectChange={({ target }) => {
                                    dispatch(setSelectedResources(target.value))
                                }}
                            />
                        </Box>
                        <Box>
                        </Box>
                    </Grid>
                </Grid>

                {SelectedResource &&
                    {
                        'LogicApp': <BarChart YAxis={WorkflowStatus.map(x => x.date)} Succeeded={WorkFlows.map((x) => (x.filter((item, index) => item.status == "Succeeded").length))} Failed={WorkFlows.map((x) => (x.filter((j, index) => j.status != "Succeeded").length))} />,
                        'AppService': <AppService />,
                        'SQLDataBase': <SQLDatabase />
                    }[SelectedResourceType]
                }
            </Box >

        </>
    )
}

export default Reports



function LogicApp() {
    return (
        <>
            {/* <Box className="reportTable">
                <Box className="reportHeader">
                    <Grid container direction="row"
                        justifyContent="flex-start"
                        alignItems="center" rowSpacing={0} columnSpacing={10}>
                        <Grid item xs={1}><span>No</span></Grid>
                        <Grid item xs={3}><span>Status</span></Grid>
                        <Grid item xs={3}><span>Overview</span></Grid>
                        <Grid item xs={3}><span>Usage</span></Grid>
                    </Grid>
                </Box>
                <Box className="reportRow">
                    <Grid container direction="row"
                        justifyContent="flex-start"
                        alignItems="center" rowSpacing={0} columnSpacing={10}>
                        <Grid item xs={1}><span>1</span></Grid>
                        <Grid item xs={3}><span>Test</span></Grid>
                        <Grid item xs={3}><span>Test</span></Grid>
                        <Grid item xs={3}><span> Test Detials</span></Grid>
                    </Grid>
                </Box>
            </Box> */}

        </>
    )
}

function AppService() {
    return (
        <div>AppService</div>
    )
}

function SQLDatabase() {
    return (
        <div>SQLDatabase</div>
    )
}
