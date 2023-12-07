import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { withTheme } from "styled-components";
import { darken } from "polished";

import axios from "axios";

import { Link } from "react-router-dom";

function RegisterForm({ theme }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  // When something changes in the text field, update the value of email, password, and confirmPassword
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeConfirmpassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  // Control the visibility of the password and confirmPassword fields
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  // When the form is submitted, send the data to the backend
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Chech if the password and confirmPassword value matches
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Create a User object with the email and password to send to the backend
    const user = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    // Send the data to the backend
    const response = await axios.post("http://localhost:3001/register", user);

    // Print the response from the backend to the console
    console.log(response.data.message);

    // Redirect the user to the login page if the registrations is successful
    if (response.data.state === "success") {
      window.location.href = "/login";
    } else {
      alert(response.data.message);
    }
  };

  return (
    <Container maxWidth="xs">
      {/* Creating the box that contains the email, password and confirmPassword input text */}
      <Box
        component="form"
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: darken(0.08, theme?.bgcolor),
          overflow: "hidden",
          borderRadius: "12px",
          boxShadow: 1,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          "& .MuiTextField-root": { m: 1, width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        <Typography
          variant="h5"
          component="div"
          sx={{
            marginTop: "1rem",
            fontSize: "1.7rem",
            paddingBottom: "1rem",
            fontWeight: "bold",
            color: theme?.text,
          }}
        >
          {"Welcome to JewishLand"}
        </Typography>

        {/* Create the text 'Register' */}
        <Typography
          variant="h5"
          component="div"
          sx={{
            color: theme?.text,
          }}
        >
          {"Register"}
        </Typography>

        {/* Boxes */}
        <Box
          sx={{
            width: "80%",
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Email textField */}
          <TextField
            required
            id="outlined-required"
            label="Email"
            type="email"
            fullWidth
            InputProps={{
              style: { borderRadius: "12px" },
            }}
            // changing email logic
            value={email}
            onChange={handleChangeEmail}
          />

          {/* Password textField */}
          <TextField
            required
            id="outlined-password-input"
            label="Password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            fullWidth
            InputProps={{
              style: { borderRadius: "12px", color: theme?.text },
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
            // changing password logic
            value={password}
            onChange={handleChangePassword}
          />

          {/* Creating a text field for the confirmPassword */}
          <TextField
            required
            id="outlined-confirm-password-input"
            label="Confirm Password"
            type={showPassword2 ? "text" : "password"}
            autoComplete="current-password"
            fullWidth
            InputProps={{
              style: { borderRadius: "12px" },
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
            value={confirmPassword}
            onChange={handleChangeConfirmpassword}
          />
        </Box>

        {/* Create the 'Register' box and call the handleSubmit function on click */}
        <Button
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmit}
        >
          {"Register"}
        </Button>

        {/* When pressing the "ALREADY REGISTERED" redirect the user to the login page */}
        <Button variant="text" sx={{ mt: 3, mb: 2 }}>
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "inherit" }}
            underline="none"
          >
            Already registered? Sign in
          </Link>
        </Button>
      </Box>
    </Container>
  );
}

export default withTheme(RegisterForm);
