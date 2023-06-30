import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect, useMemo, useState } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useGlobalContext } from './contexts/GlobalContext'
import { grey, purple, red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PageSplash from './pages/public/PageSplash';
import PageRegister from './pages/auth/PageRegister';

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
  },
});

function App() {
  //const { globalErrors, globalShowErrors, globalClearErrors, globalItems } = useGlobalContext()
  const [mode, setMode] = useState('light');

  const onSelectMode = (mode1) => {
    setMode(mode1)
  }

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);



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

  return (
    <Router>
      <header>
        {/* <NavBar /> */}
      </header>
      <ThemeProvider theme={theme}>
        <div className='w-full h-screen white'>
          <Routes>
            <Route path="/" element={<PageSplash />} />
            <Route path="/auth">
              <Route path='register' element={<PageRegister />} />

            </Route>
          </Routes>
        </div>
      </ThemeProvider>

    </Router>
  )
}

export default App
