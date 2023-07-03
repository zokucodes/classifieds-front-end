import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect, useMemo, useState } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Backdrop from '@mui/material/Backdrop';
import 'dayjs/locale/en-gb';
import {
  Container,
  Typography,
  TextField,
  Button,
  Modal,
  Fade,
  Box,
  CssBaseline,
} from '@mui/material';
import './App.css'
import { useGlobalContext } from './contexts/GlobalContext'
import { grey, purple, red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PageSplash from './pages/public/PageSplash';
import PageRegister from './pages/auth/PageRegister';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import PageLogin from './pages/auth/PageLogin';
import { ERROR_MESSAGE_STRINGS } from './utils/values';
import { GetRandomIntInRange } from './utils/misc';
import PageVerifyEmail from './pages/auth/PageVerifyEmail';
import PageForgotPassword from './pages/auth/PageForgotPassword';
import PageResetPassword from './pages/auth/PageResetPassword';
import PageMainManagement from './pages/user/PageMainManagement';
import AuthWrapper from './components/auth/AuthWrapper';
import { PageStore } from './pages/stores/PageStore';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "auto",
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

// const getDesignTokens = (mode) => ({
//   palette: {
//     mode,
//     ...(mode === 'light'
//       ? {
//         // 👇 palette values for light mode
//         primary: { main: purple[300] },
//         // text: {
//         //   primary: grey[200],
//         // },
//       }
//       : {
//         // 👇 palette values for dark mode
//         primary: { main: purple[300] },
//         // text: {
//         //   primary: '#fff',
//         //   secondary: '#fff'
//         // },
//       }),
//     ...(mode === 'dark'
//       ? {
//         // 👇 palette values for light mode
//         primary: { main: purple[300] },
//         // text: {
//         //   primary: grey[200],
//         // },
//       }
//       : {
//         // 👇 palette values for dark mode
//         primary: { main: purple[300] },
//         // text: {
//         //   primary: '#fff',
//         //   secondary: '#fff'
//         // },
//       }),

//   },
//   typography: {
//     button: {
//       textTransform: 'none'
//     }
//   }

// });

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
        // 👇 palette values for light mode
        primary: { main: purple[300] },
        // text: {
        //   primary: grey[200],
        // },
      }
      : {
        // 👇 palette values for dark mode
        primary: { main: purple[300] },
        // text: {
        //   primary: '#fff',
        //   secondary: '#fff'
        // },
      }),
    ...(mode === 'dark'
      ? {
        // 👇 palette values for light mode
        primary: { main: purple[300] },
        // text: {
        //   primary: grey[200],
        // },
      }
      : {
        // 👇 palette values for dark mode
        primary: { main: purple[300] },
        // text: {
        //   primary: '#fff',
        //   secondary: '#fff'
        // },
      }),

  },
  typography: {
    button: {
      textTransform: 'none'
    }
  }

});


function App() {
  const { gErrors, gSnackbars, gSnackbarsOpen, gItems, gShowErrors, gSetShowErrors, gClearErrors, gSetColorMode, gColorMode } = useGlobalContext()

  const handleClose = () => {
    gSetShowErrors(false)
    setTimeout(() => {
      gClearErrors()
    }, 200)
  };

  const onSelectMode = (mode1) => {
    gSetColorMode(mode1)
  }


  const theme = useMemo(() => createTheme(getDesignTokens(gColorMode)), [gColorMode]);



  useEffect(() => {
    // Add listener to update styles
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => onSelectMode(e.matches ? 'dark' : 'light'));

    // Setup dark/light mode for the first time
    onSelectMode(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

    // Remove listener
    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', () => {
      });
    }
  }, [])



  const errorCodeText = () => {

    if (!gErrors[0]?.code) {
      return ERROR_MESSAGE_STRINGS.generic[GetRandomIntInRange(0, ERROR_MESSAGE_STRINGS.generic.length - 1)]
    }

    if (gErrors[0].code >= 400 && gErrors[0].code < 500) {
      switch (gErrors[0].code) {
        case 400:
          return ERROR_MESSAGE_STRINGS.user_error[GetRandomIntInRange(0, ERROR_MESSAGE_STRINGS.user_error.length - 1)]
        case 401:
          return "Unauthorised"
        case 403:
          return "Forbidden"
        case 404:
          return "Not Found"
        case 408:
          return "Timed Out"
        case 409:
          return "Data Conflict"
      }
    } else if (gErrors[0].code >= 500) {
      return "Internal Server Error"
    } else {
      return ERROR_MESSAGE_STRINGS.generic[GetRandomIntInRange(0, ERROR_MESSAGE_STRINGS.generic.length - 1)]
    }


  }

  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider adapterLocale='en-gb' dateAdapter={AdapterDayjs}>
        <Router>

          <header>
            {/* <NavBar /> */}
          </header>

          <div style={{ height: "100%" }} className='w-full'>
            <Routes>
              <Route path="/" element={<PageSplash />} />
              <Route path="/auth">
                <Route path='register' element={<PageRegister />} />
                <Route path='login' element={<PageLogin />} />
                <Route path='VerifyEmail' element={<PageVerifyEmail />} />
                <Route path='ForgotPassword' element={<PageForgotPassword />} />
                <Route path='ResetPassword' element={<PageResetPassword />} />

              </Route>
              <Route path="/app">
                <Route path="manage">
                  <Route path='' element={<AuthWrapper><PageMainManagement /></AuthWrapper>} />
                  <Route path='*' element={<AuthWrapper><PageMainManagement /></AuthWrapper>} />
                </Route>
                <Route path="store/:id" element={<PageStore />} />
              </Route>

            </Routes>
          </div>
          {
            gItems.length > 0 && (
              gItems.map((data, i) => (

                <div key={i}>
                  {data}
                </div>

              ))
            )
          }
          {

            gSnackbarsOpen && gSnackbars.length > 0 && (
              gSnackbars.map(data => (
                data
              ))
            )
          }
          {
            gErrors.length > 0 && (

              <>
                <Modal
                  open={gShowErrors}
                  onClose={handleClose}
                  slots={{ backdrop: Backdrop }}
                  slotProps={{
                    backdrop: {
                      timeout: 500,
                    },
                  }}
                >
                  <Fade in={gShowErrors}>
                    <Box sx={style}>
                      <Typography variant="h6" fontWeight={"bold"} component="h2">
                        {errorCodeText()}
                      </Typography>

                      {
                        gErrors.map(data => (
                          <Typography sx={{ mt: 2 }} key={data?.id}>{data?.msg}</Typography>
                        ))
                      }

                    </Box>
                  </Fade>
                </Modal>

              </>

            )

          }


        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default App
