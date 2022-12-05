import React from 'react';
import { Grid, Box, Paper, Badge, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import './insights.css';
import FormSelect from '../../components/Forms/FormSelect';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPresence, setSelectedTenant } from '../../Redux/InsightSlice/InsightSlice';


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

function Insights() {

    const dispatch = useDispatch()
    const { insightsArray, AgentPresence, selectedTenant } = useSelector((state) => state.Insight)
    let sum = AgentPresence?.ready + AgentPresence?.offline + AgentPresence?.notReady + AgentPresence?.busy
    return (
        <Box>
            <Grid container spacing={2}>

                <Grid item xs={5} md={12}>
                    <Box sx={{
                        marginBottom: "10px",
                        display: 'flex',
                        justifyContent: "flex-start",
                        alignItems: 'center'
                    }} >
                        <span style={{ fontWeight: 500, fontSize: "14px" }}>Select Tenant</span>
                        &emsp;
                        <FormSelect menuItems={insightsArray} labelVisible={false} backGroundColor="#ffffff" selectOption={selectedTenant}
                            handleSelectChange={(e) => {
                                dispatch(getUserPresence(e.target.value))
                                dispatch(setSelectedTenant(e.target.value))

                            }} />
                    </Box>

                    <Box className="workgroup-container" >

                        <Box className="workgroup-stat">
                            <span className="count-text">{sum}</span>
                            <span className="name-text">Total Agents</span>

                        </Box>
                        <Box className="workgroup-stat">
                            <span className="count-text">{AgentPresence.ready}</span>
                            <span className="name-text">Available</span>

                        </Box>
                        <Box className="workgroup-stat">
                            <span className="count-text">{AgentPresence.offline}</span>
                            <span className="name-text">Offline</span>

                        </Box>
                        <Box className="workgroup-stat">
                            <span className="count-text">{AgentPresence.notReady}</span>
                            <span className="name-text">Away</span>

                        </Box>
                        <Box className="workgroup-stat">
                            <span className="count-text">{AgentPresence.busy}</span>
                            <span className="name-text">Busy</span>

                        </Box>
                    </Box>
                    <Box>
                        {/* <Grid container spacing={2}>
                            {workgroupStatsCards.map((item, index) => (
                                <Grid item xs={4} md={2}>
                                    <Box className="workgroup-stat-cards" sx={{
                                        borderBottom: `6px solid ${item.status == "red" ? "#FF5733" : item.status == "blue" ? "#6495ED" : "#50C878"}`
                                    }}>
                                        <span className="count-text">{item.count}</span>
                                        <span className="name-text">{item.name}</span>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid> */}
                    </Box>
                </Grid>

            </Grid >
        </Box >

    )
}

export default Insights