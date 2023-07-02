import ManagementComponent from "../../components/layout/ManagementComponent"
import { ENV_APPNAME } from "../../utils/values"
import MainPageTemplate from "../templates/MainPageTemplate"

const PageMainManagement = () => {
    document.title = `Manage | ${ENV_APPNAME}`

    

    return (
        <MainPageTemplate NAV_ENABLED={true}
            ELEMENTS={
                <ManagementComponent />
            }
        />
    )
}

export default PageMainManagement