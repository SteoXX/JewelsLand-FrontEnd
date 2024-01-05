import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { withTheme } from "styled-components";
import { darken } from "polished";

import axios from "axios";

function ForgotPassword({ theme }) {
  const [email, setEmail] = React.useState("");

  // When something changes in the text field, update the value of email
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleContinue = async (event) => {
    event.preventDefault();

    const response = await axios.post(
      `https://${process.env.REACT_APP_ORIGIN}:443/forgot_password`,
      {
        email: email,
      }
    );

    if (response.data.status === "UserNotFound") {
      alert("Email not found");
    } else if (response.data.status === "EmailSent") {
      //TODO
    } else if (response.data.status === "ErrorSendingEmail") {
      alert("Error sending email");
    }
  };

  return (
    <Container maxWidth="xs">
      {/* Creating the box that contains the email input text */}
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
          Forgot Password
        </Typography>

        {/* Create the text 'Sign in' */}
        <Typography
          variant="h5"
          component="div"
          sx={{
            color: theme?.text,
          }}
        >
          Insert your email
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
            sx={{
              "& .MuiInputLabel-root": {
                color: theme?.text,
              },
            }}
          />
        </Box>

        <Button variant="text" sx={{ mt: 0, mb: 2 }} onClick={handleContinue}>
          Continue
        </Button>
      </Box>
    </Container>
  );
}

export default withTheme(ForgotPassword);
