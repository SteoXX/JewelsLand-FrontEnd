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

import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function LoginForm({ theme }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn } = React.useContext(AuthContext);

  // When something changes in the text field, update the value of email and password
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  // Control the visibility of the password field
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // LOG IN
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a User object with the email and password to send to the backend
    const user = {
      email: email,
      password: password,
    };

    // Send the data to the backend
    const response = await axios.post("https://localhost:443/login", user, {
      withCredentials: true,
    });

    // Use the response data to navigate or show errors
    if (response.data.status === "LoginSuccessful") {
      setIsLoggedIn(true);
      navigate("/");
    } else if (response.data.status === "InvalidCredentials") {
      alert("Invalid Credentials");
    } else if (response.data.status === "UserNotFound") {
      alert("User Not Found");
    } else if (response.data.status === "EmailNotVerified") {
      alert("Email Not Verified");
    }
  };

  // RESEND EMAIL FOR VERIFICATION
  const resendEmail = async (event) => {
    event.preventDefault();

    const response = await axios.post(
      "https://localhost:443/resend_email_verification",
      { email: email }
    );

    if (response.data.status === "NotRegisteredYet") {
      alert("Email is not registered yet");
    } else if (response.data.status === "EmailAlreadyVerified") {
      alert("Email is already verified");
      window.location.href = "/login";
    } else if (response.data.status === "EmailSent") {
      //TODO
    } else if (response.data.status === "ErrorSendingEmail") {
      alert("Error sending email");
    }
  };

  return (
    <Container maxWidth="xs">
      {/* Creating the box that contains the email ans password input text */}
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
          Welcome to JewelsLand
        </Typography>

        {/* Create the text 'Sign in' */}
        <Typography
          variant="h5"
          component="div"
          sx={{
            color: theme?.text,
          }}
        >
          {"Sign in"}
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
          {/* Email TextField */}
          <TextField
            required
            id="outlined-required"
            label="Email"
            type="email"
            fullWidth
            // rounding the border of the input field
            InputProps={{
              style: { borderRadius: "12px" },
            }}
            // changing email logic
            value={email}
            onChange={handleChangeEmail}
          />

          {/* Password TextField */}
          <TextField
            required
            id="outlined-password-input"
            label="Password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            fullWidth
            InputProps={{
              style: { borderRadius: "12px", color: theme?.text }, // backgroundColor change the color of the box
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
        </Box>

        {/* Create the 'Sing in' box and call the handleSubmit function on click */}
        <Button
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmit}
        >
          Log in
        </Button>

        {/* When pressing the "NOT REGISTERED" redirect the user to the login page */}
        <Button variant="text" sx={{ mt: 3, mb: 2 }}>
          <Link
            to="/register"
            style={{ textDecoration: "none", color: "inherit" }}
            underline="none"
          >
            Not registered? Register
          </Link>
        </Button>

        {/* resend email for verification */}
        <Button variant="text" sx={{ mt: 0, mb: 2 }} onClick={resendEmail}>
          Re-send email verification
        </Button>

        <Button variant="text" sx={{ mt: 0, mb: 2 }}>
          <Link
            to="/forgot_password"
            style={{ textDecoration: "none", color: "inherit" }}
            underline="none"
          >
            Forgot password?
          </Link>
        </Button>
      </Box>
    </Container>
  );
}

export default withTheme(LoginForm);
