const geturl = window.location.origin

export const msalConfig = {
    auth: {
        clientId: "19d3f59f-791a-48af-bfd1-5f5181901f27",
        authority: "https://login.microsoft.com/5fd4f69a-b02a-42d5-aea1-65211293d688",
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