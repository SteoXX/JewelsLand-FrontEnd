import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { withTheme } from "styled-components";
import { useNavigate } from "react-router-dom";

const Cart = ({ theme }) => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `https://${process.env.REACT_APP_ORIGIN}:443/getCartItems`,
          {
            withCredentials: true,
          }
        );
        setCartItems(response.data.items);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveFromCart = async (item) => {
    try {
      const response = await axios.post(
        `https://${process.env.REACT_APP_ORIGIN}:443/removeFromCart`,
        { itemId: item._id },
        { withCredentials: true }
      );

      if (response.data.status === "ItemRemoved") {
        setCartItems(cartItems.filter((cartItem) => cartItem._id !== item._id));
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  const handleIncreaseQuantity = async (item) => {
    // Increase the quantity of the item in the cart
    item.quantity += 1;

    // Save the updated item
    saveItem(item);
  };

  const handleDecreaseQuantity = async (item) => {
    // Decrease the quantity of the item in the cart if it's more than 1
    if (item.quantity > 1) {
      item.quantity -= 1;
    }

    // Save the updated item
    saveItem(item);
  };

  const saveItem = async (item) => {
    try {
      // Send a request to backend to update the quantity of the item in the cart
      const response = await axios.post(
        `https://${process.env.REACT_APP_ORIGIN}:443/updateCartItem`,
        { itemId: item._id, quantity: item.quantity },
        { withCredentials: true }
      );

      if (response.data.status === "ItemUpdated") {
        item.quantity = response.data.itemQuantity;
        setCartItems((prevItems) =>
          prevItems.map((cartItem) =>
            cartItem._id === item._id
              ? { ...cartItem, quantity: item.quantity }
              : cartItem
          )
        );
        console.log(item.quantity);
      } else if (response.data.status === "ItemNotFound") {
        alert("Item Not Found");
      }
    } catch (error) {
      console.error("Failed to update cart item:", error);
    }
  };

  // Calculate the total value of all products in the cart
  const totalValue = cartItems.reduce(
    (total, item) => total + item.productId.price * item.quantity,
    0
  );

  return (
    <div>
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
              image={`data:image/jpeg;base64,${item.productId.image}`}
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{ fontSize: "0.7rem", minWidth: "30px" }}
                  onClick={() => handleDecreaseQuantity(item)}
                >
                  -
                </Button>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{ margin: "0 10px" }}
                >
                  {item.quantity || 1}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{ fontSize: "0.7rem", minWidth: "30px" }}
                  onClick={() => handleIncreaseQuantity(item)}
                >
                  +
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </Box>
      <h2
        style={{ textAlign: "center", marginTop: "20px", color: theme?.text }}
      >
        Total Value: {totalValue.toFixed(2)}$
      </h2>
    </div>
  );
};

export default withTheme(Cart);
