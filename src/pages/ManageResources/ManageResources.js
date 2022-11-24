import React, { useState } from 'react'
import { Grid, Box, Skeleton, IconButton, TextField } from '@mui/material'
import { useContext } from 'react'
import { ResourceContext } from '../Dashboard/Sidebar'
import { statusIndicator } from '../../utils/status/statusIndicator'
import EditIcon from '@mui/icons-material/Edit';
import './manage-resources.css'

let skeletonStyle = {
    height: '20px'
}
function ManageResources() {

    const { health, loader, setHealth } = useContext(ResourceContext)

    const [Edithealth, setEditHealth] = useState(health)

    const [Edit, setEdit] = useState({
        bool: false,
        Editindex: "",
    })
    const { bool, Editindex } = Edit
    const handleEdit = (item, index) => {
        setEdit({
            bool: true,
            Editindex: index
        })


        // setHealth(
        //     health.map((x => x.id === item.id ? item : x))
        // )
    }
    const handleChange = (e, item, index) => {

        const data = {
            ...item,
            friendlyname: e.target.value
        }
        health[index].friendlyname = e.target.value
    }

    return (
        <>
            <Box className="tableHeaderContainer">
                <Grid container>
                    <Grid item xs={3}><span className="tableHeader">Friendly Name</span></Grid>
                    <Grid item xs={4}><span className="tableHeader">Status Overview</span></Grid>
                    <Grid item xs={4}><span className="tableHeader">Action</span></Grid>
                </Grid>
            </Box>
            {loader ? [1, 2, 3, 4, 5].map(() => (
                <SkeletonLoading />
            )) :
                Edithealth.map((item, index) => (
                    <Box className="tableRow">
                        <Grid container>
                            <Grid item xs={3}>
                                {bool && Editindex == index ? <TextField value={item.friendlyname}
                                    name="email"
                                    FormHelperTextProps={{ style: { fontSize: "12px" } }}
                                    InputProps={{ style: { height: "35px", fontSize: "12px" } }}
                                    onChange={(e) => handleChange(e, item, index)}
                                /> : item.friendlyname
                                }

                            </Grid>
                            <Grid item xs={4}><span>{item.data.properties.summary}</span></Grid>
                            <Grid item xs={4}><span>
                                <IconButton onClick={() => handleEdit(item, index)} color="primary" aria-label="add to shopping cart">
                                    <EditIcon />
                                </IconButton>
                            </span></Grid>
                        </Grid>
                    </Box>
                ))
            }
        </>
    )
}

export default ManageResources



function SkeletonLoading() {
    return (
        <Box className='loader_spacing'>
            <Grid container rowSpacing={0} columnSpacing={10}>
                <Grid item xs={1}>
                    <Box>
                        <Skeleton sx={skeletonStyle} />
                    </Box>
                </Grid>

                <Grid item xs={3}><Skeleton sx={skeletonStyle} /></Grid>
                <Grid item xs={7}><Skeleton sx={skeletonStyle} /></Grid>
            </Grid>
        </Box>
    )
}