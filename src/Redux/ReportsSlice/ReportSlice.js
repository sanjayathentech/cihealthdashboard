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

const initialState = {
    ResourceTypes: [],
    Resources: [],
    SelectedResourceType: "",
    SelectedResource: ""
};

export const ReportSlice = createSlice({
    name: "Reports",
    initialState,
    reducers: {
        setSelectedResourceType: (state, action) => {
            let currentResources = state.ResourceTypes.find((x) => x.resourceTypeFriendlyName === action.payload).resources ?? []
            let [FirstResource] = currentResources

            state.SelectedResourceType = action.payload
            state.SelectedResource = FirstResource.resourceId
            state.Resources = currentResources
        },
        setSelectedResources: (state, action) => {
            state.SelectedResource = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(GetAllresourcesandResourcetype.fulfilled, (state, { payload }) => {

                let currentResources = payload.data.find((x) => x.resourceTypeFriendlyName === payload.selectId).resources ?? []
                let [FirstResource] = currentResources
                state.ResourceTypes = payload.data
                state.SelectedResourceType = payload.selectId
                state.SelectedResource = FirstResource.resourceId
                state.Resources = currentResources
            })
            .addCase(GetAllresourcesandResourcetype.rejected, (state, action) => {

            })
            .addCase(GetAllresourcesandResourcetype.pending, (state) => {

            })
    },
});


export const { setSelectedResourceType, setSelectedResources } = ReportSlice.actions;

export default ReportSlice.reducer;
