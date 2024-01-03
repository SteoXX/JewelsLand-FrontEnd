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
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";

import { withTheme } from "styled-components";
import { darken } from "polished";

import axios from "axios";

function Home({ theme }) {
  const [open, setOpen] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const [userImage] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchContent, setSearchContent] = useState("");
  const [triggerSearch, setTriggerSearch] = useState(false);
  const navigate = useNavigate();

  // Check if there are products in the database and set theme
  useEffect(() => {
    // Create an Axios instance
    const axiosInstance = axios.create({
      baseURL: "https://localhost:443",
    });

    // Add a response interceptor
    axiosInstance.interceptors.response.use(
      (response) => {
        // Any status code that lies within the range of 2xx causes this function to trigger
        // Do something with the response data
        return response;
      },
      (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with the response error
        console.log("An error occurred:", error);
        return Promise.reject(error);
      }
    );

    // Use the Axios instance to make the request
    axiosInstance
      .get("/displayProducts", {
        params: {
          category: selectedCategory,
        },
      })
      .then((response) => {
        setProducts(response.data);
      });
  });

  // Render the products that match the searched info
  useEffect(() => {
    if (searchContent) {
      // Only run if searchContent is not empty
      axios
        .get(`https://localhost:443/displayProducts`, {
          params: {
            searchContent: searchContent,
          },
        })
        .then((response) => {
          setProducts(response.data);
        });
    }
  }, [triggerSearch, searchContent]); // Only run when triggerSearch changes

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

  // Logic to add the item to the user cart
  const handleAddToCart = async (product) => {
    if (isLoggedIn) {
      try {
        // Get the current quantity of the product in the cart
        const currentProduct = products.find(
          (prod) => prod._id === product._id
        );
        const currentQuantity = currentProduct?.quantity;

        const response = await axios.post(
          "https://localhost:443/addToCart",
          { productId: product._id, quantity: currentQuantity },
          { withCredentials: true }
        );

        if (response.data.status === "ProductAdded") {
          console.log(product._id);
          alert("Product added to cart successfully!");
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error("Failed to add product to cart:", error);
      }
    } else {
      alert("You must login before adding to cart");
    }
  };

  // Increse the quantity of the product
  const handleIncreaseQuantity = (product) => {
    // Get the current quantity of the product in the cart
    const currentProduct = products.find((prod) => prod._id === product._id);
    const currentQuantity = currentProduct?.quantity || 0;

    // Increase the quantity of the product in the local products state
    setProducts(
      products.map((prod) =>
        prod._id === product._id
          ? { ...prod, quantity: currentQuantity + 1 }
          : prod
      )
    );
  };

  // Decrese the quantity of the product
  const handleDecreaseQuantity = (product) => {
    // Get the current quantity of the product in the cart
    const currentProduct = products.find((prod) => prod._id === product._id);
    const currentQuantity = currentProduct?.quantity || 0;

    if (currentQuantity > 0) {
      // Decrease the quantity of the product in the local products state
      setProducts(
        products.map((prod) =>
          prod._id === product._id
            ? { ...prod, quantity: currentQuantity - 1 }
            : prod
        )
      );
    }
  };

  // Handle the click on the navbar
  const handleListItemClick = (category) => {
    setSearchContent(""); // Reset the search content
    setSelectedCategory(category); // Select the category
    setOpen(false); // Close the drawer
  };

  // Handle the search for products
  const handleSearch = () => {
    setSelectedCategory(""); // Reset the selected category
    setTriggerSearch((prev) => !prev);
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start", // Align everything to the left
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="small" // Make the button smaller
                  style={{ fontSize: "0.7rem", minWidth: "30px" }} // Adjust the font size and the minimum width to make the button smaller
                  onClick={() => {
                    if (product.quantity > 1) {
                      // Prevent the quantity from going below 1
                      handleDecreaseQuantity(product);
                    }
                  }}
                >
                  -
                </Button>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{ margin: "0 10px" }}
                >
                  {product.quantity || 1}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="small" // Make the button smaller
                  style={{ fontSize: "0.7rem", minWidth: "30px" }} // Adjust the font size and the minimum width to make the button smaller
                  onClick={() => handleIncreaseQuantity(product)}
                >
                  +
                </Button>
              </div>
            </CardContent>
            <Button size="small" onClick={() => handleAddToCart(product)}>
              Add to Cart
            </Button>
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

            <TextField
              placeholder="Search..."
              onChange={(event) => setSearchContent(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault(); // Prevent the form from being submitted
                  handleSearch();
                }
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: theme?.text,
                  },
                  "&:hover fieldset": {
                    borderColor: theme?.text,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme?.text,
                  },
                  "& .css-1x5jdmq": {
                    color: theme?.text,
                  },
                },
              }}
            />

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

        {/* Navbar with categories */}
        <Drawer
          open={open}
          variant="temporary"
          onClose={() => setOpen(false)} // Close the drawer when you click outside of it
          ModalProps={{ keepMounted: true, disableScrollLock: true }} // Disable scroll to the left side when the drawer is opened
          sx={{
            width: "240px",
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: "240px",
              boxSizing: "border-box",
              backgroundColor: darken(0.08, theme?.bgcolor),
            },
          }}
        >
          <Toolbar />
          <div sx={{ overflow: "auto" }}>
            <List>
              {["Rings", "Necklaces", "Earrings"].map((text, index) => (
                <ListItem
                  button
                  key={text}
                  onClick={() => handleListItemClick(text)}
                >
                  <ListItemText primary={text} sx={{ color: theme?.text }} />
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
