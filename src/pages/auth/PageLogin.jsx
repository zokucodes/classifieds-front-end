import React, { useState } from 'react';
import { Button, TextField, Paper, Typography, CssBaseline } from '@mui/material';
import { Login } from '../../utils/api';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';

const PageLogin = () => {
    const navigate = useNavigate()
    const { gAddErrors, gToggleColorMode } = useGlobalContext()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)

    const handleClickForgotPassword = (e) => {
        e.stopPropagation()
        e.preventDefault()
        navigate(`/auth/ForgotPassword${email.trim().length > 0 ? `?email=${email.trim()}` : ""}`)
    }

    const handleLogin = (e) => {
        e.stopPropagation()
        e.preventDefault()
        setLoading(true)
        Login(gAddErrors, { email, password }).then(res => {
            console.log(res)
        }).finally(() => {
            setLoading(false)
        })
    }

    const handleClickRegister = (e) => {
        e.stopPropagation()
        e.preventDefault()
        navigate('/auth/register')
    }




    return (
        <main className='flex items-center justify-center lg:h-auto !h-full'>
            <CssBaseline />
            <Paper className="lg:h-auto lg:w-[40vw] w-full h-full" style={{ padding: '24px', }}>
                <Typography className='pb-12' variant="h4">Login</Typography>
                <form className='w-full flex flex-col' noValidate autoComplete="off" onSubmit={handleLogin}>
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
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button href="/auth/ForgotPassword" sx={{ marginLeft: "auto" }} onClick={handleClickForgotPassword} variant="text">Forgot Password?</Button>
                    <LoadingButton
                        loading={loading}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '24px' }}
                    >
                        Login
                    </LoadingButton>
                </form>
                <Button href="/auth/register" style={{ marginTop: '24px' }} onClick={handleClickRegister} variant="text">Don't have an account? Register</Button>
            </Paper>
        </main>
    )
}

export default PageLogin