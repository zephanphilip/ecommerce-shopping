import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6d4c41', // Brown
    },
    secondary: {
      main: '#ffeb3b', // Yellow
    },
    background: {
      default: '#f5f5f5', // Light grey
      paper: '#ffffff', // White
    },
  },
  typography: {
    h4: {
      fontWeight: 700,
      color: '#6d4c41', // Brown
    },
    body1: {
      fontSize: '1rem',
      color: '#424242', // Dark grey
    },
    body2: {
      fontSize: '0.875rem',
      color: '#757575', // Medium grey
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '20px',
          margin: '10px 0',
          borderRadius: '10px',
          backgroundColor: '#ffffff', // White
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textTransform: 'none',
        },
      },
    },
  },
});

const Profile = () => {
  const { user } = useAuthContext();
  const [userr, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', place: '', age: '', phone: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/user/me', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch user data');
        const data = await response.json();
        setUser(data);
        setFormData({ name: data.name, place: data.place, age: data.age, phone: data.phone });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user.token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/user/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to update user data');
      const updatedUser = await response.json();
      setUser(updatedUser);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Button variant="outlined" color="primary" onClick={() => navigate('/')}>
            Go To Home
          </Button>
        </Box>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: '600px', margin: 'auto' }}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Your Shipping Address"
            name="place"
            value={formData.place}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
          />
          
          <Button type="submit" variant="contained" color="primary">
            Update Profile
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Profile;

