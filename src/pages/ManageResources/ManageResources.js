import React, { useEffect, useState } from 'react'
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
import { getApi } from '../../api/apiMethods/apiMethods'
import CISnackbar from '../../components/SnackBar/SnackBar'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


let skeletonStyle = {
    height: '20px'
}
let initialSnack = {
    Open: false,
    message: "",
    severity: "",
};
let initialUpdateState = {
    ResourceId: "",
    ResourceName: "",
    FriendlyName: "",
    HealthStatus: "",
}

function ManageResources() {


    const [snack, setSnack] = useState({
        Open: false,
        message: "",
        severity: ""
    });
    const [pullLoader, setpull] = useState(false)
    const { Open, message, severity } = snack
    const handlesnackClose = () => {
        setSnack(initialSnack)
    }




    const { health, loader, fetchloader, receivingID, manageResources, loaderMR, dummyFunction, dummystate, getmanageResource } = useContext(ResourceContext)

    const [resourceId, setresourceId] = useState(0)
    const [updatePayload, setupdatePayload] = useState({
        ResourceId: "",
        ResourceName: "",
        FriendlyName: "",
        HealthStatus: "",
    })

    const handleEdit = (item) => {

        setresourceId(item.resourceAutoId)
        setOpen(true)
        setupdatePayload({
            ResourceId: item.resourceId,
            ResourceName: item.resourceName,
            HealthStatus: item.healthStatus,
            FriendlyName: item.friendlyName
        })
    }

    const handleChange = (e) => {
        setupdatePayload({ ...updatePayload, FriendlyName: e.target.value })
    }

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    const UpdateFriendlyName = async () => {
        try {
            let res = await axios.put(parentUrl.url + endPoints.updateFriendlyname(resourceId), updatePayload)
            if (res) {
                setupdatePayload(initialUpdateState)
                setOpen(false)
                dummyFunction(!dummystate)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const pullResources = async () => {
        setpull(true)
        try {
            let res = await axios.get(parentUrl.url + endPoints.pushNewResources)
            setpull(false)
            if (res.updatedCount != 0) {

                getmanageResource()
            }

            console.log("==============================================")
            console.log(res)
            console.log(res.data)
            console.log(res.pushResponse)
            console.log("==============================================")

            setSnack({
                Open: true,
                message: res.data.pushResponse,
                severity: "warning"
            })
        } catch (error) {
            setSnack({
                Open: true,
                message: "Error while Pulling Resources",
                severity: "warning"
            })
            console.log(error)
        }
    }
    return (
        <>
            <Box className="tableHeaderContainer">
                <Grid container columnSpacing={4}>
                    <Grid item xs={3}><span className="tableHeader">Friendly Name</span></Grid>
                    <Grid item xs={6}><span className="tableHeader">Resource Name</span></Grid>
                    <Grid item xs={2}><span className="tableHeader">Action</span></Grid>
                </Grid>
            </Box>
            {loaderMR || pullLoader ? [1, 2, 3, 4, 5].map(() => (
                <SkeletonLoading />
            )) :
                manageResources.map((item, index) => (
                    <Box className="tableRow">
                        <Grid container columnSpacing={4}>
                            <Grid item xs={3}>{item.friendlyName}</Grid>
                            <Grid item xs={6}><span>{item.resourceName}</span></Grid>
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
                {loaderMR || pullLoader ? <> <CircularProgress sx={{ color: '#ffffff', scale: '0.6' }} />Fetching...</> : <><CompareArrowsIcon sx={{ mr: 1 }} />
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
                        <TextField value={updatePayload.FriendlyName}
                            fullWidth
                            label="Friendly Name"
                            variant='standard'
                            name="friendlyname"
                            onChange={handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                        <Button onClick={UpdateFriendlyName}>Save</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <CISnackbar snackOpen={Open} onClose={handlesnackClose} message={message} position1={'top'} position2={'right'} severity={severity} />
        </>
    )
}

export default ManageResources



function SkeletonLoading() {
    return (
        <Box className='loader_spacing'>
            <Grid container rowSpacing={0} columnSpacing={4}>
                <Grid item xs={3}>
                    <Box>
                        <Skeleton sx={skeletonStyle} />
                    </Box>
                </Grid>

                <Grid item xs={6}><Skeleton sx={skeletonStyle} /></Grid>
                <Grid item xs={2}><Skeleton sx={skeletonStyle} /></Grid>
            </Grid>
        </Box>
    )
}
