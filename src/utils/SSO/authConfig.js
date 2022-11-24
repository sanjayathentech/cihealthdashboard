const geturl = window.location.origin

export const msalConfig = {
    auth: {
        clientId: "f3168ba4-55a4-4b74-b376-74b7c0fec409",
        authority: "https://login.microsoft.com/db3ccfc8-a469-4b8c-9a3c-7cd440b2d5a6",
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