import React, { useState } from 'react';
import { Button, TextField, Grid, Paper, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const PageRegister = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }

  return (
    <div className='flex items-center justify-center lg:h-auto !h-full'>
      <Paper className="lg:h-auto w-[30vw] h-full" style={{ padding: '24px',  }}>
        <Typography className='pb-12' variant="h4">Register</Typography>
        <form noValidate autoComplete="off" onSubmit={handleRegister}>
          <DatePicker className='w-full' minDate={dayjs('2022-01-01')} />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
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
            type="password"
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
