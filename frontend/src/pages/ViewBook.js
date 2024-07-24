import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Box, Button, Container } from '@mui/material';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
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
    h6: {
      fontWeight: 500,
      color: '#424242', // Dark grey
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

const ViewBook = () => {
  const { user } = useAuthContext();
  const { dispatch } = useWorkoutsContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [userr, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', place: '', age: '', phone: '' });

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

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/workouts/${id}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch product data');
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBook();
  }, [id, user.token]);

  const handleBuyNow = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/user/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ productId: id })
      });
      if (!response.ok) throw new Error('Failed to add product to cart');
      const data = await response.json();
      console.log(data);
      navigate('/cart');
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleAddToCart = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/user/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ productId: id })
      });
      if (!response.ok) throw new Error('Failed to add product to cart');
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleProfile = async () => {
    navigate('/profile');
  };

  if (error) return <Typography color="error">{error}</Typography>;
  if (!product) return <Typography>Loading...</Typography>;

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4} p={3} bgcolor="background.paper" borderRadius={2} boxShadow={3}>
          {product.image && (
            <Box flex={1} display="flex" justifyContent="center">
              <img
                src={`http://localhost:4000/${product.image}`}
                alt={product.title}
                style={{
                  width: '100%',
                  maxWidth: '400px',
                  height: 'auto',
                  borderRadius: '10px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              />
            </Box>
          )}
          <Box flex={2} display="flex" flexDirection="column" justifyContent="space-between">
            <Box mb={2}>
              <Typography variant="h4" gutterBottom>
                {product.title}
              </Typography>
              <Typography variant="h6" gutterBottom>
                <strong>₹ {product.price}</strong>
              </Typography>
              <Typography variant="body1" mb={2}>
                {product.desc}
              </Typography>
              <Typography variant="body1" mb={2}>
                <strong>Features:</strong> {product.features}
              </Typography>
              <Typography variant="body1" mb={2}>
                <strong>Category:</strong> {product.category}
              </Typography>
              {product.category === 'Clothing' ? (
                <Typography variant="body1" mb={2}>
                  Delivering to <strong>{formData.place} within 2 Days.</strong>
                </Typography>
              ) : (
                <Typography variant="body1" mb={2}>
                  Delivering to <strong>{formData.place} within 4 Days.</strong>
                </Typography>
              )}
            </Box>
            <Box display="flex" flexDirection="column" gap={2}>
              <Button variant="contained" color="primary" onClick={handleProfile}>
                Change Shipping Address
              </Button>
              <Box display="flex" gap={2}>
                <Button variant="contained" color="secondary" onClick={handleAddToCart}>
                  Add To Cart
                </Button>
                <Button variant="contained" color="secondary" onClick={handleBuyNow}>
                  Buy Now
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ViewBook;


// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Typography, Box, Button, Container,  Grid } from '@mui/material';
// import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
// import { useAuthContext } from '../hooks/useAuthContext';
// import { createTheme, ThemeProvider } from '@mui/material/styles';


// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#6d4c41', // Brown
//     },
//     secondary: {
//       main: '#ffeb3b', // Yellow
//     },
//     background: {
//       default: '#f5f5f5', // Light grey
//       paper: '#ffffff', // White
//     },
//   },
//   typography: {
//     h4: {
//       fontWeight: 700,
//       color: '#6d4c41', // Brown
//     },
//     body1: {
//       fontSize: '1rem',
//       color: '#424242', // Dark grey
//     },
//     body2: {
//       fontSize: '0.875rem',
//       color: '#757575', // Medium grey
//     },
//   },
//   components: {
//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           padding: '20px',
//           margin: '10px 0',
//           borderRadius: '10px',
//           backgroundColor: '#ffffff', // White
//           boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//         },
//       },
//     },
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           fontWeight: 600,
//           textTransform: 'none',
//         },
//       },
//     },
//   },
// });

// const ViewBook = () => {
  
//   const { user } = useAuthContext();
//   const { dispatch } = useWorkoutsContext();
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [product, setProduct] = useState(null);
//   const [error, setError] = useState(null);

//   const [selectedSize, setSelectedSize] = useState('');

//   const [userr, setUser] = useState(null);
//   const [formData, setFormData] = useState({ name: '', place: '', age: '', phone: '' });

//   const handleProfile = async () => {
//     navigate('/profile');
//   }
//   useEffect(() => {
//   const fetchUserData = async () => {
//     try {
//       const response = await fetch('http://localhost:4000/api/user/me', {
//         headers: {
//           'Authorization': `Bearer ${user.token}`
//         }
//       });
//       if (!response.ok) throw new Error('Failed to fetch user data');
//       const data = await response.json();
//       setUser(data);
//       setFormData({ name: data.name, place: data.place, age: data.age, phone: data.phone });
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   fetchUserData();
// }, [user.token]);

//   const handleSizeClick = (size) => {
//     setSelectedSize(size);
//   };
//   useEffect(() => {
//     const fetchBook = async () => {
//       try {
//         const response = await fetch(`http://localhost:4000/api/workouts/${id}`, {
//           headers: {
//             'Authorization': `Bearer ${user.token}`
//           }
//         });
//         if (!response.ok) throw new Error('Failed to fetch product data');
//         const data = await response.json();
//         setProduct(data);
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     fetchBook();
//   }, [id, user.token]);

//   const handleBuyNow = async () => {
//     try {
//       const response = await fetch('http://localhost:4000/api/user/cart', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${user.token}`
//         },
//         body: JSON.stringify({ productId: id })
//       });
//       if (!response.ok) throw new Error('Failed to add product to cart');
//       const data = await response.json();
      
//       console.log(data);
//       navigate('/cart');
//     } catch (err) {
//       console.error(err.message);
//     }
//    };

//    const handleAddToCart = async () => {
//     try {
//       const response = await fetch('http://localhost:4000/api/user/cart', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${user.token}`
//         },
//         body: JSON.stringify({ productId: id })
//       });
//       if (!response.ok) throw new Error('Failed to add product to cart');
//       const data = await response.json();
//       console.log(data);
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   if (error) return <Typography color="error">{error}</Typography>;
//   if (!product) return <Typography>Loading...</Typography>;


//   return (
//     <ThemeProvider theme={theme}>
//       <Container>
        
//           <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2}>
//             {product.image && (
//               <img
//                 src={`http://localhost:4000/${product.image}`}
//                 alt={product.title}
//                 style={{
//                   width: '100%',
//                   maxWidth: '400px', // Set maximum width
//                   height: 'auto', // Maintain aspect ratio
//                   marginBottom: '16px',
//                 }}
//               />
//             )}
//             <Box>
//               <Typography variant="h4" gutterBottom>
//                 {product.title}
//               </Typography>
//               <Typography variant="h6" component="h4" gutterBottom>
//                 <strong>₹ {product.price}</strong> 
//               </Typography>
//               <Typography variant="body1" sx={{ mb: 1 }}>
//                 {product.desc}
//               </Typography>
//               <Typography variant="body1" sx={{ mb: 1 }}>
//                 <strong>Features:</strong> {product.features}
//               </Typography>
//               <Typography variant="body1" sx={{ mb: 1 }}>
//                 <strong>Category:</strong> {product.category}
//               </Typography>
//               {product.category === 'Clothing' && (
//                 <Typography variant="body1" sx={{ mb: 1 }}>
//                 Delivering to <strong>{formData.place} within 2 Days.</strong> 
//               </Typography>
//         )}
//         {product.category !== 'Clothing' && (
//                 <Typography variant="body1" sx={{ mb: 1 }}>
//                 Delivering to <strong>{formData.place} within 4 Days.</strong> 
//               </Typography>
              
//         )}
//         <Button variant="contained" color="primary" onClick={handleProfile}>
//           Change Shipping Address
//         </Button>
//               <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
//                 <Button
//                   variant="contained"
//                   color="secondary"
//                   onClick={handleAddToCart}
//                 >
//                   Add To Cart
//                 </Button>
//                 <Button
//                   variant="contained"
//                   color="secondary"
//                   onClick={handleBuyNow}
//                 >
//                   Buy Now
//                 </Button>
//               </Box>
//             </Box>
//           </Box>
        
//       </Container>
//     </ThemeProvider>
//   );
// };

// export default ViewBook;

