import React from 'react'
import { Grid, Box, Paper, Badge, Avatar } from '@mui/material'
import { styled } from '@mui/material/styles';
import './insights.css'


const workgroupStats = [
    {
        count: 2,
        name: "Total Agents"
    },
    {
        count: 5,
        name: "Available"
    },
    {
        count: 10,
        name: "Away"
    },
    {
        count: 11,
        name: "Busy"
    },
    {
        count: 5,
        name: "Busy"
    },

]
const workgroupStatsCards = [
    {
        count: 2,
        name: "Total Agents",
        status: "red"
    },
    {
        count: 5,
        name: "Available",
        status: "blue"
    },
    {
        count: 10,
        name: "Away",
        status: "green"
    },
    {
        count: 11,
        name: "Busy",
        status: "blue"
    },
    {
        count: 5,
        name: "Busy",
        status: "green"
    },
    {
        count: 5,
        name: "Busy",
        status: "blue"
    },
    {
        count: 5,
        name: "Busy",
        status: "red"
    },
    {
        count: 5,
        name: "Busy",
        status: "green"
    },
    {
        count: 5,
        name: "Busy",
        status: "blue"
    },
    {
        count: 5,
        name: "Busy",
        status: "green"
    },
    {
        count: 5,
        name: "Busy",
        status: "green"
    },

]

const workgroupteamstats = [
    {
        name: "Chris Rock",
        status: "Active",
        completedConvo: 2,
        ActiveConversations: "02: 00",
        AverageConversationTime: "10 Min",
        TotalConversationTime: "1 hr",
    },
    {
        name: "Lewis",
        status: "Offline",
        completedConvo: 2,
        ActiveConversations: "02: 00",
        AverageConversationTime: "10 Min",
        TotalConversationTime: "1 hr",
    },
    {
        name: "Joe Rogan",
        status: "Offline",
        completedConvo: 2,
        ActiveConversations: "02: 00",
        AverageConversationTime: "10 Min",
        TotalConversationTime: "1 hr",
    },
    {
        name: "Joe Rogan",
        status: "Offline",
        completedConvo: 2,
        ActiveConversations: "02: 00",
        AverageConversationTime: "10 Min",
        TotalConversationTime: "1 hr",
    },
    {
        name: "Joe Rogan",
        status: "Offline",
        completedConvo: 2,
        ActiveConversations: "02: 00",
        AverageConversationTime: "10 Min",
        TotalConversationTime: "1 hr",
    },
    {
        name: "Joe Rogan",
        status: "Offline",
        completedConvo: 2,
        ActiveConversations: "02: 00",
        AverageConversationTime: "10 Min",
        TotalConversationTime: "1 hr",
    },
    {
        name: "Joe Rogan",
        status: "Offline",
        completedConvo: 2,
        ActiveConversations: "02: 00",
        AverageConversationTime: "10 Min",
        TotalConversationTime: "1 hr",
    },
    {
        name: "Joe Rogan",
        status: "Offline",
        completedConvo: 2,
        ActiveConversations: "02: 00",
        AverageConversationTime: "10 Min",
        TotalConversationTime: "1 hr",
    },
    {
        name: "Joe Rogan",
        status: "Offline",
        completedConvo: 2,
        ActiveConversations: "02: 00",
        AverageConversationTime: "10 Min",
        TotalConversationTime: "1 hr",
    },
    {
        name: "Joe Rogan",
        status: "Offline",
        completedConvo: 2,
        ActiveConversations: "02: 00",
        AverageConversationTime: "10 Min",
        TotalConversationTime: "1 hr",
    },
    {
        name: "Joe Rogan",
        status: "Offline",
        completedConvo: 2,
        ActiveConversations: "02: 00",
        AverageConversationTime: "10 Min",
        TotalConversationTime: "1 hr",
    },
    {
        name: "Joe Rogan",
        status: "Offline",
        completedConvo: 2,
        ActiveConversations: "02: 00",
        AverageConversationTime: "10 Min",
        TotalConversationTime: "1 hr",
    },
    {
        name: "Joe Rogan",
        status: "Offline",
        completedConvo: 2,
        ActiveConversations: "02: 00",
        AverageConversationTime: "10 Min",
        TotalConversationTime: "1 hr",
    },
    {
        name: "Joe Rogan",
        status: "Offline",
        completedConvo: 2,
        ActiveConversations: "02: 00",
        AverageConversationTime: "10 Min",
        TotalConversationTime: "1 hr",
    }, {
        name: "Joe Rogan",
        status: "Offline",
        completedConvo: 2,
        ActiveConversations: "02: 00",
        AverageConversationTime: "10 Min",
        TotalConversationTime: "1 hr",
    }, {
        name: "Joe Rogan",
        status: "Offline",
        completedConvo: 2,
        ActiveConversations: "02: 00",
        AverageConversationTime: "10 Min",
        TotalConversationTime: "1 hr",
    },


]

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
    return (
        <Box>
            <Grid container spacing={2}>

                <Grid item xs={5} md={12}>
                    <Box className="workgroup-container" >
                        {workgroupStats.map((item, index) => (
                            <Box className="workgroup-stat">
                                <span className="count-text">{item.count}</span>
                                <span className="name-text">{item.name}</span>
                            </Box>
                        ))}

                    </Box>
                    <Box>
                        <Grid container spacing={2}>
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
                        </Grid>
                    </Box>
                </Grid>

            </Grid >
        </Box >

    )
}

export default Insights