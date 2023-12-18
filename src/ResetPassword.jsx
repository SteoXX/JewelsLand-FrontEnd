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

import { useParams } from "react-router-dom";

import axios from "axios";

function ResetPassword({ theme }) {
  const { token } = useParams();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  // When something changes in the text field, update the value of password and confirmPassword
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

    // Send the data to the backend
    const response = await axios.post(
      `https://localhost:443/reset_password/${token}`,
      {
        changePasswordToken: token,
        password: password,
        confirmPassword: confirmPassword,
      }
    );

    if (response.data.status === "PasswordChanged") {
      alert("Password changed");
      window.location.href = "/login";
    } else if (response.data.status === "PasswordsDoNotMatch") {
      alert("Passwords do not match");
    } else if (response.data.status === "InvalidToken") {
      alert("Invalid token");
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
          Reset your password
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
          Confirm
        </Button>
      </Box>
    </Container>
  );
}

export default withTheme(ResetPassword);
