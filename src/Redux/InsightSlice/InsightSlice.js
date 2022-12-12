import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endPoints } from "../../api/apiEndpoints/endPoints";
import { GetMethod } from "../../api/apiMethods/apiMethods";

export const GetAllTenant = createAsyncThunk("Insight/getAllTenant", async (_, { rejectWithValue }) => {
    try {
        let { data: insights } = await GetMethod(endPoints.getTenantDetails)
        const [FirstTenant] = insights
        let [Agents, callDetails] = await Promise.all([
            GetMethod(endPoints.getUserPresence(FirstTenant.id)),
            GetMethod(endPoints.getCallDetails(FirstTenant.id))])

        return {
            insights: insights.sort(function (a, b) {
                if (a.name.toUpperCase() < b.name.toUpperCase()) {
                    return -1;
                }
                if (a.name.toUpperCase() > b.name.toUpperCase()) {
                    return 1;
                }
                return 0;
            }) ?? [],
            Agents: Agents.data,
            callDetails: callDetails.data
        }
    } catch (error) {
        return rejectWithValue({ error: error });
    }
});

export const getInsightDetails = createAsyncThunk("Insight/getInsightDetails", async (id) => {
    try {
        let [Agents, callDetails] = await Promise.all([GetMethod(endPoints.getUserPresence(id)), GetMethod(endPoints.getCallDetails(id))])

        return {
            Agents: Agents.data,
            callDetails: callDetails.data
        }
    } catch (error) {
        return error
    }
});

const initialState = {
    insightsArray: [],
    AgentPresence: {},
    callDetails: {},
    selectedTenant: "",
};

export const InsightSlice = createSlice({
    name: "Insight",
    initialState,
    reducers: {
        setSelectedTenant: (state, action) => {
            state.selectedTenant = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(GetAllTenant.fulfilled, (state, { payload }) => {
                state.insightsArray = payload.insights;
                const [FirstTenant] = payload.insights;
                state.AgentPresence = payload.Agents;
                state.callDetails = payload.callDetails
                state.selectedTenant = FirstTenant.id;
            })
            .addCase(GetAllTenant.rejected, (state, action) => {

            })
            .addCase(GetAllTenant.pending, (state) => {

            })
            .addCase(getInsightDetails.fulfilled, (state, { payload }) => {
                state.AgentPresence = payload.Agents
                state.callDetails = payload.callDetails
            })
            .addCase(getInsightDetails.pending, (state, { payload }) => {
                state.AgentPresence = {}
            })
    },
});


export const { setSelectedTenant } = InsightSlice.actions;

export default InsightSlice.reducer;
