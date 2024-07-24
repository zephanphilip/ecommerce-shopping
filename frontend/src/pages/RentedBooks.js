import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, List, ListItem, ListItemText, Paper } from '@mui/material';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
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
    MuiListItem: {
      styleOverrides: {
        root: {
          padding: '10px 20px',
          backgroundColor: '#ffffff', // White
          borderBottom: '1px solid #f5f5f5', // Light grey
          '&:hover': {
            backgroundColor: '#f5f5f5', // Light grey on hover
          },
        },
      },
    },
  },
});

const RentedBooks = () => {
  const { user } = useAuthContext();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRentedBooks = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/workouts/rentedBooks', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch rented books');
        const data = await response.json();
        setBooks(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRentedBooks();
  }, [user.token]);

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
          Rented Books
        </Typography>
        <Paper>
          <List>
            {books.map((book) => (
              <ListItem key={book._id}>
                <ListItemText
                  primary={book.title}
                  secondary={`Author: ${book.author}, ISBN: ${book.isbn}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default RentedBooks;


// import React, { useState, useEffect } from 'react';
// import { Container, Typography, Box, Button, List, ListItem, ListItemText } from '@mui/material';
// import { useAuthContext } from '../hooks/useAuthContext';
// import { useNavigate } from 'react-router-dom';

// const RentedBooks = () => {
//   const { user } = useAuthContext();
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchRentedBooks = async () => {
//       try {
//         const response = await fetch('http://localhost:4000/api/workouts/rentedBooks', {
//           headers: {
//             'Authorization': `Bearer ${user.token}`
//           }
//         });
//         if (!response.ok) throw new Error('Failed to fetch rented books');
//         const data = await response.json();
//         setBooks(data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchRentedBooks();
//   }, [user.token]);

//   if (loading) return <Typography>Loading...</Typography>;
//   if (error) return <Typography color="error">{error}</Typography>;

//   return (
//     <Container>
//       <Button variant="outlined" color="secondary" onClick={() => navigate('/')}>
//         Go To Home
//       </Button>
//       <Typography variant="h4" gutterBottom>
//         Rented Books
//       </Typography>
//       <List>
//         {books.map((book) => (
//           <ListItem key={book._id}>
//             <ListItemText primary={book.title} secondary={`Author: ${book.author}, ISBN: ${book.isbn}`} />
//           </ListItem>
//         ))}
//       </List>
//     </Container>
//   );
// };

// export default RentedBooks;
