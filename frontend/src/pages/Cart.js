import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, Container, Paper, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useAuthContext } from '../hooks/useAuthContext';
import PaymentUI from '../components/PaymentUi'; // Import the PaymentUI component
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { user } = useAuthContext();
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false); // New state for Payment UI
  const [orderPlacedOpen, setOrderPlacedOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userr, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', place: '', age: '', phone: '' });

  const navigate = useNavigate();
  const handleProfile = () => {
    navigate('/profile');
  };

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
    const fetchCart = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/user/cart', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch cart data');
        const data = await response.json();
        setCartItems(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCart();
  }, [user.token]);

  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await fetch('http://localhost:4000/api/user/cart/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ productId })
      });
      if (!response.ok) throw new Error('Failed to remove product from cart');
      setCartItems(cartItems.filter(item => item.product._id !== productId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCheckout = () => {
    setCheckoutOpen(true);
  };

  const handleConfirmCheckout = () => {
    setCheckoutOpen(false);
    setPaymentOpen(true);
  };

  const handlePlaceOrder = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/user/cart/clear', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      if (!response.ok) throw new Error('Failed to clear cart');
      alert("Your Order Placed Successfully");
      setCartItems([]);
      setPaymentOpen(false);
      setOrderPlacedOpen(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const calculateTotalPrice = () => {
    return Array.isArray(cartItems)
      ? cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)
      : 0;
  };

  const totalPrice = calculateTotalPrice();
  const shippingCharge = totalPrice < 499 ? 70 : 0;
  const finalPrice = totalPrice + shippingCharge;

  if (error) return <Typography color="error">{error}</Typography>;
  if (cartItems.length === 0) return (
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
        <Paper sx={{ p: 4, borderRadius: 2, boxShadow: 3, textAlign: 'center', maxWidth: 400 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#757575' }}>
            Your Cart is Empty
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, color: '#9e9e9e' }}>
            It looks like you have no items in your cart. Browse our products and add items to your cart.
          </Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/')}>
            Browse Products
          </Button>
        </Paper>
      </Box>
    </Container>
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold' }}>Your Cart</Typography>
      
      {cartItems.map((item, index) => (
        <Paper key={index} sx={{ mb: 2, p: 2, borderRadius: 2, boxShadow: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={3}>
              {item.product && (
                <img
                  src={`http://localhost:4000/${item.product.image}`}
                  alt={item.product.title}
                  style={{ width: '100%', height: 'auto', borderRadius: 8, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              {item.product && (
                <>
                  <Typography variant="h6" gutterBottom>{item.product.title}</Typography>
                  <Typography variant="body1">Price: ₹ {item.product.price}</Typography>
                  <Typography variant="body1">Quantity: {item.quantity}</Typography>
                </>
              )}
            </Grid>
            <Grid item xs={12} sm={3} display="flex" flexDirection="column" alignItems="flex-end">
              {item.product && (
                <>
                  <Typography variant="h6" gutterBottom>Subtotal: ₹ {item.product.price * item.quantity}</Typography>
                  <Button variant="contained" color="secondary" onClick={() => handleRemoveFromCart(item.product._id)} sx={{ mt: 1 }}>
                    Remove
                  </Button>
                </>
              )}
            </Grid>
          </Grid>
        </Paper>
      ))}

      <Paper sx={{ mt: 2, p: 2, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h6" gutterBottom>Shipping Address</Typography>
        <Typography variant="h5">{formData.place}</Typography>
        <Typography variant="body1">Shipping Charge: ₹ {shippingCharge}</Typography>
        <Button variant="contained" color="primary" onClick={handleProfile} sx={{ mt: 1 }}>
          Change Shipping Address
        </Button>
      </Paper>

      <Paper sx={{ mt: 2, p: 2, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h6">Total Price: ₹ {totalPrice}</Typography>
        <Typography variant="body1">Shipping Charge: ₹ {shippingCharge}</Typography>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Final Price: ₹ {finalPrice}</Typography>
      </Paper>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" onClick={handleCheckout}>
          Proceed to Checkout
        </Button>
      </Box>

      <Dialog open={checkoutOpen} onClose={() => setCheckoutOpen(false)}>
        <DialogTitle>Confirm Purchase</DialogTitle>
        <DialogContent>
          <Typography>Total Price: ₹ {totalPrice}</Typography>
          <Typography>Shipping Charge: ₹ {shippingCharge}</Typography>
          <Typography>Final Price: ₹ {finalPrice}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCheckoutOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmCheckout} color="primary">Confirm Checkout</Button>
        </DialogActions>
      </Dialog>

      <PaymentUI
        open={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        onConfirm={handlePlaceOrder}
      />

      <Dialog open={orderPlacedOpen} onClose={() => setOrderPlacedOpen(false)}>
        <DialogTitle>Order Placed</DialogTitle>
        <DialogContent>
          <Typography>Your order has been placed successfully!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOrderPlacedOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Cart;


// import React, { useState, useEffect } from 'react';
// import { Typography, Box, Button, Container, Paper, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
// import { useAuthContext } from '../hooks/useAuthContext';
// import PaymentUI from '../components/PaymentUi';// Import the PaymentUI component
// import { useNavigate } from 'react-router-dom';

// const Cart = () => {
//   const { user } = useAuthContext();
//   const [cartItems, setCartItems] = useState([]);
//   const [error, setError] = useState(null);
//   const [checkoutOpen, setCheckoutOpen] = useState(false);
//   const [paymentOpen, setPaymentOpen] = useState(false); // New state for Payment UI
//   const [orderPlacedOpen, setOrderPlacedOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [userr, setUser] = useState(null);
//   const [formData, setFormData] = useState({ name: '', place: '', age: '', phone: '' });

//   const navigate = useNavigate();
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

//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const response = await fetch('http://localhost:4000/api/user/cart', {
//           headers: {
//             'Authorization': `Bearer ${user.token}`
//           }
//         });
//         if (!response.ok) throw new Error('Failed to fetch cart data');
//         const data = await response.json();
//         setCartItems(data);
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     fetchCart();
//   }, [user.token]);

//   const handleRemoveFromCart = async (productId) => {
//     try {
//       const response = await fetch('http://localhost:4000/api/user/cart/remove', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${user.token}`
//         },
//         body: JSON.stringify({ productId })
//       });
//       if (!response.ok) throw new Error('Failed to remove product from cart');
//       setCartItems(cartItems.filter(item => item.product._id !== productId));
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleCheckout = () => {
//     setCheckoutOpen(true);
//   };

//   const handleConfirmCheckout = () => {
//     setCheckoutOpen(false);
//     setPaymentOpen(true);
//   };

//   const handlePlaceOrder = async () => {
//     try {
//       const response = await fetch('http://localhost:4000/api/user/cart/clear', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${user.token}`
//         }
//       });
//       if (!response.ok) throw new Error('Failed to clear cart');
//       alert("Your Order Placed Successfully")
//       setCartItems([]);
//       setPaymentOpen(false);
//       setOrderPlacedOpen(true);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const calculateTotalPrice = () => {
//     return Array.isArray(cartItems)
//       ? cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)
//       : 0;
//   };

//   const totalPrice = calculateTotalPrice();
//   const shippingCharge = totalPrice < 499 ? 70 : 0;
//   const finalPrice = totalPrice + shippingCharge;

//   if (error) return <Typography color="error">{error}</Typography>;
//   if (cartItems.length === 0) return <Typography>Your cart is empty</Typography>;

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>Your Cart</Typography>
//       {cartItems.map((item, index) => (
//         <Paper key={index} sx={{ mb: 2, p: 2 }}>
//           <Grid container spacing={2} alignItems="center">
//             <Grid item xs={3}>
//               {item.product && (
//                 <img
//                   src={`http://localhost:4000/${item.product.image}`}
//                   alt={item.product.title}
//                   style={{ width: '100%', height: 'auto' }}
//                 />
//               )}
//             </Grid>
//             <Grid item xs={6}>
//               {item.product && (
//                 <>
//                   <Typography variant="h6">{item.product.title}</Typography>
//                   <Typography variant="body1">Price: ₹ {item.product.price}</Typography>
//                   <Typography variant="body1">Quantity: {item.quantity}</Typography>
//                 </>
//               )}
//             </Grid>
//             <Grid item xs={3}>
//               {item.product && (
//                 <>
//                   <Typography variant="h6">Subtotal: ₹ {item.product.price * item.quantity}</Typography>
//                   <Button variant="contained" color="secondary" onClick={() => handleRemoveFromCart(item.product._id)}>
//                     Remove
//                   </Button>
//                 </>
//               )}
//             </Grid>
//           </Grid>
//         </Paper>
//       ))}
//       <Paper sx={{ mt: 2, p: 2 }}>
//         <Typography variant="h6">Shipping Address</Typography>
//         <Typography variant="h5">{formData.place}</Typography>
//         <Typography variant="body1">Shipping Charge: ₹ {shippingCharge}</Typography>
//         <Button variant="contained" color="primary" onClick={handleProfile}>
//           Change Shipping Address
//         </Button>
//       </Paper>
//       <Paper sx={{ mt: 2, p: 2 }}>
//         <Typography variant="h6">Total Price: ₹ {totalPrice}</Typography>
//         <Typography variant="body1">Shipping Charge: ₹ {shippingCharge}</Typography>
//         <Typography variant="h5">Final Price: ₹ {finalPrice}</Typography>
//       </Paper>
//       <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
//         <Button variant="contained" color="primary" onClick={handleCheckout}>
//           Proceed to Checkout
//         </Button>
//       </Box>

//       <Dialog open={checkoutOpen} onClose={() => setCheckoutOpen(false)}>
//         <DialogTitle>Confirm Purchase</DialogTitle>
//         <DialogContent>
//           <Typography>Total Price: ₹ {totalPrice}</Typography>
//           <Typography>Shipping Charge: ₹ {shippingCharge}</Typography>
//           <Typography>Final Price: ₹ {finalPrice}</Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setCheckoutOpen(false)}>Cancel</Button>
//           <Button onClick={handleConfirmCheckout} color="primary">Confirm Checkout</Button>
//         </DialogActions>
//       </Dialog>

//       <PaymentUI
//         open={paymentOpen}
//         onClose={() => setPaymentOpen(false)}
//         onConfirm={handlePlaceOrder}
//       />

//       <Dialog open={orderPlacedOpen} onClose={() => setOrderPlacedOpen(false)}>
//         <DialogTitle>Order Placed</DialogTitle>
//         <DialogContent>
//           <Typography>Your order has been placed successfully!</Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOrderPlacedOpen(false)}>Close</Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default Cart;



