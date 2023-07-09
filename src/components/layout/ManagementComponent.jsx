import { Paper } from "@mui/material"
import VerticalTabs from "./VerticalTabs"
import UserSettingsManagementComponent from "../management/UserSettingsManagementComponent"
import UserListingsManagementComponent from "../management/UserListingsManagementComponent"
import UserStoresManagementComponent from "../management/UserStoresManagementComponent"
import CreateListingManagementComponent from "../management/CreateListingManagementComponent"

const ManagementComponent = () => {

    return (
        <Paper className="h-full w-full">
            <VerticalTabs
                items={[
                    {
                        title: "Settings",
                        element: (<UserSettingsManagementComponent />)
                    },
                    {
                        title: "Create Listing",
                        element: (<CreateListingManagementComponent />)
                    },
                    {
                        title: "My Listings",
                        element: (<UserListingsManagementComponent />)
                    },
                    {
                        title: "My Stores",
                        element: (<UserStoresManagementComponent />)
                    },
                    
                    
                ]}
            />
        </Paper >

    )
}

export default ManagementComponent