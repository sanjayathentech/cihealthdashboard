const geturl = window.location.origin

export const msalConfig = {
    auth: {
        clientId: "d37c5ba1-bce3-4fc1-a233-cef861feda29",
        authority: "https://login.microsoft.com/cb4a12d1-e1d9-4cef-ae5d-91705fa99a50",
        redirectUri: `${geturl}/login`,
        postLogoutRedirectUri: "",
    },
    cache: {
        cacheLocation: "sessionStorage", // Set this to "true" if you are having issues on IE11 or Edge
    }
};

export const loginRequest = {
    scopes: ["User.Read"]
};

export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};