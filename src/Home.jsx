import React, { useState } from "react";
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

import { withTheme } from "styled-components";
import { darken } from "polished";
import { Typography } from "@mui/material";

function Home({ theme }) {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userImage, setUserImage] = useState("");

  const handleShowHideDrawer = () => {
    setOpen(!open);
  };

  return (
    <div>
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
              JewishLand
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            {/* Icon Button for account managment */}
            <IconButton color="inherit">
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
