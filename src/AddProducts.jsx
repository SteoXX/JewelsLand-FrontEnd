import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { withTheme } from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";

function UploadForm({ theme }) {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const { admin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!admin) {
      alert("You don't have permission to upload");
    } else {
      const productData = new FormData();
      productData.append("image", file);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("stock", stock);
      productData.append("category", category);

      axios
        .post(
          `https://${process.env.REACT_APP_ORIGIN}:443/add_products`,
          productData,
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error uploading file: ", error);
        });
    }
  };

  return (
    <div>
      {/* Title */}
      <h1 style={{ textAlign: "center", color: theme?.text }}>
        INSERT YOUR PRODUCT
      </h1>

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
        ← Account page
      </p>
      <form
        onSubmit={handleSubmit}
        style={{ marginTop: "50px", display: "flex", justifyContent: "center" }}
      >
        <Box
          component="span"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxWidth: "300px", // Limit the width of the TextField components
          }}
        >
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            InputProps={{
              style: { borderRadius: "12px", color: theme?.text },
            }}
            sx={{
              "& .MuiInputLabel-root": {
                color: theme?.text,
              },
            }}
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            InputProps={{
              style: { borderRadius: "12px", color: theme?.text },
            }}
            sx={{
              "& .MuiInputLabel-root": {
                color: theme?.text,
              },
            }}
          />
          <TextField
            label="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            InputProps={{
              style: { borderRadius: "12px", color: theme?.text },
            }}
            sx={{
              "& .MuiInputLabel-root": {
                color: theme?.text,
              },
            }}
          />
          <TextField
            label="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            fullWidth
            InputProps={{
              style: { borderRadius: "12px", color: theme?.text },
            }}
            sx={{
              "& .MuiInputLabel-root": {
                color: theme?.text,
              },
            }}
          />
          <TextField
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
            InputProps={{
              style: { borderRadius: "12px", color: theme?.text },
            }}
            sx={{
              "& .MuiInputLabel-root": {
                color: theme?.text,
              },
            }}
          />
          <Box
            component="label"
            htmlFor="file-upload"
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              mt: 1,
              color: theme?.bgcolor,
              backgroundColor: "#f0f0f0",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              style={{
                display: "none",
                color: theme?.text,
                backgroundColor: theme?.bgcolor,
              }}
            />
            Select file
          </Box>
          <Button
            variant="contained"
            type="submit"
            sx={{ mt: 2, width: "100px", alignSelf: "center" }}
          >
            Upload
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default withTheme(UploadForm);
