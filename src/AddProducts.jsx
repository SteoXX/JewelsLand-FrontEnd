import React, { useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";

function UploadForm() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const productData = new FormData();
    productData.append("image", file);
    productData.append("name", name);
    productData.append("description", description);
    productData.append("price", price);
    productData.append("stock", stock);
    productData.append("category", category);

    axios
      .post("https://localhost:443/add_products", productData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error uploading file: ", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <TextField
        label="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />
      <TextField
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input type="file" onChange={handleFileChange} />
      <Button variant="contained" type="submit">
        Upload
      </Button>
    </form>
  );
}

export default UploadForm;
