import { useGlobalContext } from "../../contexts/GlobalContext"
import { ENV_APPNAME } from "../../utils/values"

const AuthWrapper = ({ children, redirect, title }) => {
    const { gLoggedIn } = useGlobalContext()
    document.title = title || ENV_APPNAME

    if (!gLoggedIn) {
        window.location = redirect ? redirect : `/auth/login`
        return ("")
    }

    return (
        children
    )
}


export default AuthWrapper