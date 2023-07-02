import React, { useState } from 'react';
import { Button, TextField, Paper, Typography, CssBaseline } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { LoadingButton } from '@mui/lab';
import { useLocation, useNavigate } from 'react-router-dom';
import { ForgotPassword } from '../../utils/api';
import { ENV_APPNAME } from '../../utils/values';


const PageForgotPassword = () => {
    document.title = `Forgot Password | ${ENV_APPNAME}`
    const navigate = useNavigate()

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const PARAMS_EMAIL = queryParams.get('email');

    const { gAddErrors } = useGlobalContext()

    const [email, setEmail] = useState(PARAMS_EMAIL || "")

    const [loading, setLoading] = useState(false)
    const [completed, setCompleted] = useState(false)


    const handleClickLogin = (e) => {
        e.stopPropagation()
        e.preventDefault()
        navigate('/auth/login')
    }

    const handleResetPasswordClick = (e) => {
        e.stopPropagation()
        e.preventDefault()
        setLoading(true)
        ForgotPassword(gAddErrors, { email: email }).then(res => {
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
                    <Typography className='pb-12' variant="h4">Check Your Email</Typography>
                    <div className='text-left flex flex-col gap-2'>
                        <Typography fontSize={20}>Password reset email sent to <span className='font-semibold'>{email || "null"}</span></Typography>
                        <Typography className='pt-2' variant='body1'>Click the password reset link in the email to reset your password.</Typography>
                    </div>

                </div>

                <Button onClick={handleClickLogin} style={{ marginTop: '4em' }} variant="contained">Already reset your password? Login</Button>
            </>

        )
    }

    const Elements = () => {
        return (
            <>
                <div className='flex mb-12 w-full flex-row items-center justify-center relative'>
                    <button onClick={handleClickLogin} className='!bg-transparent absolute left-0 m-auto'>
                        <ChevronLeftIcon fontSize="large" />
                    </button>
                    <Typography variant="h4">Forgot Password</Typography>
                </div>

                <Typography className='text-left' variant='body1'>Enter your email address and click the button.</Typography>
                <Typography className='pt-2'>If an account with the given email is found, a password reset email will be sent to it.</Typography>
                <form className='w-full flex flex-col mt-6' noValidate autoComplete="off" onSubmit={handleResetPasswordClick}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        autoComplete="email"
                    />
                    <LoadingButton
                        loading={loading}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '24px' }}
                    >
                        Send Password Reset Email
                    </LoadingButton>
                </form>
            </>
        )
    }

    return (
        <main className='flex items-center justify-center lg:h-auto !h-full'>
            <CssBaseline />
            <Paper className="lg:h-auto lg:w-auto w-full h-full" style={{ padding: '24px', }}>
                {
                    !completed ? (
                        Elements()
                    ) : (
                        CompletedElements()
                    )
                }
            </Paper>
        </main>
    )
}

export default PageForgotPassword