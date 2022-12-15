export const endPoints = {
  getResourceId: "abde34c8-4147-4bf7-9744-54056591ff01/resources",
  generateToken: "GetAccessToken",

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
  getAgentcalls: (tenantId, userId) =>
    `getagentcalldetailsbyuserid/${tenantId}/${userId}`,
};
