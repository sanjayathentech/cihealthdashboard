import Health from "../pages/Health/Health"
import Insights from "../pages/Insights/Insights"
import ManageResources from "../pages/ManageResources/ManageResources"

export const routes = [
    { path: '/health', name: 'Health', element: <Health /> },
    { path: '/insights', name: 'Health', element: <Insights /> },
    { path: '/manage-resources', name: 'Manage Resources', element: <ManageResources /> }
]