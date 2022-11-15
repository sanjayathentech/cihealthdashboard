import React from 'react';
import { TextField, Box, Stack } from "@mui/material";
import { useField } from 'formik';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
    label: {
        fontSize: "12px",
        letterSpacing: "0.5px",
        color: "gray",
        marginBottom: "4px",
        marginTop: "4px",
    },
    errorLabel: {
        fontSize: "12px",
        letterSpacing: "0.5px",
        color: "#d32f2f",
        marginBottom: "4px",
        marginTop: "4px",
    },
}
));

function InputField({ name, ...Properties }) {

    const [field, values] = useField(name)
    const classes = useStyles()

    const configTextfield = {
        ...field,
        ...Properties,
        fullWidth: true,
        variant: 'standard'
    };

    if (values && values.touched && values.error) {
        configTextfield.error = true;
        configTextfield.helperText = values.error;
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column"
            }}
        >
            {/* <label className={values && values.touched && values.error ? classes.errorLabel : classes.label}>{Properties.id}</label> */}
            <TextField   {...configTextfield} />
        </Box>
    );
}

export default InputField;