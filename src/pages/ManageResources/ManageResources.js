import React, { useEffect, useState } from "react";
import {
    Grid,
    Box,
    Skeleton,
    IconButton,
    TextField,
    Fab,
    Checkbox,
    Paper,
    Pagination,
    Typography
} from "@mui/material";
import { useContext } from "react";
import { ResourceContext } from "../Dashboard/Sidebar";
import { statusIndicator } from "../../utils/status/statusIndicator";
import EditIcon from "@mui/icons-material/Edit";
import "./manage-resources.css";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import axios from "axios";
import { parentUrl } from "../../api/parentUrl/parentUrl";
import { endPoints } from "../../api/apiEndpoints/endPoints";
import { getApi } from "../../api/apiMethods/apiMethods";
import CISnackbar from "../../components/SnackBar/SnackBar";
import { Update } from "../../api/apiMethods/apiMethods";
import CachedIcon from '@mui/icons-material/Cached';
import InlineText from "../../components/inlinetext/InlineText";
import MyToast, { toastMessage } from "../../components/toaster/toast";
import { toast } from "react-toastify";


const countperpage = 10;
let SelectConstant = ['Available', 'Unknown', 'Degraded', 'Unavailable']


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

let skeletonStyle = {
    height: "20px",
};
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
};


function ManageResources() {
    let UserEmail = sessionStorage.getItem('userEmail')

    const [age, setAge] = React.useState('');
    const handleSelectChange = (event) => {
        setAge(event.target.value);
    };


    let userName = sessionStorage.getItem('userEmail');
    console.log(userName)

    const [snack, setSnack] = useState({
        Open: false,
        message: "",
        severity: "",
    });
    const [pullLoader, setpull] = useState(false);
    const { Open, message, severity } = snack;
    const handlesnackClose = () => {
        setSnack(initialSnack);
    };

    const {
        health,
        loader,
        fetchloader,
        receivingID,
        manageResources,
        loaderMR,
        dummyFunction,
        dummystate,
        getmanageResource,
    } = useContext(ResourceContext);

    const [resourceId, setresourceId] = useState(0);
    const [updatePayload, setupdatePayload] = useState({
        ResourceId: "",
        ResourceName: "",
        FriendlyName: "",
        HealthStatus: "",
    });
    const [page, setPage] = useState(1);
    const [filteredval, setFilteredval] = useState([]);

    const handleEdit = (item) => {
        setresourceId(item.resourceAutoId);
        setOpen(true);
        setupdatePayload({
            ResourceId: item.resourceId,
            ResourceName: item.resourceName,
            HealthStatus: item.healthStatus,
            FriendlyName: item.friendlyName,
        });
    };

    const handleChange = (e) => {
        setupdatePayload({ ...updatePayload, FriendlyName: e.target.value });
    };

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    const UpdateFriendlyName = async () => {
        try {
            let res = await axios.Update(
                parentUrl.url + endPoints.updateFriendlyname(resourceId),
                updatePayload
            );
            if (res) {
                setupdatePayload(initialUpdateState);
                setOpen(false);
                dummyFunction(!dummystate);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const pullResources = async () => {
        setpull(true);
        try {
            let res = await axios.get(parentUrl.url + endPoints.pushNewResources + '/' + UserEmail);
            setpull(false);
            if (res.updatedCount != 0) {
                getmanageResource();
            }

            toastMessage('warning', res.data.pushResponse)
        } catch (error) {
            setpull(false);
            toastMessage('error', "Error while Pulling Resources")
            console.log(error);
        }
    };

    const [changedvalue, setChangedvalue] = React.useState([]);
    const [checked, setChecked] = React.useState([]);
    const checkedchange = (e, ind) => {
        setChecked((state) => ({ ...state, [ind]: e.target.checked }));

    };

    const handletextchange = (value, ind) => {
        console.log(value)
        const findind = changedvalue.findIndex((item) => {
            return item.resourceAutoId === manageResources[ind].resourceAutoId;
        });

        let changedvaluetemp = [...changedvalue];
        if (findind != -1) {
            changedvalue[findind].friendlyName = value;
        } else {
            changedvaluetemp = [
                ...changedvaluetemp,
                {
                    ...manageResources[ind],
                    friendlyName: value,
                    lastModifiedBy: userName,
                    createdBy: userName
                }
            ];
        }
        setChangedvalue(changedvaluetemp);
    };


    useEffect(() => {
        getpage();
    }, [page])

    useEffect(() => {
        getpage();
    }, [manageResources])

    const getpage = () => {
        if (manageResources.length != 0) {
            let startind = (page - 1) * countperpage;
            let endindex = startind + countperpage
            setFilteredval(manageResources.slice(startind, endindex));
            console.log({ startind, endindex, page });
        }
    }
    const handlechangepage = (e, value) => {
        setPage(value);
        sethoverIndex(null)
        setshowEdit(false)
    }

    const [showEdit, setshowEdit] = useState(false)
    const handleChangeTEXT = async (value, openField, index, item) => {
        setshowEdit(openField)
        const data = {
            ...item,
            friendlyName: value,
            lastModifiedBy: userName,
            createdBy: userName
        }

        try {
            let res = await Update(endPoints.updateFriendlyname(item.resourceAutoId), data);
            if (res) {
                setupdatePayload(initialUpdateState);
                setOpen(false);
                dummyFunction(!dummystate);
                toastMessage('success', 'Successfully Updated')
            }
        } catch (error) {
            console.log(error);
            toastMessage('error', 'Error While Updating Friendly Name')
        }
    }
    const [hoverIndex, sethoverIndex] = useState(null)
    const onMouseHover = (i) => {
        if (!showEdit) {
            sethoverIndex(i)
        }
    }
    const onMousehoverleave = () => {
        sethoverIndex(null)
    }
    const handleshowEdit = (value) => {
        setshowEdit(value)
    }




    return (
        <>
            <Box className="mr-table">
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px"
                    }}
                >
                    <span style={{ fontWeight: 600, fontSize: "18px" }}>Resources</span>
                    <Button onClick={pullResources} variant="contained" sx={{
                        fontFamily: [
                            '-apple-system',
                            'BlinkMacSystemFont',
                            '"Segoe UI"',
                            'system-ui',
                            '"Apple Color Emoji"',
                            '"Segoe UI Emoji"',
                            '"Segoe UI Web"',
                            'sans-serif',
                        ].join(','),
                        height: "40px",
                        textTransform: "capitalize",
                        backgroundColor: loaderMR || pullLoader ? '#808080' : '#0078d4',
                        boxShadow: 'none',
                        color: "#ffffff",
                        '&:hover': {
                            backgroundColor: loaderMR || pullLoader ? 'rgb(154, 154, 154)' : '#0078d4',
                        }
                    }}>
                        {pullLoader ? (<><CircularProgress sx={{ color: "#ffffff", scale: "0.4", padding: 0, margin: 0 }} /> &emsp; Fetching...</>) : <><CachedIcon sx={{ marginRight: "10px" }} />  Fetch</>}
                    </Button>

                </Box>

                <Box className="tableHeaderContainer">
                    <Grid container columnSpacing={4}
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        {/* <Grid item xs={1}>
                            No
                        </Grid> */}
                        <Grid item xs={3}>
                            <span className="tableHeader">Friendly Name</span>
                        </Grid>
                        <Grid item xs={5}>
                            <span className="tableHeader">Resource Name</span>
                        </Grid>
                        <Grid item xs={4}>
                            <span className="tableHeader">Resource Type</span>
                        </Grid>
                    </Grid>
                </Box>
                {false && loaderMR && pullLoader
                    ? [1, 2, 3, 4, 5].map(() => <SkeletonLoading />)
                    : filteredval.map((item, index) => (
                        <div className="mr-tableRow" onMouseEnter={() => onMouseHover(index)} onMouseLeave={() => showEdit ? null : onMousehoverleave()} >
                            <Grid
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                container columnSpacing={4}>
                                <Grid item xs={3}>
                                    <Box>
                                        {hoverIndex === index ? <InlineText text={item.friendlyName} handlechange={(value, openField) => handleChangeTEXT(value, openField, index, item)} showEdit={showEdit} handleEdit={(value) => handleshowEdit(value)} /> :
                                            <Typography className="inlinetext-text" sx={{
                                                fontSize: "13px"
                                            }}>{item.friendlyName}</Typography>
                                        }
                                    </Box>
                                </Grid>
                                <Grid item xs={5}>
                                    <span style={{ wordWrap: "break-word" }}>{item.resourceName}</span>
                                </Grid>
                                <Grid item xs={4}>
                                    <span>{item.resourceType}</span>
                                </Grid>
                            </Grid>
                        </div>
                    ))}
            </Box>
            <Box sx={{ margin: '20px', float: "center" }}>  <Pagination count={Math.ceil(manageResources.length / countperpage)} shape="rounded" onChange={handlechangepage} />

            </Box>

            <CISnackbar
                snackOpen={Open}
                onClose={handlesnackClose}
                message={message}
                position1={"top"}
                position2={"right"}
                severity={severity}
            />

        </>
    );

}


export default React.memo(ManageResources);

function SkeletonLoading() {
    return (
        <Box className="loader_spacing">
            <Grid container rowSpacing={0} columnSpacing={4}>
                <Grid item xs={3}>
                    <Skeleton sx={skeletonStyle} />
                </Grid>
                <Grid item xs={5}>
                    <Skeleton sx={skeletonStyle} />
                </Grid>
                <Grid item xs={4}>
                    <Skeleton sx={skeletonStyle} />
                </Grid>
            </Grid>
        </Box>
    );
}
