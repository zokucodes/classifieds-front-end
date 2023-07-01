import React, { useState } from 'react';
import { Button, TextField, Paper, Typography, CssBaseline } from '@mui/material';
import { Login } from '../../utils/api';
import { useGlobalContext } from '../../contexts/GlobalContext';

const PageLogin = () => {
    const { gAddErrors, gToggleColorMode } = useGlobalContext()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.stopPropagation()
        e.preventDefault()
        Login(gAddErrors, { email, password }).then(res => {
            console.log(res)
        })
    }


    return (
        <main className='flex items-center justify-center lg:h-auto !h-full'>
            <CssBaseline />
            <Paper className="lg:h-auto lg:w-[40vw] h-full" style={{ padding: '24px', }}>
                <Typography className='pb-12' variant="h4">Login</Typography>
                <form className='w-full' noValidate autoComplete="off" onSubmit={handleLogin}>
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
                    <Button onClick={gToggleColorMode} variant="text">Forgot Password?</Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '24px' }}
                    >
                        Login
                    </Button>
                </form>
            </Paper>
        </main>
    )
}

export default PageLogin