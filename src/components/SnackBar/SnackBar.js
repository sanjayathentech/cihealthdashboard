import React, { useEffect, useState } from "react";

import { Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CISnackbar(props) {
    const vertical = props.position1;
    const horizontal = props.position2;
    return (
        <>
            <Snackbar anchorOrigin={{ vertical, horizontal }} open={props.snackOpen} onClose={props.onClose} autoHideDuration={4000}>
                <Alert onClose={props.onClose} severity={props.severity} sx={{ width: '100%' }}>
                    {props.message}
                </Alert>
            </Snackbar>
        </>
    )
}