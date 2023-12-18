import { useParams } from "react-router-dom";
import axios from "axios";
import * as React from "react";

import { Button } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { green } from "@mui/material/colors";

import { withTheme } from "styled-components";

function VerifyEmail({ theme }) {
  const { token } = useParams();
  const [emailVerified, setEmailVerified] = React.useState(false);
  const [getNewToken, setGetNewToken] = React.useState(false);

  const handleVerifyEmail = async (event) => {
    event.preventDefault();

    const response = await axios.post(
      `https://localhost:443/verify_your_email/${token}`,
      { emailVerificationToken: token }
    );

    if (response.data.status === "EmailAlreadyVerified") {
      alert("Email is already verified");
      window.location.href = "/login";
    } else if (response.data.status === "TokenExpired") {
      alert("Token has expired");
      setGetNewToken(true);
    } else if (response.data.status === "InvalidToken") {
      alert("Invalid token");
      setGetNewToken(true);
    } else if (response.data.status === "EmailVerified") {
      setEmailVerified(true);
    }
  };

  const handleGetNewToken = async (event) => {
    event.preventDefault();

    const response = await axios.post(
      "https://localhost:443/get_new_email_verification_token",
      { oldEmailVerificationToken: token }
    );

    if (response.data.status === "EmailAlreadyVerified") {
      alert("Email is already verified");
      window.location.href = "/login";
    } else if (response.data.status === "EmailSent") {
      //TODO
    } else if (response.data.status === "ErrorSendingEmail") {
      alert("Error sending email");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="top"
      alignItems="center"
      height="100vh"
      padding-top="2rem"
    >
      <Typography
        variant="h4"
        sx={{ color: theme?.text, paddingBottom: "1rem", paddingTop: "3rem" }}
      >
        Verify Email Page
      </Typography>
      {getNewToken ? (
        <Box>
          <Typography
            variant="h5"
            sx={{
              color: theme?.text,
              paddingBottom: "1rem",
              paddingTop: "3rem",
            }}
          >
            Token has expired
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleGetNewToken}
          >
            Get a new token
          </Button>
        </Box>
      ) : emailVerified ? (
        <Box>
          <Button
            variant="contained"
            style={{ backgroundColor: green[500] }}
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            <CheckIcon />
          </Button>
        </Box>
      ) : (
        <Button variant="contained" color="primary" onClick={handleVerifyEmail}>
          Verify Email
        </Button>
      )}
    </Box>
  );
}

export default withTheme(VerifyEmail);
