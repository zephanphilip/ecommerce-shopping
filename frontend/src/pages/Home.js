

import React, { useState, useEffect } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import WorkoutDetails from '../components/WorkoutDetails';
import CategoryNavbar from '../components/CategoryNavbar'; // Import the new component
import SearchBar from '../components/SearchBar'; // Import the new component
import { Button, Container, Typography, Box, Grid } from '@mui/material';
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
  },
});

function Home() {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('http://localhost:4000/api/workouts', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json });
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  const filteredWorkouts = (workouts || [])
    .filter((bdetail) =>
      selectedCategory === 'All' || bdetail.category === selectedCategory)
    .filter((bdetail) =>
      bdetail.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <ThemeProvider theme={theme}>
      <Container>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <CategoryNavbar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        
        <Grid container spacing={4} mt={3}>
          
          {filteredWorkouts.map((bdetail) => (
            <Grid item xs={12} sm={6} md={4} key={bdetail._id}>
              <Box height="100%" display="flex" flexDirection="column">
                <WorkoutDetails bdetail={bdetail} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default Home;
