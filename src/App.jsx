import Login from "./Login";

import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import {lightTheme, darkTheme} from './themes';

function App() {
  
const GlobalStyle = createGlobalStyle`
  body, html, #root, .App {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: ${props => props.theme.bgcolor};  remove this to fix the bg color
    color: ${props => props.theme.text};
  }

  // CHANGE COLOR OF THE PLACEHOLDERS (email and password)
  .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root {
    color: ${props => props.theme.text}!important;
  }

  // CHANGE COLOR OF THE SHOW/HIDE ICONS (password and confirm password)
  .css-1yq5fb3-MuiButtonBase-root-MuiIconButton-root {
    color: ${props => props.theme.text}!important;
  }

`;

  const [theme] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches? 'dark' : 'light');

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Login />
    </ThemeProvider>
  );
}

export default App;