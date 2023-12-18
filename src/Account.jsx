import React, { useState, useEffect, useRef } from "react";
import { Avatar, IconButton, TextField, Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

import { withTheme } from "styled-components";

const AccountPage = ({ theme }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [originalUsername, setOriginalUsername] = useState("");
  const inputRef = useRef();

  // When the page is rendered, take the username from the db and set it
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get(
          "https://localhost:443/showUserAccountInfo"
        );
        setUsername(response.data.username);
        setOriginalUsername(response.data.username);
      } catch (error) {
        console.error("Failed to fetch username:", error);
      }
    };

    fetchUsername();
  }, []);

  // Set the state isEditing to true if the user click on the edit icon
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // If the user has finished editing make the box disappears
  const handleBlur = (event) => {
    if (inputRef.current.contains(event.relatedTarget)) {
      return;
    }
    setIsEditing(false);
  };

  // Check if the username changed
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // Handle the save button
  const handleSaveClick = async () => {
    try {
      await axios.post("YOUR_BACKEND_URL", { username });
      setOriginalUsername(username);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save username:", error);
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Avatar style={{ margin: "20px", width: "100px", height: "100px" }} />
      <Box display="flex" alignItems="center">
        {isEditing ? (
          <TextField
            value={username}
            onChange={handleUsernameChange}
            onBlur={handleBlur}
            inputRef={inputRef}
          />
        ) : (
          <h2 style={{ color: theme?.text, textAlign: "center" }}>
            {username}
          </h2>
        )}
        <IconButton onClick={handleEditClick} style={{ marginLeft: "10px" }}>
          <EditIcon />
        </IconButton>
      </Box>
      {username !== originalUsername && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveClick}
          style={{ marginTop: "20px" }}
        >
          Save
        </Button>
      )}
    </div>
  );
};

export default withTheme(AccountPage);
