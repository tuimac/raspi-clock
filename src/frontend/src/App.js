import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider,  createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import HomeLayout from './layouts/HomeLayout';
import Main from './components/main/Main';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        },
        ::-webkit-scrollbar-thumb {
            background-color: #4682b4;
            border-radius: 8px;
        }`
    },
  },
});

class App extends React.Component {

  render() {
    return (
      <>
        <ThemeProvider theme={ darkTheme }>
          <CssBaseline />
          <HomeLayout />
          <BrowserRouter>
            <Box sx={{ px: 2 }}>
              <Routes>
                <Route path={ '/' } element={ <Main /> } />
              </Routes>
            </Box>
          </BrowserRouter>
        </ThemeProvider>
      </>
    );
  }
}

export default App;
