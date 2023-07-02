import { Button, CircularProgress, CssBaseline, Paper, Typography } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { VerifyEmail } from "../../utils/api";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { ENV_SUPPORT_EMAIL } from "../../utils/values";

const PageVerifyEmail = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const { gAddErrors } = useGlobalContext()

    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token')

    const [complete, setComplete] = useState(false)
    const [loading, setLoading] = useState(true)


    const handleClickLogin = (e) => {
        e.stopPropagation()
        e.preventDefault()
        navigate('/auth/login')
    }


    useLayoutEffect(() => {
        if (token) {
            VerifyEmail(gAddErrors, { token: token }).then(res => {
                if (res.status == true || res?.error[0]?.code == 409) {
                    setComplete(true)
                }
            }).finally(() => {
                setLoading(false)
            })
        } else {
            gAddErrors({ msg: "Token not set. Maybe you didn't copy the entire link?" })
        }

    }, [])


    const CompleteElements = () => {
        return (
            <>
                <div className='flex flex-col gap-2'>
                    <Typography className='pt-8 pb-8' variant='body1'>You may login to continue.</Typography>
                </div>

                <Button onClick={handleClickLogin} style={{ marginTop: '24px' }} variant="contained">Login</Button>
            </>

        )
    }

    const LoadingElements = () => {
        return (
            <CircularProgress size={100} />
        )
    }

    const FailedElements = () => {
        return (
            <>
                <Typography className="pb-6" variant='body1'>Failed to verify email.</Typography>
                <Typography variant='body1'>If you are experiencing issues, contact us at</Typography>
                <Typography fontWeight={"bold"} variant='body1'>{ENV_SUPPORT_EMAIL}</Typography>
                <Button onClick={handleClickLogin} style={{ marginTop: '24px' }} variant="contained">Already verified? Login</Button>
            </>

        )
    }

    return (
        <main className='flex items-center justify-center lg:h-auto !h-full'>
            <CssBaseline />
            <Paper className="lg:min-h-[30%] lg:h-auto lg:w-[30vw] w-full h-full" style={{ padding: '24px', }}>
                <Typography className='pb-12' variant="h4">{loading ? ("Email Verification") : (
                    complete ? "Email Verified" : "Error"
                )}</Typography>
                {
                    loading ? (
                        LoadingElements()
                    ) : (
                        !complete ? (
                            FailedElements()
                        ) : (
                            CompleteElements()
                        )
                    )

                }
            </Paper>

        </main>
    )
}

export default PageVerifyEmail