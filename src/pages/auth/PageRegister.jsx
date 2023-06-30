import React, { useState } from 'react';
import { Button, TextField, Grid, Paper, Typography } from '@mui/material';

const PageRegister = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleRegister = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }

  return (
    <div className='flex items-center justify-center lg:h-auto !h-full'>
      <Paper className="lg:h-auto h-full" style={{ padding: '24px',  }}>
        <Typography variant="h6">Register</Typography>
        <form noValidate autoComplete="off" onSubmit={handleRegister}>
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="cpassword"
            label="Confirm Password"
            type="cpassword"
            id="cpassword"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: '24px' }}
          >
            Register
          </Button>
        </form>
      </Paper>
    </div>

  )
}


export default PageRegister;
