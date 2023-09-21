"use client";
import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import axios from "axios";
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
  const [isDragging, setIsDragging] = useState(false); // Track whether files are being dragged
  const [selectedImageDescription, setSelectedImageDescription] =
    useState(null);
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);
  const apiBaseUrl = process.env.API_KEY;
  const endpoint = "v1/files";
  const apiUrl = `${apiBaseUrl}${endpoint}`;
  console.log(apiUrl);

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

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    const selectedImages = [];

    for (let i = 0; i < files.length; i++) {
      selectedImages.push(files[i]);
    }

    setProductImages(selectedImages);
  };

  const handleImageClick = () => {
    // Trigger the hidden file input when the text or icon is clicked
    document.getElementById("product-image").click();
  };

  const handleImageInputChange = (e) => {
    const files = e.target.files;
    const selectedImages = [];

    for (let i = 0; i < files.length; i++) {
      selectedImages.push(files[i]);
    }

    setProductImages(selectedImages);
  };

  const handleImageDescriptionDrop = (e) => {
    e.preventDefault();
    setSelectedImageDescription(null);

    const files = e.dataTransfer.files;

    if (files.length === 1) {
      setSelectedImageDescription(files[0]);
    } else {
      alert("Please select only one image.");
    }
  };

  const handleImageDescriptionClick = () => {
    // Trigger the hidden file input when the label is clicked
    document.getElementById("single-image-description-input").click();
  };

  const handleImageDescriptionInputChange = (e) => {
    const files = e.target.files;

    if (files.length === 1) {
      setSelectedImageDescription(files[0]);
    } else {
      alert("Please select only one image.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to append the product data
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productDescription", productDescription);
    formData.append("productPrice", productPrice);
    formData.append("category", category);

    // Append each selected image to the FormData
    for (let i = 0; i < productImages.length; i++) {
      formData.append("productImages", productImages[i]);
    }

    try {
      // Send a POST request to the API with the FormData
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data for file uploads
        },
      });

      // Check the response and handle success or error
      if (response.status === 200) {
        // Handle success, e.g., show a success message
        console.log("Success");
        setSuccessMessageOpen(true);
      } else {
        // Handle error, e.g., show an error message
        console.error("Upload failed");
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Error:", error);
    }
  };

  const handleCloseSuccessMessage = () => {
    setSuccessMessageOpen(false);
  };

  return (
    <Container component="main" maxWidth="xl">
      <Paper
        elevation={3}
        style={{
          padding: "20px",
          border: isDragging ? "2px dashed #ccc" : "2px solid transparent",
        }}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
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
            <Grid item xs={10}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  {/* Display selected image names with a border */}
                  {productImages.length > 0 ? (
                    <div>
                      {productImages.map((image, index) => (
                        <div
                          key={index}
                          style={{
                            border: "1px solid #ccc",
                            padding: "5px",
                            marginBottom: "5px",
                          }}
                        >
                          {image.name}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      htmlFor="product-image"
                      style={{
                        border: "2px dashed #ccc",
                        padding: "10px",
                        textAlign: "center",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        height: "119px",
                      }}
                      onClick={handleImageClick}
                    >
                      <CloudUploadIcon style={{ fontSize: "40px" }} />
                      <Typography>
                        Drag & Drop or Click to Upload Product Image
                      </Typography>
                    </div>
                  )}
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="product-image"
                    type="file"
                    multiple // Allow multiple file selection
                    onChange={handleImageInputChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "center",
                      border: "2px dashed #ccc",
                      padding: "10px",
                      textAlign: "center",
                      cursor: "pointer",
                      // Set the desired height here
                    }}
                    onDragEnter={handleImageDescriptionClick}
                    onDragOver={handleImageDescriptionDrop}
                    onDragLeave={handleDragLeave}
                    onDrop={handleImageDescriptionDrop}
                    onClick={handleImageDescriptionClick}
                  >
                    <div>
                      <CloudUploadIcon style={{ fontSize: "40px" }} />
                      <Typography>
                        {selectedImageDescription
                          ? selectedImageDescription.name
                          : "Drag & Drop or Click to Upload Product Image Description"}
                      </Typography>
                    </div>
                    <div>{/* You can add additional content here */}</div>
                  </div>
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="single-image-description-input"
                    type="file"
                    onChange={handleImageDescriptionInputChange}
                  />
                </Grid>
              </Grid>
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
