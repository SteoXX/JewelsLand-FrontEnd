import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

import { Avatar, IconButton, TextField, Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { withTheme } from "styled-components";

const AccountPage = ({ theme }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [originalUsername, setOriginalUsername] = useState("");
  const inputRef = useRef();
  const { setIsLoggedIn, admin } = useContext(AuthContext);
  const navigate = useNavigate();

  // When the page is rendered, take the username from the db and set it
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get(
          "https://localhost:443/showUserAccountInfo",
          { withCredentials: true }
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
      const response = await axios.post(
        "https://localhost:443/updateUserAccountInfo",
        { newUsername: username },
        { withCredentials: true }
      );

      if (response.data.status === "UserNotFound") {
        alert(response.data.message);
        return;
      } else if (response.data.status === "UsernameAlredyTaken") {
        alert(response.data.message);
        return;
      }
    } catch (error) {
      console.error("Failed to save username:", error);
    }
    setOriginalUsername(username);
    setIsEditing(false);
  };

  // Handle the logout button
  const handleLogoutClick = async () => {
    try {
      const response = await axios.post(
        "https://localhost:443/logout",
        {},
        { withCredentials: true }
      );

      if (response.data.status === "LogoutFailed") {
        alert(response.data.message);
        return;
      } else {
        setIsLoggedIn(false);
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  // Handle the cart button
  const handleCartClick = () => {
    navigate("/account/cart");
  };

  const handleAddProductsClick = () => {
    navigate("/add_products");
  };

  // VISUALIZE THE PAGE
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* Pointer to go back to the account page */}
      <p
        style={{
          cursor: "pointer",
          marginLeft: "20px",
          marginTop: "25px",
          fontSize: "20px",
          position: "absolute",
          top: "0",
          left: "0",
          color: theme?.text,
        }}
        onClick={() => navigate("/")}
      >
        ← Home page
      </p>
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

      {/* Save button */}
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

      {admin && (
        <Button
          variant="contained"
          style={{ backgroundColor: "yellow", marginTop: "20px" }}
          onClick={handleAddProductsClick}
        >
          Add new products
        </Button>
      )}

      {/* Cart button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleCartClick}
        startIcon={<ShoppingCartIcon />}
        style={{ marginTop: "20px" }}
      >
        Cart
      </Button>

      {/* Logout button */}
      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogoutClick}
        style={{ marginTop: "20px" }}
      >
        Logout
      </Button>
    </div>
  );
};

export default withTheme(AccountPage);
