import { Formik, Form } from 'formik';
import { Grid, Box, InputAdornment, IconButton, Button } from '@mui/material'
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
import { parentUrl } from '../../api/parentUrl/parentUrl';
import { endPoints } from '../../api/apiEndpoints/endPoints';

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Navigate } from 'react-router-dom';

// css
import './login.css';
import { getApi } from '../../api/apiMethods/apiMethods';



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
                    localStorage.setItem('loginToken', response.accessToken)
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
                        <img src={loginImage} className="loginimage" />
                    </div>
                </Grid>
                <Grid item lg={6} md={6} xs={12}>
                    <div className='login_button_container'>
                        <Button onClick={() => handleLogin()} variant="text" sx={{ border: '1px solid #8C8C8C', borderRadius: 0, fontSize: '15px', fontWeight: '600', padding: "8px 18px 8px 18px" }}>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: "10px",
                                textTransform: 'none',
                                borderRadius: 0,
                                color: '#5E5E5E'
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