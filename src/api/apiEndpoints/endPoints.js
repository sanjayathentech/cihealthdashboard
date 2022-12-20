export const endPoints = {
  getResourceId: "abde34c8-4147-4bf7-9744-54056591ff01/resources",
  generateToken: "GetAccessToken",

  getHealthStatus: "getresourcehealthstatus/11",

  pushNewResources: "pushnewresources",
  updateFriendlyname: (id) => `resources/${id}`,
  bulkUpdateFriednlyname: "bulkupdate",

  getTenantDetails: "getalltenantdetails",
  getUserPresence: (id) => `getuserpresence/${id}`,
  getCallDetails: (id) => `getagentcalldetailsbytenantId/${id}`,

  getAllresourcesandResourcetype: "getallresourcesandresourcetype",
  getWorkflowStatus: (id) => `getworkflowstatus?resourceId=${id}`,
  getDeploymentslotsstatus: (id) => `getdeploymentslotsstatus?resourceId=${id}`,

  getAgentdetails: (id) => `getagentdetails/${id}`,
  getAgentcalls: (tenantId, userId) => `getagentcalldetailsbyuserid/${tenantId}/${userId}`,


  getMetricsAPIManagement: (timespan) => `https://management.azure.com/subscriptions/abde34c8-4147-4bf7-9744-54056591ff01/resourceGroups/apimanagement/providers/Microsoft.ApiManagement/service/ci-dev/providers/microsoft.Insights/metrics?api-version=2019-07-01&metricnames=FailedRequests`,
  getMetricsLogicApp: "https://management.azure.com/subscriptions/abde34c8-4147-4bf7-9744-54056591ff01/resourceGroups/logicapps/providers/Microsoft.Logic/workflows/ci-report-trigger-dev/providers/microsoft.Insights/metrics?timespan=2022-12-15T14:30:00.000Z/2022-12-19T15:30:00.000Z&interval=PT1H&metricnames=RunFailurePercentage&aggregation=total&metricNamespace=microsoft.logic%2Fworkflows&autoadjusttimegrain=true&validatedimensions=false&api-version=2019-07-01",
  getMetricsbotServices: "https://management.azure.com/subscriptions/abde34c8-4147-4bf7-9744-54056591ff01/resourceGroups/cibot/providers/Microsoft.BotService/botServices/altigen-test-bot/providers/microsoft.Insights/metrics?timespan=2022-12-18T16:00:00.000Z/2022-12-19T16:15:00.000Z&interval=PT15M&metricnames=RequestsTraffic&aggregation=count&metricNamespace=microsoft.botservice%2Fbotservices&autoadjusttimegrain=true&validatedimensions=false&api-version=2019-07-01",
  getMetricsSQLDatabase: "https://management.azure.com/subscriptions/abde34c8-4147-4bf7-9744-54056591ff01/resourceGroups/coreinteractqadbms/providers/Microsoft.Sql/servers/coreinteractqa/databases/coreinteractdb/providers/microsoft.Insights/metrics?timespan=2022-12-12T15:30:00.000Z/2022-12-19T16:30:00.000Z&interval=PT1H&metricnames=deadlock&aggregation=total&metricNamespace=microsoft.sql%2Fservers%2Fdatabases&autoadjusttimegrain=true&validatedimensions=false&api-version=2019-07-01"
};
