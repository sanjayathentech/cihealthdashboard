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
            state.SelectedResourceType = action.payload
        },
        setSelectedResources: (state, action) => {
            state.SelectedResource = action.payload
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
    },
});


export const { setSelectedResourceType, setSelectedResources } = ReportSlice.actions;

export default ReportSlice.reducer;
