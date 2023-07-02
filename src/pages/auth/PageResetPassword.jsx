import { Button, CssBaseline, Paper, TextField, Typography } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { ResetPasswordFromEmail } from "../../utils/api";
import { ENV_APPNAME } from "../../utils/values";

const PageResetPassword = () => {
    document.title = `Reset Password | ${ENV_APPNAME}`
    const navigate = useNavigate()
    const location = useLocation();
    const { gAddErrors } = useGlobalContext()

    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token')

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [completed, setCompleted] = useState(false)
    const [loading, setLoading] = useState(true)


    const handleClickLogin = (e) => {
        e.stopPropagation()
        e.preventDefault()
        navigate('/auth/login')
    }


    useLayoutEffect(() => {
        if (!token) {
            gAddErrors({ msg: "Token not set. Maybe you didn't copy the entire link?" })
        }

    }, [])

    const handleResetPassword = (e) => {
        e.stopPropagation()
        e.preventDefault()
        setLoading(true)
        ResetPasswordFromEmail(gAddErrors, { token: token, new_password: password, confirm_password: confirmPassword }).then(res => {
            if (res.status == true) {
                setCompleted(true)
            }
        }).finally(() => {
            setLoading(false)
        })
    }


    const CompletedElements = () => {
        return (
            <>
                <div className='flex flex-col gap-2'>
                    <Typography className='pt-8 pb-8' variant='body1'>Password successfully reset. Login to continue.</Typography>
                </div>

                <Button fullWidth onClick={handleClickLogin} style={{ marginTop: '24px' }} variant="contained">Login</Button>
            </>

        )
    }

    const Elements = () => {
        return (
            <>
                <Typography variant='body1'>Enter a new password and confirm to reset your password.</Typography>
                <div className='flex flex-col gap-2 mt-8'>
                    <TextField
                        sx={{ marginTop: "0" }}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="New Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="cpassword"
                        label="Confirm Password"
                        type="password"
                        id="cpassword"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />

                </div>

                <Button fullWidth onClick={handleResetPassword} style={{ marginTop: '24px' }} variant="contained">Reset Password</Button>
            </>
        )
    }

    return (
        <main className='flex items-center justify-center lg:h-auto !h-full'>
            <CssBaseline />
            <Paper className="lg:min-h-[30%] lg:h-auto lg:w-[30vw] w-full h-full" style={{ padding: '24px', }}>
                <Typography className='pb-12' variant="h4">Reset Password</Typography>
                {
                    !token ? (
                        <Typography>Token not set. Maybe you didn't copy the entire link?</Typography>
                    ) : (
                        !completed ? (
                            Elements()
                        ) : (
                            CompletedElements()
                        )
                    )


                }
            </Paper>

        </main>
    )
}

export default PageResetPassword