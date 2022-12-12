import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Grid, Skeleton, Stack, Tooltip, Fab, Checkbox, Paper, Pagination } from '@mui/material';
import './Health.css';
import { statusIndicator } from '../../utils/status/statusIndicator';
import { useNavigate } from "react-router-dom";
import { ResourceContext } from '../Dashboard/Sidebar';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import CircularProgress from '@mui/material/CircularProgress';
import { NoBackpackSharp } from '@mui/icons-material';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NoRecords from '../../components/noRecords';

import noData from '../../assets/noData.svg'

let skeletonStyle = {
    height: '20px'
}


let SelectConstant = ["All", "Available", "Unknown", "Degraded", "Unavailable"]

const countperpage = 8;
function Health() {

    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const navigate = useNavigate()
    const dummyArray = [1, 2, 3, 4, 5]

    const { health, loader, pullResources, fetchloader, filteredhealth, setfilteredhealth } = useContext(ResourceContext)


    const [paginated, setpaginated] = useState([])

    const [age, setAge] = React.useState('All');

    useEffect(() => {
        setfilteredhealth(health)
    }, [])

    const handleSelectChange = (event) => {
        setAge(event.target.value);
        setfilteredhealth(health.filter((x, index, arr) =>
            (event.target.value === "All" ? arr : x.data.properties.availabilityState === event.target.value)))
    };
    const [page, setPage] = useState(1);

    useEffect(() => {
        getpage();
    }, [page])

    useEffect(() => {
        getpage();
    }, [filteredhealth])

    const getpage = () => {
        if (filteredhealth.length != 0) {
            let startind = (page - 1) * countperpage;
            let endindex = startind + countperpage
            setpaginated(filteredhealth.slice(startind, endindex));
            console.log({ startind, endindex, page });
        }
    }

    return (
        <>
            <Box className="health-table">
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px"
                    }}
                >
                    <span style={{ fontWeight: 600, fontSize: "18px" }}>Health Status</span>

                    <span style={{ fontWeight: 500, fontSize: "14px", display: 'flex', flexGrow: 1, justifyContent: 'end' }}>Filter by Status</span>
                    &emsp;
                    <FormControl size="small" variant="outlined" sx={{
                        minWidth: 120,
                        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: 'none',
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                            color: "#0A0A0A"
                        },
                    }}>
                        <Select
                            defaultValue='All'
                            sx={{
                                fontSize: '14px', fontWeight: 600, backgroundColor: "#ECEDEF",
                                boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 },
                            }}
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={age}
                            onChange={handleSelectChange}
                            label="Status"
                        >
                            {SelectConstant.map((item, index) => (
                                <MenuItem value={item} sx={{
                                    fontSize: '14px', fontWeight: 400
                                }}>{item}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Box className="tableHeaderContainer">
                    <Grid container direction="row"
                        justifyContent="flex-start"
                        alignItems="center" rowSpacing={0} columnSpacing={10}>
                        <Grid item xs={1}><span className="tableHeader">No</span></Grid>
                        <Grid item xs={3}><span className="tableHeader">Status</span></Grid>
                        <Grid item xs={3}><span className="tableHeader">Friendly Name</span></Grid>
                        <Grid item xs={3}><span className="tableHeader">Status Overview</span></Grid>
                    </Grid>
                </Box>
                <Box>

                    {loader ? dummyArray.map((item, index) => (

                        <Box className='loader_spacing'>
                            <Grid container rowSpacing={0} columnSpacing={10}>
                                <Grid item xs={1}>
                                    <Box>
                                        <Skeleton sx={skeletonStyle} />
                                    </Box>
                                </Grid>
                                <Grid item xs={3}>
                                    <Box>
                                        <Skeleton sx={skeletonStyle} />
                                    </Box>
                                </Grid>

                                <Grid item xs={3}><Skeleton sx={skeletonStyle} /></Grid>
                                <Grid item xs={3}><Skeleton sx={skeletonStyle} /></Grid>
                            </Grid>
                        </Box>
                    ))
                        : !loader && filteredhealth?.length === 0 ? <NoRecords /> : paginated?.map((item, index) => (
                            <>
                                <Box className="tableRow">
                                    <Grid container direction="row"
                                        justifyContent="flex-start"
                                        alignItems="center"
                                        rowSpacing={0} columnSpacing={10}>
                                        <Grid item xs={1}>
                                            <span>
                                                {index + 1}
                                            </span>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <span>
                                                {
                                                    statusIndicator(item?.data?.properties?.availabilityState)
                                                }
                                            </span>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <span>
                                                {item.friendlyname}
                                            </span>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <span>
                                                {item.data.properties.summary}
                                            </span>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </>
                        ))
                    }
                </Box>
            </Box>
            <Box sx={{ margin: '20px', float: "center" }}>  <Pagination disabled={filteredhealth.length == 0} count={Math.ceil(filteredhealth?.length / countperpage)} shape="rounded" onChange={(e, value) => setPage(value)} />

            </Box>


        </>
    )
}


export default Health


const SkeletonLoading = () => {

}


