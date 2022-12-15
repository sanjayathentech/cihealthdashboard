import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { endPoints } from "../../api/apiEndpoints/endPoints";
import { GetMethod } from "../../api/apiMethods/apiMethods";

export const GetAllTenant = createAsyncThunk(
  "Insight/getAllTenant",
  async (_, { rejectWithValue }) => {
    try {
      let { data: insights } = await GetMethod(endPoints.getTenantDetails);
      const [FirstTenant, secondTanent] = insights;
      let [Agents, callDetails] = await Promise.all([
        GetMethod(endPoints.getUserPresence(FirstTenant.id)),
        GetMethod(endPoints.getCallDetails(FirstTenant.id)),
      ]);

      return {
        insights:
          insights.sort(function (a, b) {
            if (a.name.toUpperCase() < b.name.toUpperCase()) {
              return -1;
            }
            if (a.name.toUpperCase() > b.name.toUpperCase()) {
              return 1;
            }
            return 0;
          }) ?? [],
        Agents: Agents.data,
        callDetails: callDetails.data,
      };
    } catch (error) {
      return rejectWithValue({ error: error });
    }
  }
);

export const getInsightDetails = createAsyncThunk(
  "Insight/getInsightDetails",
  async (id) => {
    try {
      let [Agents, callDetails] = await Promise.all([
        GetMethod(endPoints.getUserPresence(id)),
        GetMethod(endPoints.getCallDetails(id)),
      ]);

      return {
        Agents: Agents.data,
        callDetails: callDetails.data,
      };
    } catch (error) {
      return error;
    }
  }
);

export const getAgentDetails = createAsyncThunk(
  "/getagentdetails/id",
  async (id) => {
    try {
      const users = await GetMethod(endPoints.getAgentdetails(id));
      console.log(users);
      return {
        users: users.data,
      };
    } catch (err) {
      return err;
    }
  }
);

export const getAgentcall = createAsyncThunk(
  "/getcreateasyncall/Id/id",
  async ({ tenentid, userid }) => {
    try {
      console.log("agent api", tenentid, userid);
      const agentcall = await GetMethod(
        endPoints.getAgentcalls(tenentid, userid)
      );

      return { agentcall: agentcall.data };
    } catch (err) {
      return err;
    }
  }
);

const initialState = {
  insightsArray: [],
  AgentPresence: {},
  callDetails: {},
  selectedAgent: 0,
  selectedTenant: "",
};

export const InsightSlice = createSlice({
  name: "Insight",
  initialState,
  reducers: {
    setSelectedTenant: (state, action) => {
      state.selectedTenant = action.payload;
    },
    setSelectedAgent: (state, action) => {
      state.selectedAgent = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(GetAllTenant.fulfilled, (state, { payload }) => {
        state.insightsArray = payload.insights;
        const [FirstTenant] = payload.insights;
        state.AgentPresence = payload.Agents;
        state.callDetails = payload.callDetails;
        state.selectedTenant = FirstTenant.id;
      })
      .addCase(GetAllTenant.rejected, (state, action) => { })
      .addCase(GetAllTenant.pending, (state) => { })
      .addCase(getInsightDetails.fulfilled, (state, { payload }) => {
        state.AgentPresence = payload.Agents;
        state.callDetails = payload.callDetails;
      })
      .addCase(getInsightDetails.pending, (state, { payload }) => {
        state.AgentPresence = {};
      })
      .addCase(getAgentDetails.pending, (state) => {
        state.selectedAgent = ""
        state.users = []
      })
      .addCase(getAgentDetails.fulfilled, (state, { payload }) => {

        state.users = payload.users;
        state.selectedAgent = payload.users[0].userID;
      })
      .addCase(getAgentcall.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.agentcall = payload.agentcall;
      });
  },
});

export const { setSelectedTenant, setSelectedAgent } = InsightSlice.actions;

export default InsightSlice.reducer;
