import { Button, CssBaseline, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const PageVerifyEmail = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token')



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

export default PageVerifyEmail