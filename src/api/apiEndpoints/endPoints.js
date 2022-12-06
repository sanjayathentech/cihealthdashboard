export const endPoints = {
    getResourceId: 'abde34c8-4147-4bf7-9744-54056591ff01/resources',
    generateToken: 'GetAccessToken',

    pushNewResources: "pushnewresources",
    updateFriendlyname: (id) => `resources/${id}`,
    bulkUpdateFriednlyname: 'bulkupdate',

    getTenantDetails: "getalltenantdetails",
    getUserPresence: (id) => `getuserpresence/${id}`,

    getAllresourcesandResourcetype: "getallresourcesandresourcetype"
}