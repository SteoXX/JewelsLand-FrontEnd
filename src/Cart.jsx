import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { withTheme } from "styled-components";
import { useNavigate } from "react-router-dom";

const Cart = ({ theme }) => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // On the first render it send a request to the databse to get the cart items of the user
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("https://localhost:443/getCartItems", {
          withCredentials: true,
        });
        setCartItems(response.data.items);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  // Handle the remove button to cancel the item from the user's cart
  const handleRemoveFromCart = async (item) => {
    try {
      const response = await axios.post(
        "https://localhost:443/removeFromCart",
        { itemId: item._id },
        { withCredentials: true }
      );

      if (response.data.status === "ItemRemoved") {
        // Remove the item from the local cart items state
        setCartItems(cartItems.filter((cartItem) => cartItem._id !== item._id));
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  return (
    <div>
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
        onClick={() => navigate("/account")}
      >
        ← Account
      </p>

      <h1
        style={{ textAlign: "center", marginTop: "20px", color: theme?.text }}
      >
        Your Cart
      </h1>

      {/* Box with all the cards fro show the items */}
      <Box
        sx={{
          marginTop: "64px",
          width: "100%",
          rowGap: "2rem",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "stretch",
          columnGap: "2rem",
        }}
      >
        {/* Go over all the items in the list */}
        {cartItems.map((item, index) => (
          <Card sx={{ width: "300px", position: "relative" }} key={index}>
            <IconButton
              sx={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                color: "red",
              }}
              onClick={() => handleRemoveFromCart(item)}
            >
              <DeleteIcon />
            </IconButton>
            <CardMedia
              component="img"
              image={`data:image/jpeg;base64,${item.productId.image}`} // Convert the image from base64 to a data url
              alt={item.productId.name}
              sx={{
                width: "100%",
                maxHeight: "200px",
                objectFit: "contain",
              }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.productId.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.productId.price + "$"}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </div>
  );
};

export default withTheme(Cart);
