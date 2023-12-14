import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";

import { withTheme } from "styled-components";
import { darken } from "polished";

import axios from "axios";

function Home({ theme }) {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userImage, setUserImage] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Check if there are products in the database and set theme
  useEffect(() => {
    axios.get("http://localhost:3001/displayProducts").then((response) => {
      setProducts(response.data);
    });
    console.log("Success");
  }, []);

  // Use the function to check if the user is logged in (1 at the start then every 10 min)
  useEffect(() => {
    // Call immediately on component mount
    checkLoginStatus();

    // Call every 600000 milliseconds to check if the user is logged in
    const intervalId = setInterval(checkLoginStatus, 600000); // 600000 milliseconds = 10 minutes

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Check if the user is logged in or not (session cookie)
  const checkLoginStatus = () => {
    axios
      .get("http://localhost:3001/checkLoginStatus", { withCredentials: true })
      .then((response) => {
        if (response.data.isLoggedIn) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      });
  };

  // Logic to shoe/hide the drawer
  const handleShowHideDrawer = () => {
    setOpen(!open);
  };

  // Logic to handle the click on the account icon (navigate to the account page/ login page)
  const handleAccountClick = () => {
    if (isLoggedIn) {
      navigate("/account");
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <div style={{ padding: 30, paddingLeft: 300 }}>
        <main sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {/* Map through your products and display them */}
          <Grid container spacing={0.5} sx={{ marginTop: "64px" }}>
            {/* Adjust the spacing here */}
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card sx={{ maxWidth: 300, paddingLeft: "8px" }}>
                  {/* Adjust the maxWidth here */}
                  <CardMedia
                    component="img"
                    image={`data:image/jpeg;base64,${product.image}`} // Convert the image from base64 to a data url
                    alt={product.name}
                    sx={{
                      width: "100%",
                      maxHeight: "200px",
                      objectFit: "contain",
                    }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.price}
                    </Typography>
                  </CardContent>
                  <Button size="small">Add to Cart</Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </main>
      </div>
      <div sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar sx={{ bgcolor: darken(0.08, theme?.bgcolor) }}>
            {/* Icon Button for show/hide Drawer */}
            <IconButton color="inherit" onClick={handleShowHideDrawer}>
              <ViewHeadlineIcon />
            </IconButton>

            <Box sx={{ flexGrow: 1 }} />

            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              JewelsLand
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            {/* Icon Button for account managment */}
            <IconButton color="inherit" onClick={handleAccountClick}>
              {isLoggedIn ? <Avatar src={userImage} /> : <AccountCircle />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          open={open}
          variant="temporary"
          sx={{
            width: "240px",
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: "240px",
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <div sx={{ overflow: "auto" }}>
            <List>
              {["Section 1", "Section 2", "Section 3"].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
        <main sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {/* Here you can map through your products and display them */}
        </main>
      </div>
    </div>
  );
}

export default withTheme(Home);
