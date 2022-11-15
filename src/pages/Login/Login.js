import { Formik, Form } from 'formik';
import { Grid, Box, InputAdornment, IconButton, Button } from '@mui/material'
import { makeStyles } from '@mui/styles';
import { useState, useEffect } from 'react'
import React from 'react'
import loginImage from '../../assets/Login.svg'
import InputField from '../../components/Formik/InputField';
import * as Yup from 'yup';
import MSlogo from '../../assets/MicrosoftLogo.png'
import { useNavigate } from 'react-router-dom';
// SSO
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../utils/SSO/authConfig";
import { useIsAuthenticated } from "@azure/msal-react";
import { callMsGraph } from '../../utils/SSO/graph';

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Navigate } from 'react-router-dom';

const useStyles = makeStyles(theme => ({

    image_Container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100%'

    },

    formContainer: {
        display: "flex",
        height: "100vh",
        width: '100%',
        alignItems: "center",
        justifyContent: "center",
    }
}
));

// formik validations
const initialValues = {
    email: '',
    password: '',
}

const FormValidation = Yup.object().shape({

    email: Yup.string()
        .email('Invalid email.')
        .required('Required'),
    password: Yup.string()
        .required('Please Enter your password')

});



function Login() {

    const [showPassword, setshowPassword] = useState(false)

    const handleClickShowPassword = () => {
        setshowPassword(!showPassword)
    }

    const classes = useStyles()
    const navigate = useNavigate()

    const { instance, accounts, inProgres } = useMsal();
    const [accessToken, setAccessToken] = useState(null);
    const [graphData, setGraphData] = useState(null);

    var isAuthenticated = useIsAuthenticated();

    useEffect(() => {
        if (isAuthenticated) {
            const request = {
                ...loginRequest,
                account: accounts[0]
            };

            // Silently acquires an access token which is then attached to a request for Microsoft Graph data
            instance.acquireTokenSilent(request).then((response) => {
                if (response) {
                    setAccessToken(response.accessToken);
                    navigate('/login')
                }
            }).catch((e) => {
                instance.acquireTokenPopup(request).then((response) => {
                    callMsGraph(response.accessToken).then(response => setGraphData(response));
                });
            });

        }

    }, [isAuthenticated])

    const handleLogin = () => {
        instance.loginPopup(loginRequest).catch(e => {
            console.log(e);
        });

    }

    return (
        <Grid container>
            <Grid item md={7} sm={12} xs={12}>
                <Box className={classes.image_Container}>
                    <img src={loginImage} style={{ height: "400px", objectFit: "contain" }}></img>
                </Box>
            </Grid>
            <Grid item md={3} sm={12} xs={12}
            >
                <Box className={classes.formContainer}>

                    <Formik
                        initialValues={{
                            ...initialValues
                        }}
                        validationSchema={FormValidation}

                        onSubmit={values => {
                            console.log(values)
                        }}
                    >

                        <Form>

                            <Grid container rowSpacing={4}>
                                <Grid item md={12} sm={12} xs={12}>
                                    <InputField
                                        id="Email"
                                        name="email"
                                        label="Email"
                                        FormHelperTextProps={{ style: { fontSize: "12px" } }}
                                        InputProps={{ style: { height: "40px", fontSize: "12px" } }}
                                        autoComplete='off'
                                    />

                                </Grid>
                                <Grid item md={12} sm={12} xs={12}>
                                    <InputField
                                        id="Password"
                                        name="password"
                                        label="Password"
                                        autoComplete='off'
                                        type={showPassword ? "text" : "password"}
                                        InputProps={{
                                            style: { height: "40px", fontSize: "12px" },
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>)
                                        }}
                                        FormHelperTextProps={{ style: { fontSize: "12px" } }}

                                    />
                                </Grid>
                                <Grid item md={12} sm={12} xs={12}>
                                    <Button onClick={() => navigate('/home')} type="submit" variant="outlined" sx={{ width: '100%', color: "#2E2E2E", border: "1px solid #2E2E2E", }}>Login</Button>
                                </Grid>
                                <Grid item md={12} sm={12} xs={12}>
                                    <Button onClick={() => handleLogin()} variant="outlined" sx={{
                                        width: '100%',
                                        color: "#2E2E2E",
                                        border: "1px solid #2E2E2E",
                                    }}>
                                        <Box sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            gap: "10px",

                                        }}>
                                            <img width="20px" height="20px" style={{ objectFit: 'cover', }} src={MSlogo}></img>
                                            Sign in with Microsoft
                                        </Box>

                                    </Button>
                                </Grid>
                            </Grid>

                        </Form>
                    </Formik>
                </Box>
            </Grid>
        </Grid >
    )
}

export default Login