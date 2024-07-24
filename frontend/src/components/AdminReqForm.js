import React, { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { TextField, Button, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function AdminReqForm() {
  const { user } = useAuthContext();
  const { dispatch } = useWorkoutsContext();

  const [title, setTitle] = useState('');
  const [features, setFeatures] = useState('');
  const [category, setCategory] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null); // New state for image
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('features', features);
    formData.append('category', category);
    formData.append('desc', desc);
    formData.append('price', price);
    formData.append('image', image); // Append image to form data

    const response = await fetch('http://localhost:4000/api/workouts', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });

    const json = await response.json();
    if (response.ok) {
      setTitle('');
      setFeatures('');
      setCategory('');
      setDesc('');
      setPrice('');
      setImage(null); // Reset image state
      setError(null);
      console.log('New product added', json);
      dispatch({ type: 'CREATE_WORKOUT', payload: json });
    } else {
      setError(json.error || 'Failed to add book');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        mx: 'auto',
        p: 2,
        borderRadius: 2,
        boxShadow: 3
      }}
    >
      <Typography variant="h6" gutterBottom>
        ADD NEW PRODUCT
      </Typography>
      <TextField
        required
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        variant="outlined"
        fullWidth
      />
      <TextField
        required
        label="Product Features"
        value={features}
        onChange={(e) => setFeatures(e.target.value)}
        variant="outlined"
        fullWidth
      />
      <FormControl required fullWidth>
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          label="Category"
        >
          <MenuItem value="Electronics">Electronics</MenuItem>
          <MenuItem value="Clothing">Clothing</MenuItem>
          <MenuItem value="Beauty">Beauty</MenuItem>
          <MenuItem value="Furniture">Furniture</MenuItem>
          <MenuItem value="Utensils">Utensils</MenuItem>
        </Select>
      </FormControl>
      <TextField
        required
        label="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        variant="outlined"
        fullWidth
      />
      <TextField
        required
        label="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        variant="outlined"
        fullWidth
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])} // Update image state on file change
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
      >
        ADD PRODUCT
      </Button>
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
    </Box>
  );
}

export default AdminReqForm;


