"use client";
import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";

import {
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function UploadProductForm() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [category, setCategory] = useState("");

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const categories = [
    {
      value: "Superfood",
      label: "Superfood",
    },
    {
      value: "Freshfood",
      label: "Freshfood",
    },
    {
      value: "Dowith",
      label: "Dowith",
    },
    {
      value: "Troubless",
      label: "Troubless",
    },
  ];

  const handleProductImageChange = (e) => {
    const files = e.target.files;
    const selectedImages = [];

    for (let i = 0; i < files.length; i++) {
      selectedImages.push(files[i]);
    }

    setProductImages(selectedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log the values to the console
    console.log("Product Name:", productName);
    console.log("Product Description:", productDescription);
    console.log("Product Price:", productPrice);
    console.log("Category:", category);
    console.log("Selected Image Names:");
    for (let i = 0; i < productImages.length; i++) {
      console.log(productImages[i].name);
    }

    // Here you can handle the form submission, including uploading the product to a server or processing it as needed.
    // You can use FormData to send the file to your server.

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productDescription", productDescription);
    formData.append("productPrice", productPrice);
    formData.append("category", category);

    // Append all selected images to FormData
    for (let i = 0; i < productImages.length; i++) {
      formData.append("productImages[]", productImages[i]);
    }

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Handle success, e.g., show a success message
      } else {
        // Handle error, e.g., show an error message
      }
    } catch (error) {
      // Handle any network or other errors
    }
  };

  return (
    <Container component="main" maxWidth="xl">
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Upload a New Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Product Name"
                fullWidth
                variant="outlined"
                required
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Price"
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                variant="outlined"
                required
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Category"
                select
                variant="outlined"
                onChange={handleCategoryChange}
                value={category}
                sx={{ minWidth: "100%" }}
              >
                {categories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Product Description"
                fullWidth
                variant="outlined"
                multiline
                rows={4}
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="product-image"
                type="file"
                multiple // Allow multiple file selection
                onChange={handleProductImageChange}
              />
              <label htmlFor="product-image">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Product Image
                </Button>
              </label>
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{
              width: "200px",
              margin: "0 auto",
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Upload Product
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default UploadProductForm;
