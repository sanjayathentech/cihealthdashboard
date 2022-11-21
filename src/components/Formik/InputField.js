import React from 'react';
import { TextField, Box, Stack } from "@mui/material";
import { useField } from 'formik';

function InputField({ name, ...Properties }) {

    const [field, values] = useField(name)

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

        <TextField   {...configTextfield} />

    );
}

export default InputField;