import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider,  createTheme } from '@mui/material/styles';
import { useFullScreenHandle } from "react-full-screen";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import Layout from './layouts/Layout';
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
  typography: {
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 700,

    h1: { fontSize: 100 },
    h2: { fontSize: 48 },
    h3: { fontSize: 42 },
    h4: { fontSize: 36 },
    h5: { fontSize: 20 },
    h6: { fontSize: 18 },
    subtitle1: { fontSize: 18 },
    body1: { fontSize: 16 },
    button: { textTransform: 'none' },
  }
});

function App() {

  const fullScreenHandle = useFullScreenHandle();

  return (
    <>
      <ThemeProvider theme={ darkTheme }>
        <CssBaseline />
        <Layout fullScreenHandle={ fullScreenHandle }/>
        <BrowserRouter>
          <Routes>
            <Route path={ '/' } element={ <Main fullScreenHandle={ fullScreenHandle }/> } />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
