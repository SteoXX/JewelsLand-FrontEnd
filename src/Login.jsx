import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { withTheme } from 'styled-components';
import { darken } from "polished";


function LoginForm({theme}) {
  const [isRegistered, setIsRegistered] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);


  const handleSwitch = () => {
    setIsRegistered(!isRegistered);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };


  return (
    <Container maxWidth="xs">
      {/* Creating the box that contains the email ans password input text */}
      <Box
        component="form"
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: darken(0.08, theme?.bgcolor),
          overflow: 'hidden',
          borderRadius: '12px',
          boxShadow: 1,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          '& .MuiTextField-root': { m: 1, width: '100%' },
        }}
        noValidate
        autoComplete="off"
      >

        <Typography 
          variant="h5" 
          component="div" 
          sx={{
            marginTop: '1rem',
            fontSize: '1.7rem',
            paddingBottom: '1rem',
            fontWeight: 'bold',
            color: theme?.text,
          }}
        >
          {"Welcome to JewishLand"}
        </Typography>

        {/* changing the text between "Sing in" and "Register" */}
        <Typography 
          variant="h5" 
          component="div"
          sx={{
            color: theme?.text,
          }}
        >
          {isRegistered ? 'Sign in' : 'Register'}
        </Typography>

        {/* Boxes */}
        <Box
          sx={{
            width: '80%',
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >

          {/* Email Box */}
          <TextField 
            required 
            id="outlined-required"
            label="Email"
            type="email"
            fullWidth
            // rounding the border of the input field
            InputProps={{
              style: { borderRadius: '12px'},
            }}
          />

          {/* Password box */}
          <TextField
            required
            id="outlined-password-input"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            fullWidth
            InputProps={{
              style: { borderRadius: '12px', color: theme?.text}, // backgroundColor change the color of the box
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
          {/* When pressing the "NOT REGISTERED" make appear the "Confirm Password button" */}
          {!isRegistered && (
            <TextField
              required
              id="outlined-confirm-password-input"
              label="Confirm Password"
              type={showPassword2 ? 'text' : 'password'}
              autoComplete="current-password"
              fullWidth
              InputProps={{
                style: { borderRadius: '12px'},
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword2}
                      edge="end"
                    >
                      {showPassword2 ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        </Box>

        {/* Changin the text between "Log in" and "Not registered?" */}
        <Button variant="contained" sx={{ mt: 3, mb: 2}}>
          {isRegistered ? 'Log in' : 'Register'}
        </Button>

        {/* When pressing the "NOT REGISTERED" make appear the "Confirm Password button" and changing the text in Already registered? Sign in */}
        <Button variant="text" sx={{ mt: 3, mb: 2}} onClick={handleSwitch}>
          {isRegistered ? 'Not registered? Register' : 'Already registered? Sign in'}
        </Button>  
      </Box>
    </Container>
  );
}

export default withTheme(LoginForm);