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
  const [newToken, setNewToken] = React.useState(false);

  const handleVerifyEmail = async (event) => {
    event.preventDefault();

    const response = await axios.post(
      `http://localhost:3001/verify_your_email/${token}`,
      { emailVerificationToken: token, newToken: newToken }
    );

    if (!newToken) {
      if (response.data.status === "EmailAlreadyVerified") {
        alert("Email is already verified");
        window.location.href = "/login";
      } else if (response.data.status === "TokenExpired") {
        alert("Token has expired");
        setNewToken(true);
      } else if (response.data.status === "InvalidToken") {
        alert("Invalid token");
        setNewToken(true);
      } else if (response.data.status === "EmailVerified") {
        setEmailVerified(true);
      }
    } else {
      //TODO
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
      {newToken ? (
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
            onClick={handleVerifyEmail}
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