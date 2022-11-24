import React, { useState } from 'react'
import { Grid, Box, Skeleton, IconButton, TextField, Fab } from '@mui/material'
import { useContext } from 'react'
import { ResourceContext } from '../Dashboard/Sidebar'
import { statusIndicator } from '../../utils/status/statusIndicator'
import EditIcon from '@mui/icons-material/Edit';
import './manage-resources.css'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axios from 'axios'
import { parentUrl } from '../../api/parentUrl/parentUrl'
import { endPoints } from '../../api/apiEndpoints/endPoints'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


let skeletonStyle = {
    height: '20px'
}
function ManageResources() {

    const { health, loader, setHealth, pullResources, fetchloader } = useContext(ResourceContext)

    const [friendlyname, setfriedlyName] = useState('')
    const [resourceId, setresourceId] = useState(0)
    const [updatePayload, setupdatePayload] = useState({
        ResourceId: "",
        ResourceName: "",
        FriendlyName: "",
        HealthStatus: "",
    })

    const handleEdit = (item) => {
        setOpen(true)
        setupdatePayload({
            ResourceId: item.data.id,
            ResourceName: item.data.name,
            FriendlyName: item.friendlyname,
            HealthStatus: item.data.properties.availabilityState,
        })
    }

    const handleChange = (e) => {
        setfriedlyName(e.target.value)
    }

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    const UpdateFriendlyName = async () => {
        try {
            let res = await axios.put(parentUrl.url + endPoints.updateFriendlyname(), updatePayload)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Box className="tableHeaderContainer">
                <Grid container columnSpacing={4}>
                    <Grid item xs={3}><span className="tableHeader">Friendly Name</span></Grid>
                    <Grid item xs={6}><span className="tableHeader">Status Overview</span></Grid>
                    <Grid item xs={2}><span className="tableHeader">Action</span></Grid>
                </Grid>
            </Box>
            {loader ? [1, 2, 3, 4, 5].map(() => (
                <SkeletonLoading />
            )) :
                health.map((item, index) => (
                    <Box className="tableRow">
                        <Grid container columnSpacing={4}>
                            <Grid item xs={3}>{item.friendlyname}</Grid>
                            <Grid item xs={6}><span>{item.data.properties.summary}</span></Grid>
                            <Grid item xs={2}><span>
                                <IconButton onClick={() => handleEdit(item)} color="primary" aria-label="add to shopping cart">
                                    <EditIcon />
                                </IconButton>
                            </span></Grid>
                        </Grid>
                    </Box>
                ))
            }
            <Fab onClick={pullResources} sx={
                {
                    margin: 0,
                    top: 'auto',
                    right: 20,
                    bottom: 20,
                    left: 'auto',
                    position: 'fixed',
                }

            } variant="extended" size="medium" color="primary" aria-label="add">
                {fetchloader ? <> <CircularProgress sx={{ color: '#ffffff', scale: '0.6' }} />Fetching...</> : <><CompareArrowsIcon sx={{ mr: 1 }} />
                    Pull Resources</>}
            </Fab>
            <div>
                <Dialog
                    sx={{ padding: "0px 10px 0px 10px" }}
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Update Friendly name"}</DialogTitle>
                    <DialogContent>
                        <TextField value={friendlyname}
                            fullWidth
                            label="Friendly Name"
                            variant='standard'
                            name="friendlyname"
                            onChange={handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                        <Button onClick={handleClose}>Save</Button>
                    </DialogActions>
                </Dialog>
            </div>
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
