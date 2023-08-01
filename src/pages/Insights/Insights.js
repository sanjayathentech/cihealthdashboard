import React, { useEffect } from "react";
import { Grid, Box, Stack } from "@mui/material";
import "./insights.css";
import FormSelect from "../../components/Forms/FormSelect";
import { useDispatch, useSelector } from "react-redux";
import {
  getAgentcall,
  getAgentDetails,
  getInsightDetails,
  setSelectedAgent,
  setSelectedTenant,
} from "../../Redux/InsightSlice/InsightSlice";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";

function Insights() {
  const dispatch = useDispatch();
  const {
    insightsArray,
    AgentPresence,
    selectedTenant,
    callDetails,
    users,
    selectedAgent,
    agentcall,
  } = useSelector((state) => state.Insight);

  let sum =
    AgentPresence?.ready +
    AgentPresence?.offline +
    AgentPresence?.notReady +
    AgentPresence?.busy;

  useEffect(() => {
    if (selectedTenant) {
      dispatch(getAgentDetails(selectedTenant));
    }
  }, [selectedTenant]);


  console.log('tenent',selectedTenant)

  useEffect(() => {
    dispatch(
      getAgentcall({ tenentid: selectedTenant, userid: selectedAgent }));
  }, [selectedAgent]);

  const handleagentselect = (e) => {
    console.log(selectedTenant, e.target.value);
    dispatch(setSelectedAgent(e.target.value));
  };

  return (
    <>
      <Box className="insight-container">
        <div
          style={{ fontWeight: 600, fontSize: "18px", marginBottom: "20px" }}
        >
          <span>Insights</span>
        </div>

        <Grid container rowSpacing={2} columnSpacing={4}>
          <Grid item xs={5} md={12}>
            <Box
              sx={{
                marginBottom: "10px",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <span style={{ fontWeight: 500, fontSize: "14px" }}>
                Customer
              </span>
              &emsp;
              <FormSelect
                menuItems={insightsArray}
                labelVisible={false}
                backGroundColor="#ECEDEF"
                selectOption={selectedTenant}
                handleSelectChange={(e) => {
                  dispatch(getInsightDetails(e.target.value));
                  dispatch(setSelectedTenant(e.target.value));
                }}
              />
              &emsp;
              <FormSelect
                menuItems={users?.map((user) => ({
                  id: user.userID,
                  name: user.user_FirstName,
                }))}
                labelVisible={false}
                backGroundColor="#ECEDEF"
                selectOption={selectedAgent}
                handleSelectChange={handleagentselect}
              />
            </Box>

            <Box></Box>
          </Grid>
          <Grid item md={6}>
            <Box className="workgroup-team-stats" sx={{ height: "462px" }}>
              <Grid container spacing={6}>
                <Grid item md={12}>
                  <Box className="workgroup-stat-cards-Agents">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "40px",
                        flexDirection: "row",
                      }}
                    >
                      <SupportAgentOutlinedIcon
                        sx={{
                          color: "#f2784b",
                          paddingLeft: "10px",
                          scale: "4",
                        }}
                      />

                      <span className="count-text" style={{ fontSize: "28px" }}>
                        {sum ? sum : 0}
                      </span>
                    </Box>

                    <span
                      className="name-text"
                      style={{ fontSize: "18px", fontWeight: 600 }}
                    >
                      Total Agents
                    </span>
                  </Box>
                </Grid>
                <Grid item md={6}>
                  <Box className="workgroup-stat-cards">
                    <span className="count-text">
                      {AgentPresence?.ready ? AgentPresence?.ready : 0}
                    </span>
                    <span className="name-text">Available</span>
                  </Box>
                </Grid>
                <Grid item md={6}>
                  <Box className="workgroup-stat-cards">
                    <span className="count-text">
                      {AgentPresence?.offline ? AgentPresence?.offline : 0}
                    </span>
                    <span className="name-text">Offline</span>
                  </Box>
                </Grid>
                <Grid item md={6}>
                  <Box className="workgroup-stat-cards">
                    <span className="count-text">
                      {AgentPresence?.notReady ? AgentPresence?.notReady : 0}
                    </span>
                    <span className="name-text">Away</span>
                  </Box>
                </Grid>
                <Grid item md={6}>
                  <Box className="workgroup-stat-cards">
                    <span className="count-text">
                      {AgentPresence?.busy ? AgentPresence?.busy : 0}
                    </span>
                    <span className="name-text">Busy</span>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item md={6}>
            <Box className="workgroup-team-stats">
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <Box className="workgroup-stat-cards-Agents">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "40px",
                        flexDirection: "row",
                      }}
                    >
                      <SupportAgentOutlinedIcon
                        sx={{
                          color: "#f2784b",
                          paddingLeft: "10px",
                          scale: "4",
                        }}
                      />

                      <span className="count-text" style={{ fontSize: "28px" }}>
                        {callDetails?.totalCalls ? callDetails?.totalCalls : 0}
                      </span>
                    </Box>

                    <span
                      className="name-text"
                      style={{ fontSize: "18px", fontWeight: 600 }}
                    >
                      Total Calls
                    </span>
                  </Box>
                </Grid>
                <Grid item md={6}>
                  <Box className="workgroup-stat-cards">
                    <span className="count-text">
                      {callDetails?.rejectedCalls
                        ? callDetails?.rejectedCalls
                        : 0}
                    </span>
                    <span className="name-text">Rejected Calls</span>
                  </Box>
                </Grid>
                <Grid item md={6}>
                  <Box className="workgroup-stat-cards">
                    <span className="count-text">
                      {callDetails?.closedCalls ? callDetails?.closedCalls : 0}
                    </span>
                    <span className="name-text">Closed Calls </span>
                  </Box>
                </Grid>
                <Grid item md={6}>
                  <Box className="workgroup-stat-cards">
                    <span className="count-text">
                      {callDetails?.activeCalls ? callDetails?.activeCalls : 0}
                    </span>
                    <span className="name-text">Active Calls</span>
                  </Box>
                </Grid>
                <Grid item md={6}>
                  <Box className="workgroup-stat-cards">
                    <span className="count-text">
                      {callDetails?.answeredCalls
                        ? callDetails?.answeredCalls
                        : 0}
                    </span>
                    <span className="name-text">Answered Calls </span>
                  </Box>
                </Grid>
                <Grid item md={6}>
                  <Box className="workgroup-stat-cards">
                    <span className="count-text">
                      {callDetails?.internalalTransferredCalls
                        ? callDetails?.internalalTransferredCalls
                        : 0}
                    </span>
                    <span className="name-text">
                      Internal Transferred Calls{" "}
                    </span>
                  </Box>
                </Grid>
                <Grid item md={6}>
                  <Box className="workgroup-stat-cards">
                    <span className="count-text">
                      {callDetails?.externalTransferredCalls
                        ? callDetails?.externalTransferredCalls
                        : 0}
                    </span>
                    <span className="name-text">
                      External Transferred Calls{" "}
                    </span>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>

        <Box className="workgroup-team-stats" sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item md={12}>
              <Box className="workgroup-stat-cards-Agents">
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "40px",
                    flexDirection: "row",
                  }}
                >
                  <SupportAgentOutlinedIcon
                    sx={{
                      color: "#f2784b",
                      paddingLeft: "10px",
                      scale: "4",
                    }}
                  />

                  <span className="count-text" style={{ fontSize: "28px" }}>
                    {agentcall?.totalCalls ?? 0}
                  </span>
                </Box>

                <span
                  className="name-text"
                  style={{ fontSize: "18px", fontWeight: 600 }}
                >
                  Total Calls by Customer
                </span>
              </Box>
            </Grid>
            <Grid item md={6}>
              <Box className="workgroup-stat-cards">
                <span className="count-text">
                  {agentcall?.rejectedCalls ?? 0}
                </span>
                <span className="name-text">Rejected Calls</span>
              </Box>
            </Grid>
            <Grid item md={6}>
              <Box className="workgroup-stat-cards">
                <span className="count-text">
                  {agentcall?.closedCalls ?? 0}
                </span>
                <span className="name-text">Closed Calls </span>
              </Box>
            </Grid>
            <Grid item md={6}>
              <Box className="workgroup-stat-cards">
                <span className="count-text">
                  {agentcall?.activeCalls ?? 0}
                </span>
                <span className="name-text">Active Calls</span>
              </Box>
            </Grid>
            <Grid item md={6}>
              <Box className="workgroup-stat-cards">
                <span className="count-text">
                  {agentcall?.answeredCalls ?? 0}
                </span>
                <span className="name-text">Answered Calls </span>
              </Box>
            </Grid>
            <Grid item md={6}>
              <Box className="workgroup-stat-cards">
                <span className="count-text">
                  {agentcall?.internalalTransferredCalls ?? 0}
                </span>
                <span className="name-text">Internal Transferred Calls </span>
              </Box>
            </Grid>
            <Grid item md={6}>
              <Box className="workgroup-stat-cards">
                <span className="count-text">
                  {agentcall?.externalTransferredCalls ?? 0}
                </span>
                <span className="name-text">External Transferred Calls </span>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* <Box className="workgroup-container">
                <Box className="workgroup-stat">
                    <span className="count-text">{sum ? sum : 0}</span>
                    <span className="name-text">Total Agents</span>
                </Box>
                <Box className="workgroup-stat">
                    <span className="count-text">{AgentPresence.ready ? AgentPresence.ready : 0}</span>
                    <span className="name-text">Available</span>
                </Box>
                <Box className="workgroup-stat">
                    <span className="count-text">{AgentPresence.offline ? AgentPresence.offline : 0}</span>
                    <span className="name-text">Offline</span>

                </Box>
                <Box className="workgroup-stat">
                    <span className="count-text">{AgentPresence.notReady ? AgentPresence.notReady : 0}</span>
                    <span className="name-text">Away</span>
                </Box>
                <Box className="workgroup-stat">
                    <span className="count-text">{AgentPresence.busy ? AgentPresence.busy : 0}</span>
                    <span className="name-text">Busy</span>
                </Box>
            </Box> */}
    </>
  );
}

export default Insights;
