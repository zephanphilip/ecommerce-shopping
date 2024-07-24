import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField, Box, MenuItem } from '@mui/material';

const PaymentUI = ({ open, onClose, onConfirm }) => {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardType, setCardType] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');

  const handleConfirm = () => {
    // Add validation or any other logic if needed
    onConfirm();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Payment</DialogTitle>
      <DialogContent>
        <Typography>Please enter your payment details.</Typography>
        <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            select
            variant="outlined"
            label="Card Type"
            value={cardType}
            onChange={(e) => setCardType(e.target.value)}
            margin="normal"
          >
            <MenuItem value="Visa">Visa</MenuItem>
            <MenuItem value="MasterCard">MasterCard</MenuItem>
            <MenuItem value="American Express">American Express</MenuItem>
          </TextField>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <TextField
              variant="outlined"
              label="Expiry Date"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              margin="normal"
              sx={{ mr: 1, width: '48%' }}
            />
            <TextField
              variant="outlined"
              label="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              margin="normal"
              sx={{ ml: 1, width: '48%' }}
            />
          </Box>
          <TextField
            fullWidth
            variant="outlined"
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleConfirm} color="primary">Confirm Payment</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentUI;
