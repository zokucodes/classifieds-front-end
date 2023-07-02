import React, { useState } from 'react';
import { Button, TextField, Paper, Typography, CssBaseline, Divider, Autocomplete } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { COUNTRIES_ARRAY, GetValidDOBRange } from '../../utils/values';
import { Register, SearchLocations } from '../../utils/api';
import { useGlobalContext } from '../../contexts/GlobalContext';
import { LoadingButton } from '@mui/lab';

const validDOBRange = GetValidDOBRange()

const PageRegister = () => {
  const navigate = useNavigate()
  const { gAddErrors } = useGlobalContext()

  const [dob, setDob] = useState(null)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [country, setCountry] = useState(null)
  const [state, setState] = useState(null)

  const [stateSearch, setStateSearch] = useState("")


  const [states, setStates] = useState([])

  const [completed, setCompleted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleClickRegister = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setLoading(true)
    Register(gAddErrors, {
      first_name: firstName,
      last_name: lastName,
      birth_date: dob.format('YYYY-MM-DD'),
      email: email,
      password: password,
      confirm_password: confirmPassword,
      state_id: state?.id
    }).then(res => {
      if (res.status == true) {
        setCompleted(true)
      }
    }).finally(() => {
      setLoading(false)
    })
  }



  const handleClickLogin = (e) => {
    e.stopPropagation()
    e.preventDefault()
    navigate('/auth/login')
  }

  const handleSearchStates = (e, newValue) => {
    setStateSearch(newValue)
    if (newValue.trim().length >= 2 && country) {
      SearchLocations(gAddErrors, { type: "STATE", query: newValue, country_id: country.id }).then(res => {
        if (res.status == true) {
          for (let i = 0; i < res.content.length; i++) {
            delete Object.assign(res.content[i], { ["label"]: res.content[i]["name"] })["name"];

          }

          setStates(res.content)
        }
      })
    } else {
      setStates([])
      setState(null)
    }

  }

  const RegisterElements = () => {
    return (
      <Paper className="lg:h-auto lg:w-[45vw] w-full h-full" style={{ padding: '24px', }}>
        <Typography className='pb-12' variant="h4">Register</Typography>
        <form noValidate autoComplete="off" onSubmit={handleClickRegister}>
          <div className='flex flex-col lg:gap-x-4 items-start lg:flex-row'>
            <div className='lg:w-1/2'>
              <div className='mb-[8px] w-full'>
                <DatePicker
                  value={dob}
                  onChange={newValue => setDob(newValue)}
                  label="Date of Birth *" className='w-full' maxDate={dayjs(validDOBRange.max)} minDate={dayjs(validDOBRange.min)} />
              </div>

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
            </div>
            <div className='lg:w-1/2'>
              <TextField
                sx={{ marginTop: "0" }}
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
              <Autocomplete
                disablePortal
                fullWidth
                value={country}
                onChange={(e, newValue) => {
                  setCountry(newValue)
                }}
                options={COUNTRIES_ARRAY}
                sx={{ marginTop: "16px", marginBottom: "8px" }}
                renderInput={(params) => <TextField {...params} label="Select Country..." />}
              />
              <Autocomplete
                disablePortal
                fullWidth
                value={state}
                disabled={!country}
                inputValue={stateSearch}
                onInputChange={handleSearchStates}
                onChange={(e, newValue) => {
                  setState(newValue)
                }}
                options={states}
                sx={{ marginTop: "24px", marginBottom: "8px" }}
                renderInput={(params) => <TextField {...params} label={!country ? "Select a country first..." : "Select State..."} />}
              />
            </div>
          </div>



          <LoadingButton
            disabled={loading}
            loading={loading}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: '24px' }}
          >
            Register
          </LoadingButton>
          <Typography variant='body2' className='pt-4'>By clicking Register, you agree to our Privacy Policy and Terms of Service.</Typography>
          <Divider className='py-4' />
          <Button onClick={handleClickLogin} style={{ marginTop: '24px' }} variant="text">Already have an account? Login</Button>
        </form>
      </Paper>
    )
  }


  const CompletedElements = () => {
    return (
      <Paper className="lg:h-auto lg:w-auto w-full h-full" style={{ padding: '24px', }}>
        <Typography className='pb-12' variant="h4">Verify Your Email</Typography>
        <div className='text-left flex flex-col gap-2'>
          <Typography fontSize={20}>Verification email sent to <span className='font-semibold'>{email || "null"}</span></Typography>
          <Typography className='pt-2' variant='body1'>Click the verification link on the email to verify your account.</Typography>
          <Typography variant='body1'>The link is only valid for the next 24 hours.</Typography>
          <Typography className='pt-8 pb-8' variant='body1'>Note: The email may take a few minutes to appear in your inbox.</Typography>
        </div>

        <Button onClick={handleClickLogin} style={{ marginTop: '24px' }} variant="contained">Already verified? Login</Button>
      </Paper>
    )
  }



  return (
    <main className='flex items-center justify-center lg:h-auto !h-full'>
      <CssBaseline />
      {
        !completed ? (
          RegisterElements()
        ) : (
          CompletedElements()
        )
      }
    </main>
  )
}

export default PageRegister;
