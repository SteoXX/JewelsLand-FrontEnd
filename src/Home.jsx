import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

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
import { Typography } from "@mui/material";

import { withTheme } from "styled-components";
import { darken } from "polished";

import axios from "axios";

function Home({ theme }) {
  const [open, setOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [userImage, setUserImage] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Check if there are products in the database and set theme
  useEffect(() => {
    axios.get("https://localhost:443/displayProducts").then((response) => {
      setProducts(response.data);
    });
    console.log("Success");
  }, []);

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
      <Toolbar />
      {/* Map through your products and display them */}
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
        {/* Adjust the spacing here */}
        {products.map((product) => (
          <Card sx={{ width: "300px" }}>
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
                {product.price + "$"}
              </Typography>
            </CardContent>
            <Button size="small">Add to Cart</Button>
          </Card>
        ))}
      </Box>

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
