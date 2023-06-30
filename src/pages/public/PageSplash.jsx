import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

const PageSplash = () => {
    const navigate = useNavigate()

    const handleClickRegister = (e) => {
        e.stopPropagation()
        e.preventDefault()
        //navigate('/auth/register');
    }

    return (
        <>
            <Button variant="contained" onClick={handleClickRegister}>
                Sign Up
            </Button>
        </>
    )
}


export default PageSplash