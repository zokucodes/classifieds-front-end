import React, { useState } from 'react';
import { Button, TextField, Paper, Typography } from '@mui/material';

const PageLogin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.stopPropagation()
        e.preventDefault()
    }


    return (
        <div className='flex items-center justify-center lg:h-auto !h-full'>
            <Paper className="lg:h-auto lg:w-[30vw] h-full" style={{ padding: '24px', }}>
                <Typography className='pb-12' variant="h4">Login</Typography>
                <form noValidate autoComplete="off" onSubmit={handleLogin}>

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
        </div>
    )
}

export default PageLogin