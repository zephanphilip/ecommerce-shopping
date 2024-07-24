import React from 'react';
import { Button, Box, Typography, Paper } from '@mui/material';

const AdminUserDetails = ({ user, onDelete, onBlock }) => {
  return (
    <Paper sx={{ padding: 3, marginBottom: 3, borderRadius: 2, backgroundColor: '#f5f5f5' }}>
      <Typography variant="h6" sx={{ color: '#8e44ad' }}>{user.name}</Typography>
      <Typography variant="body1" sx={{ marginBottom: 1 }}>{user.email}</Typography>
      <Typography variant="body2" sx={{ marginBottom: 1 }}>Blocked: {user.blocked ? 'Yes' : 'No'}</Typography>
      <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          color="error"
          onClick={() => onDelete(user._id)}
          sx={{ marginRight: 1 }}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          color={user.blocked ? 'primary' : 'warning'}
          onClick={() => onBlock(user._id)}
        >
          {user.blocked ? 'Unblock' : 'Block'}
        </Button>
      </Box>
    </Paper>
  );
};

export default AdminUserDetails;
