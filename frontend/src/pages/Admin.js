
import React, { useEffect, useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import AdminReqForm from '../components/AdminReqForm';
import AdminBbDetails from '../components/AdminBbDetails';
import AdminUserDetails from '../components/AdminUserDetails';
import { Container, Grid, Typography, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8e44ad', // Deep purple
    },
    secondary: {
      main: '#3498db', // Bright blue
    },
  },
  typography: {
    h4: {
      fontWeight: 700,
      color: '#8e44ad',
    },
    h6: {
      fontWeight: 600,
    },
    body1: {
      fontWeight: 500,
      color: '#34495e',
    },
  },
});

function Admin() {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [users, setUsers] = useState([]);

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

    const fetchUsers = async () => {
      const response = await fetch('http://localhost:4000/api/user/all', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        setUsers(json);
      }
    };

    if (user) {
      fetchWorkouts();
      fetchUsers();
    }
  }, [dispatch, user]);

  const handleDeleteUser = async (id) => {
    const response = await fetch(`http://localhost:4000/api/user/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });

    if (response.ok) {
      setUsers(users.filter((u) => u._id !== id));
    }
  };

  const handleBlockUser = async (id) => {
    const response = await fetch(`http://localhost:4000/api/user/block/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });

    if (response.ok) {
      const updatedUsers = users.map((u) =>
        u._id === id ? { ...u, blocked: !u.blocked } : u
      );
      setUsers(updatedUsers);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Product List
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box>
              {workouts && workouts.map((bdetail) => (
                <AdminBbDetails key={bdetail._id} bdetail={bdetail} />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <AdminReqForm />
          </Grid>
        </Grid>
        <Typography variant="h4" component="h1" gutterBottom sx={{ marginTop: 4 }}>
          Users List
        </Typography>
        <Grid container spacing={4}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user._id}>
              <AdminUserDetails user={user} onDelete={handleDeleteUser} onBlock={handleBlockUser} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default Admin;
