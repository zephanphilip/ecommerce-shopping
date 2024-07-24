import React from 'react';
import { Paper, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function WorkoutDetails({ bdetail }) {
  const navigate = useNavigate();

  const handleViewBook = () => {
    navigate(`/viewbook/${bdetail._id}`);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '10px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        {bdetail.image && (
          <img
            src={`http://localhost:4000/${bdetail.image}`}
            alt={bdetail.title}
            style={{
              width: '100%',
              maxWidth: '200px',
              height: 'auto',
              marginBottom: '16px',
              borderRadius: '8px',
              objectFit: 'cover',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          />
        )}
        <Typography variant="h6" component="h4" gutterBottom sx={{ textAlign: 'center', color: '#6d4c41' }}>
          <strong>₹ {bdetail.price}</strong>
        </Typography>
        <Typography variant="h6" component="h4" gutterBottom sx={{ textAlign: 'center', color: '#424242' }}>
          {bdetail.title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1, textAlign: 'center', color: '#757575' }}>
          <strong>{bdetail.features}</strong>
        </Typography>
      </Box>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleViewBook}
          sx={{
            boxShadow: '0 3px 5px 2px rgba(44, 62, 80, .3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: '0 6px 10px 4px rgba(44, 62, 80, .3)',
              backgroundColor: '#6d4c41',
              color: '#ffffff',
            },
          }}
        >
          View Product
        </Button>
      </Box>
    </Paper>
  );
}

export default WorkoutDetails;


// import React from 'react';
// import { Paper, Typography, Box, Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// function WorkoutDetails({ bdetail }) {
//   const navigate = useNavigate();

//   const handleViewBook = () => {
//     navigate(`/viewbook/${bdetail._id}`);
//   };

//   return (
//     <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
//       <Box>
//         {bdetail.image && (
//           <img
//             src={`http://localhost:4000/${bdetail.image}`}
//             alt={bdetail.title}
//             style={{
//               width: '100%',
//               maxWidth: '200px', // Set maximum width
//               height: 'auto', // Maintain aspect ratio
//               marginBottom: '16px',
//             }}
//           />
//         )}
//         <Typography variant="h6" component="h4" gutterBottom>
//          <strong> ₹ {bdetail.price}</strong> 
//         </Typography>
//         <Typography variant="h6" component="h4" gutterBottom>
//           {bdetail.title}
//         </Typography>
//         <Typography variant="body1" sx={{ mb: 1 }}>
//           <strong>{bdetail.features}</strong> 
//         </Typography>
//       </Box>
//       <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
//         <Button
//           variant="outlined"
//           color="primary"
//           onClick={handleViewBook}
//         >
//           View Product
//         </Button>
//       </Box>
//     </Paper>
//   );
// }

// export default WorkoutDetails;

