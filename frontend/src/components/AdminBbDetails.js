import React from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { Paper, Typography, Box, Button } from '@mui/material';

function AdminBbDetails({ bdetail }) {
  const { user } = useAuthContext();
  const { dispatch } = useWorkoutsContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch('http://localhost:4000/api/workouts/' + bdetail._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2, backgroundColor: '#f5f5f5' }}>
      
      <Box>
      {bdetail.image && (
          <img
            src={`http://localhost:4000/${bdetail.image}`}
            
            alt={bdetail.title}
            style={{
              width: '100%',
              maxWidth: '200px', // Set maximum width
              height: 'auto', // Maintain aspect ratio
              marginBottom: '16px',
            }}
          />
        )}
        <Typography variant="h6" component="h4" gutterBottom sx={{ color: '#8e44ad' }}>
        {bdetail.title}
      </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
         {bdetail.desc}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Features:</strong> {bdetail.features}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Category:</strong> {bdetail.category}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>₹</strong> {bdetail.price}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Button
          variant="contained"
          color="error"
          onClick={handleClick}
        >
          DELETE
        </Button>
      </Box>
    </Paper>
  );
}

export default AdminBbDetails;


// import React from 'react';
// import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
// import { useAuthContext } from '../hooks/useAuthContext';
// import formatDistanceToNow from 'date-fns/formatDistanceToNow';
// import { Paper, Typography, Box, Button } from '@mui/material';

// function AdminBbDetails({ bdetail }) {
//   const { user } = useAuthContext();
//   const { dispatch } = useWorkoutsContext();

//   const handleClickApprove = async () => {
//     if (!user) {
//       return;
//     }

//     try {
//       const response = await fetch(`http://localhost:4000/api/workouts/approve/${bdetail._id}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${user.token}`
//         },
//         body: JSON.stringify({ isAvailable: true })
//       });

//       const json = await response.json();

//       if (response.ok) {
//         dispatch({ type: 'UPDATE_WORKOUT', payload: json });
//       } else {
//         console.error('Failed to approve:', json.error);
//       }
//     } catch (error) {
//       console.error('Error approving workout:', error);
//     }
//   };
//   const handleRemoveApprove = async () => {
//     if (!user) {
//       return;
//     }

//     try {
//       const response = await fetch(`http://localhost:4000/api/workouts/rapprove/${bdetail._id}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${user.token}`
//         },
//         body: JSON.stringify({ isAvailable: false })
//       });

//       const json = await response.json();

//       if (response.ok) {
//         dispatch({ type: 'UPDATE_WORKOUT', payload: json });
//       } else {
//         console.error('Failed to approve:', json.error);
//       }
//     } catch (error) {
//       console.error('Error approving workout:', error);
//     }
//   };

//   const handleClick = async () => {
//     if (!user) {
//       return;
//     }

//     const response = await fetch('http://localhost:4000/api/workouts/' + bdetail._id, {
//       method: 'DELETE',
//       headers: {
//         'Authorization': `Bearer ${user.token}`
//       }
//     });
//     const json = await response.json();
//     if (response.ok) {
//       dispatch({ type: 'DELETE_WORKOUT', payload: json });
//     }
//   };

//   return (
//     <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
//       <Typography variant="h6" component="h4" gutterBottom>
//         {bdetail.title}
//       </Typography>
//       <Box>
//         <Typography variant="body1">
//           <strong>Serial No:</strong> {bdetail.serialNo}
//         </Typography>
//         <Typography variant="body1">
//           <strong>Author:</strong> {bdetail.author}
//         </Typography>
//         <Typography variant="body1">
//           <strong>Publication Year:</strong> {bdetail.publicationYear}
//         </Typography>
//         <Typography variant="body1">
//           <strong>Genre:</strong> {bdetail.genre}
//         </Typography>
//         <Typography variant="body1">
//           <strong>ISBN:</strong> {bdetail.isbn}
//         </Typography>
//         <Typography variant="body1">
//           <strong>Available:</strong> {bdetail.isAvailable ? 'Yes' : 'No'}
//         </Typography>
//         <Typography variant="body2" color="textSecondary">
//           {formatDistanceToNow(new Date(bdetail.createdAt), { addSuffix: true })}
//         </Typography>
//       </Box>
//       <Box sx={{ mt: 2 }}>
//         {!bdetail.isAvailable ? (
//           <Button
//             variant="contained"
//             color='success'
//             sx={{ mb: 1 }}
//             onClick={handleClickApprove}
//           >
//             MARK AS AVAILABLE
//           </Button>
//         ): (<Button
//         variant="contained"
//         color='success'
//         sx={{ mb: 1 }}
//         onClick={handleRemoveApprove}
//       >
//         MARK AS UNAVAILABLE
//       </Button>)}
//         <Button
//           variant="contained"
//           color='error'
//           onClick={handleClick}
//         >
//           DELETE
//         </Button>
//       </Box>
//     </Paper>
//   );
// }

// export default AdminBbDetails;
