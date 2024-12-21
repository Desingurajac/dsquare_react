import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import { Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextareaAutosize, TextField, Typography } from '@mui/material';
import './AddNewProducts.css';
// import { Button } from 'react-bootstrap';

const AddNewProducts = () => {

  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    price: "",
    description: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Details Submitted:", formData);
  };

  return (
    <Grid container spacing={2}>
      {/* Title */}
      <Grid item xs={12}>
        <Typography>
          Add New Product
        </Typography>
      </Grid>

      {/* Brand List */}
      <Grid item xs={4} md={4}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Brand Name</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Brand Name"
            onChange={handleChange}
            required
          >
            <MenuItem value={1}>Nike</MenuItem>
            <MenuItem value={2}>One Plus</MenuItem>
            <MenuItem value={3}>Apple</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Product Name */}
      <Grid item xs={4}>
        <TextField className='textfeild'
          fullWidth
          label="Product Name"
          variant="outlined"
          required
        />
      </Grid>

      {/* Main Category */}
      <Grid item xs={4} md={4}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Main Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Main Category"
            onChange={handleChange}
            required
          >
            <MenuItem value={1}>MC1</MenuItem>
            <MenuItem value={2}>MC2</MenuItem>
            <MenuItem value={3}>MC3</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Sub Category1 */}
      <Grid item xs={4} md={4}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sub Category1</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Sub Category1"
            onChange={handleChange}
            required
          >
            <MenuItem value={1}>SC11</MenuItem>
            <MenuItem value={2}>SC12</MenuItem>
            <MenuItem value={3}>SC13</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Sub Category2 */}
      <Grid item xs={4} md={4}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sub Category2</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Sub Category2"
            onChange={handleChange}
            required
          >
            <MenuItem value={1}>SC21</MenuItem>
            <MenuItem value={2}>SC22</MenuItem>
            <MenuItem value={3}>SC23</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Sub Category3 */}
      <Grid item xs={4} md={4}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sub Category3</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Sub Category3"
            onChange={handleChange}
            required
          >
            <MenuItem value={1}>SC31</MenuItem>
            <MenuItem value={2}>SC32</MenuItem>
            <MenuItem value={3}>SC33</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Sub Category4 */}
      <Grid item xs={4} md={4}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sub Category4</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Sub Category4"
            onChange={handleChange}
          >
            <MenuItem value={1}>SC41</MenuItem>
            <MenuItem value={2}>SC42</MenuItem>
            <MenuItem value={3}>SC43</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Sub Category5 */}
      <Grid item xs={4} md={4}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sub Category5</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Sub Category5"
            onChange={handleChange}
          >
            <MenuItem value={1}>SC51</MenuItem>
            <MenuItem value={2}>SC52</MenuItem>
            <MenuItem value={3}>SC53</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={2}>
        <TextField className='textfeild'
          fullWidth
          label="Price"
          type='number'
          variant="outlined"
          required
        />
      </Grid>

      <Grid item xs={2}>
        <TextField className='textfeild'
          fullWidth
          label="Discount %"
          type='number'
          variant="outlined"
        />
      </Grid>

      <Grid item xs={2}>
        <TextField className='textfeild'
          fullWidth
          label="Stoct Qty"
          type='number'
          variant="outlined"
          required
        />
      </Grid>

      <Grid item xs={2}>
        <TextField className='textfeild'
          fullWidth
          label="Min Stock Qty"
          type='number'
          variant="outlined"
          required
        />
      </Grid>

      <Grid item xs={2}>
        <TextField className='textfeild'
          fullWidth
          label="Max Stock Qty"
          type='number'
          variant="outlined"
          required
        />
      </Grid>

      {/* Size */}
      <Grid item xs={2}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Size</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Size"
            onChange={handleChange}
            required
          >
            <MenuItem value={1}>XS</MenuItem>
            <MenuItem value={2}>S</MenuItem>
            <MenuItem value={3}>M</MenuItem>
            <MenuItem value={4}>L</MenuItem>
            <MenuItem value={5}>XL</MenuItem>
            <MenuItem value={6}>XXL</MenuItem>
            <MenuItem value={7}>XXXL</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Colour */}
      <Grid item xs={2}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Color</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Color"
            onChange={handleChange}
            required
          >
            <MenuItem value={1}>Black`</MenuItem>
            <MenuItem value={2}>Red</MenuItem>
            <MenuItem value={3}>Blue</MenuItem>
            <MenuItem value={4}>Pink</MenuItem>
            <MenuItem value={5}>White</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={2}>
        <TextField className='textfeild'
          fullWidth
          label="Weight"
          variant="outlined"

        />
      </Grid>

      <Grid item xs={2}>
        <TextField className='textfeild'
          fullWidth
          label="Shipping Cost"
          type='number'
          variant="outlined"

        />
      </Grid>

      {/* Distributor Loist */}
      <Grid item xs={4} md={4}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Distributo Name</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Distributor Name"
            onChange={handleChange}
            required
          >
            <MenuItem value={1}>SS Products</MenuItem>
            <MenuItem value={2}>MM Products</MenuItem>
            <MenuItem value={3}>RR Products</MenuItem>
            <MenuItem value={4}>A1 Products</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={2}>
         <FormControlLabel label="isActive" control={<Switch defaultChecked />} labelPlacement="start" />
      </Grid>

      <Grid item xs={4}>
      <TextareaAutosize aria-label="minimum height" placeholder='Enter the product description' />
      
      </Grid>
      <Grid item xs={12} className='rightAlign'>
      <Button variant="contained">Submit</Button>
      </Grid>
    </Grid>




  )
}

export default AddNewProducts