import { FastRewind } from "@mui/icons-material";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endPoints } from "../../api/apiEndpoints/endPoints";
import { GetMethod } from "../../api/apiMethods/apiMethods";

export const GetAllresourcesandResourcetype = createAsyncThunk("Reports/getAllresourcesandResourcetype", async (_, { rejectWithValue }) => {
    try {
        let res = await GetMethod(endPoints.getAllresourcesandResourcetype) ?? []
        let [firstType] = res.data
        return { data: res.data, selectId: firstType.resourceTypeFriendlyName }
    } catch (error) {
        return rejectWithValue({ error: error });
    }
});

export const GetApiManagement = createAsyncThunk("Reports/GetApiManagement", async (resourceId, { rejectWithValue }) => {
    try {
        let res = await GetMethod(endPoints.getAPIManagement(resourceId))
        return res.data
    } catch (error) {

    }
})

export const GetLogicApp = createAsyncThunk("Reports/GetLogicApp", async (resourceId, { rejectWithValue }) => {

    try {
        let res = await GetMethod(endPoints.getLogicApp(resourceId))
        return res.data ?? []
    } catch (error) {
        return rejectWithValue([], error);
    }

})

export const GetSqlDatabase = createAsyncThunk("Reports/getSqlDatabase", async (resourceId, { rejectWithValue }) => {

    try {
        let res = await GetMethod(endPoints.getSQLDatabase(resourceId))
        return res.data ?? []
    } catch (error) {
        return rejectWithValue([], error);
    }

})

export const GetAppServiceSite = createAsyncThunk("Reports/GetAppServiceSite", async (resourceId, { rejectWithValue }) => {

    try {
        let res = await GetMethod(endPoints.getAppserviceSiteMetrics(resourceId))
        console.log(res)
        return res.data ?? []
    } catch (error) {
        return rejectWithValue([], error);
    }

})





const initialState = {
    ResourceTypes: [],
    Resources: [],
    SelectedResourceType: "",
    SelectedResource: "",
    resourceId: "",
    apiManagement: {},
    logicApp: {},
    sqlDatabase: {},
    AppServiceSite: {},
    metricsLoader: false
};

export const ReportSlice = createSlice({
    name: "Reports",
    initialState,
    reducers: {
        setSelectedResourceType: (state, action) => {
            state.SelectedResourceType = action.payload
        },
        setSelectedResources: (state, action) => {
            state.SelectedResource = action.payload
        },
        setSelectedResourceId: (state, action) => {
            state.resourceId = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(GetAllresourcesandResourcetype.fulfilled, (state, { payload }) => {
                state.ResourceTypes = payload.data
                state.SelectedResourceType = payload.selectId
            })
            .addCase(GetAllresourcesandResourcetype.rejected, (state, action) => {

            })
            .addCase(GetAllresourcesandResourcetype.pending, (state) => {

            })
            .addCase(GetApiManagement.fulfilled, (state, { payload }) => {
                state.apiManagement = payload
                state.metricsLoader = false
            })
            .addCase(GetApiManagement.rejected, (state, { payload }) => {
                state.metricsLoader = false
            })
            .addCase(GetApiManagement.pending, (state, { payload }) => {
                state.metricsLoader = true
            })

            .addCase(GetLogicApp.fulfilled, (state, { payload }) => {
                state.logicApp = payload
                state.metricsLoader = false
            })
            .addCase(GetLogicApp.rejected, (state, { payload }) => {
                state.metricsLoader = false
            })
            .addCase(GetLogicApp.pending, (state, { payload }) => {
                state.metricsLoader = true
            })

            .addCase(GetSqlDatabase.fulfilled, (state, { payload }) => {
                state.sqlDatabase = payload
                state.metricsLoader = false
            })
            .addCase(GetSqlDatabase.rejected, (state, { payload }) => {
                state.metricsLoader = false
            })
            .addCase(GetSqlDatabase.pending, (state, { payload }) => {
                state.metricsLoader = true
            })

            .addCase(GetAppServiceSite.fulfilled, (state, { payload }) => {
                state.AppServiceSite = payload
                state.metricsLoader = false
            })
            .addCase(GetAppServiceSite.rejected, (state, { payload }) => {
                state.metricsLoader = false
            })
            .addCase(GetAppServiceSite.pending, (state, { payload }) => {
                state.metricsLoader = true
            })
    }
});


export const { setSelectedResourceType, setSelectedResources, setSelectedResourceId } = ReportSlice.actions;

export default ReportSlice.reducer;
