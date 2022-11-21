import { Formik, Form } from 'formik';
import { Grid, Box, InputAdornment, IconButton, Button } from '@mui/material'
import { makeStyles } from '@mui/styles';
import { useState, useEffect } from 'react'
import React from 'react'
import loginImage from '../../assets/MSlogin.svg'
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

// css
import './login.css';



function Login() {

    const [showPassword, setshowPassword] = useState(false)

    const handleClickShowPassword = () => {
        setshowPassword(!showPassword)
    }

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
                    localStorage.setItem('loginToken',response.accessToken)
                    navigate('/health')
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
       <>
       
        <Grid container>
            <Grid item lg={6} md={6} xs={12}>
                <div className='imageContainer'>
                    <img src={loginImage} className="loginimage"/>
                </div>
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
                <div className='login_button_container'>
                <Button onClick={() => handleLogin()} variant="text" sx={{border:'1px solid #4ab7fc',fontSize:'18px',fontWeight:'100'}}>
                                        <Box sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            gap: "10px",
                                            }}>
                                            <img width="30px" height="30px" style={{ objectFit: 'cover', }} src={MSlogo}></img>
                                            Sign in with Microsoft
                </Box>
                </Button>
                </div>
            </Grid>
        </Grid>
        
       </>
    )
}

export default Login