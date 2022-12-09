import React from 'react';
import { Grid, Box } from '@mui/material';
import './insights.css';
import FormSelect from '../../components/Forms/FormSelect';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPresence, setSelectedTenant } from '../../Redux/InsightSlice/InsightSlice';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import { fontWeight } from '@mui/system';


let CallsDetails = {

    TotalCalls: 20,
    RejectedCalls: 0,
    ActiveCalls: 10,
    ClosedCalls: 10,
    AnsweredCalls: 0,
    InternalalTransferredCalls: 0,
    ExternalTransferredCalls: 0,

}

function Insights() {
    const dispatch = useDispatch()
    const { insightsArray, AgentPresence, selectedTenant } = useSelector((state) => state.Insight)
    let sum = AgentPresence?.ready + AgentPresence?.offline + AgentPresence?.notReady + AgentPresence?.busy
    return (
        <>
            <Box className="insight-container">
                <div style={{ fontWeight: 600, fontSize: "18px", marginBottom: "20px" }}>
                    <span >Insights</span>
                </div>


                <Grid container rowSpacing={2} columnSpacing={4}>
                    <Grid item xs={5} md={12}>
                        <Box sx={{
                            marginBottom: "10px",
                            display: 'flex',
                            justifyContent: "flex-start",
                            alignItems: 'center'
                        }} >
                            <span style={{ fontWeight: 500, fontSize: "14px" }}>Customer</span>
                            &emsp;
                            <FormSelect menuItems={insightsArray} labelVisible={false} backGroundColor="#ECEDEF" selectOption={selectedTenant}
                                handleSelectChange={(e) => {
                                    dispatch(getUserPresence(e.target.value))
                                    dispatch(setSelectedTenant(e.target.value))
                                }} />
                        </Box>


                        <Box>
                        </Box>
                    </Grid>
                    <Grid item md={6}>
                        <Box className="workgroup-team-stats" sx={{ height: '462px' }}>
                            <Grid container spacing={6} >
                                <Grid item md={12}>
                                    <Box className="workgroup-stat-cards-Agents" >

                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: "center",
                                            alignItems: "center",
                                            gap: "40px",
                                            flexDirection: "row"
                                        }}
                                        >
                                            <SupportAgentOutlinedIcon sx={{ color: "#f2784b", paddingLeft: "10px", scale: '4' }} />

                                            <span className="count-text" style={{ fontSize: "28px" }} >{sum ? sum : 0}</span>
                                        </Box>

                                        <span className="name-text" style={{ fontSize: "18px", fontWeight: 600 }}>Total Agents</span>
                                    </Box>
                                </Grid>
                                <Grid item md={6}>
                                    <Box className="workgroup-stat-cards" >
                                        <span className="count-text">{AgentPresence.ready ? AgentPresence.ready : 0}</span>
                                        <span className="name-text" >Available</span>
                                    </Box>
                                </Grid>
                                <Grid item md={6}>
                                    <Box className="workgroup-stat-cards" >
                                        <span className="count-text">{AgentPresence.offline ? AgentPresence.offline : 0}</span>
                                        <span className="name-text">Offline</span>

                                    </Box>
                                </Grid>
                                <Grid item md={6}>
                                    <Box className="workgroup-stat-cards" >
                                        <span className="count-text">{AgentPresence.notReady ? AgentPresence.notReady : 0}</span>
                                        <span className="name-text" >Away</span>
                                    </Box>
                                </Grid>
                                <Grid item md={6}>
                                    <Box className="workgroup-stat-cards">
                                        <span className="count-text">{AgentPresence.busy ? AgentPresence.busy : 0}</span>
                                        <span className="name-text" >Busy</span>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item md={6}>
                        <Box className="workgroup-team-stats">
                            <Grid container spacing={2}>
                                <Grid item md={12}>

                                    <Box className="workgroup-stat-cards-Agents" >

                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: "center",
                                            alignItems: "center",
                                            gap: "40px",
                                            flexDirection: "row"
                                        }}
                                        >
                                            <SupportAgentOutlinedIcon sx={{ color: "#f2784b", paddingLeft: "10px", scale: '4' }} />

                                            <span className="count-text" style={{ fontSize: "28px" }} >{CallsDetails.TotalCalls ? CallsDetails.TotalCalls : 0}</span>
                                        </Box>

                                        <span className="name-text" style={{ fontSize: "18px", fontWeight: 600 }}>Total Calls</span>
                                    </Box>

                                </Grid>
                                <Grid item md={6}>
                                    <Box className="workgroup-stat-cards">
                                        <span className="count-text">{CallsDetails.RejectedCalls ? CallsDetails.RejectedCalls : 0}</span>
                                        <span className="name-text">Rejected Calls</span>
                                    </Box>
                                </Grid>
                                <Grid item md={6}>
                                    <Box className="workgroup-stat-cards">
                                        <span className="count-text">{CallsDetails.ClosedCalls ? CallsDetails.ClosedCalls : 0}</span>
                                        <span className="name-text">Closed Calls </span>

                                    </Box>
                                </Grid>
                                <Grid item md={6}>
                                    <Box className="workgroup-stat-cards">
                                        <span className="count-text">{CallsDetails.ActiveCalls ? CallsDetails.ActiveCalls : 0}</span>
                                        <span className="name-text">Active Calls</span>
                                    </Box>
                                </Grid>
                                <Grid item md={6}>
                                    <Box className="workgroup-stat-cards">
                                        <span className="count-text">{CallsDetails.AnsweredCalls ? CallsDetails.AnsweredCalls : 0}</span>
                                        <span className="name-text">Answered Calls </span>
                                    </Box>
                                </Grid>
                                <Grid item md={6}>
                                    <Box className="workgroup-stat-cards">
                                        <span className="count-text">{CallsDetails.InternalalTransferredCalls ? CallsDetails.InternalalTransferredCalls : 0}</span>
                                        <span className="name-text">Internal Transferred Calls </span>
                                    </Box>
                                </Grid>
                                <Grid item md={6}>
                                    <Box className="workgroup-stat-cards">
                                        <span className="count-text">{CallsDetails.ExternalTransferredCalls ? CallsDetails.ExternalTransferredCalls : 0}</span>
                                        <span className="name-text">External Transferred Calls </span>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>

                </Grid >
            </Box >
            {/* <Box className="workgroup-container">
                <Box className="workgroup-stat">
                    <span className="count-text">{sum ? sum : 0}</span>
                    <span className="name-text">Total Agents</span>
                </Box>
                <Box className="workgroup-stat">
                    <span className="count-text">{AgentPresence.ready ? AgentPresence.ready : 0}</span>
                    <span className="name-text">Available</span>
                </Box>
                <Box className="workgroup-stat">
                    <span className="count-text">{AgentPresence.offline ? AgentPresence.offline : 0}</span>
                    <span className="name-text">Offline</span>

                </Box>
                <Box className="workgroup-stat">
                    <span className="count-text">{AgentPresence.notReady ? AgentPresence.notReady : 0}</span>
                    <span className="name-text">Away</span>
                </Box>
                <Box className="workgroup-stat">
                    <span className="count-text">{AgentPresence.busy ? AgentPresence.busy : 0}</span>
                    <span className="name-text">Busy</span>
                </Box>
            </Box> */}
        </>
    )
}

export default Insights