import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endPoints } from "../../api/apiEndpoints/endPoints";
import { GetMethod } from "../../api/apiMethods/apiMethods";

export const GetAllTenant = createAsyncThunk("Insight/getAllTenant", async (thunkAPI) => {
    try {
        let { data: TenantDetails } = await GetMethod(endPoints.getTenantDetails) ?? []
        const [FirstTenant] = TenantDetails
        let { data: AgentsData } = await GetMethod(endPoints.getUserPresence(FirstTenant.id)) ?? []

        return {
            insights: TenantDetails,
            Agents: AgentsData,
        }
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error });
    }
});

export const getUserPresence = createAsyncThunk("Insight/GetUserPresence", async (id) => {
    try {
        let res = await GetMethod(endPoints.getUserPresence(id)) ?? []
        return res.data
    } catch (error) {
        return error
    }
});

const initialState = {
    insightsArray: [],
    AgentArray: [],
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

                let sum = 0
                payload.Agents?.map(x => { sum += x.count })

                const [FirstTenant] = payload.insights;
                state.insightsArray = payload.insights;
                state.AgentArray = payload.Agents
                state.AgentArray.unshift({ count: sum, status: "Total Agents" });
                state.selectedTenant = FirstTenant.id;
            })
            .addCase(GetAllTenant.rejected, (state, action) => {

            })
            .addCase(GetAllTenant.pending, (state) => {

            })
            .addCase(getUserPresence.fulfilled, (state, { payload }) => {

                let sum = 0
                payload?.map(x => { sum += x.count })

                state.AgentArray = payload
                state.AgentArray.unshift({ count: sum, status: "Total Agents" });
            })
            .addCase(getUserPresence.pending, (state, { payload }) => {
                state.AgentArray = []
            })
    },
});


export const { setSelectedTenant } = InsightSlice.actions;

export default InsightSlice.reducer;
