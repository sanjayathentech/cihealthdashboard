import React from 'react';
import { Grid, Box } from '@mui/material';
import './insights.css';
import FormSelect from '../../components/Forms/FormSelect';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPresence, setSelectedTenant } from '../../Redux/InsightSlice/InsightSlice';


function Insights() {
    const dispatch = useDispatch()
    const { insightsArray, AgentPresence, selectedTenant } = useSelector((state) => state.Insight)
    let sum = AgentPresence?.ready + AgentPresence?.offline + AgentPresence?.notReady + AgentPresence?.busy
    return (
        <>
            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={5} md={12}>
                        <Box sx={{
                            marginBottom: "10px",
                            display: 'flex',
                            justifyContent: "flex-start",
                            alignItems: 'center'
                        }} >
                            <span style={{ fontWeight: 500, fontSize: "14px" }}>Customer</span>
                            &emsp;
                            <FormSelect menuItems={insightsArray} labelVisible={false} backGroundColor="#ffffff" selectOption={selectedTenant}
                                handleSelectChange={(e) => {
                                    dispatch(getUserPresence(e.target.value))
                                    dispatch(setSelectedTenant(e.target.value))
                                }} />
                        </Box>

                        <Box className="workgroup-container">
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
                        </Box>
                        <Box>
                        </Box>
                    </Grid>
                </Grid >
            </Box >

        </>
    )
}

export default Insights