import React from 'react'
import { Box } from '@mui/material'
import NoData from '../assets/noData.svg'

function NoRecords() {
    return (

        <Box sx={{ height: "60vh", display: 'flex', justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "30px" }}>
            <img style={{ width: "200px", height: "200px" }} src={NoData}></img>
            <span style={{ fontSize: "16px", color: '#808080' }}>
                No records found ...
            </span>
        </Box>

    )
}

export default NoRecords