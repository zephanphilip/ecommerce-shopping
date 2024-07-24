import React from 'react';
import { TextField, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2c3e50', // Navy blue
    },
    secondary: {
      main: '#ecf0f1', // Light gray
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 25,
            boxShadow: '0 3px 5px 2px rgba(44, 62, 80, .3)',
            transition: 'all 0.3s ease',
            '&:hover fieldset': {
              borderColor: '#2c3e50',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#2c3e50',
            },
          },
        },
      },
    },
  },
});

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box mb={2} display="flex" justifyContent="center">
        <TextField
          variant="outlined"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          sx={{ maxWidth: 500 }}
        />
      </Box>
    </ThemeProvider>
  );
};

export default SearchBar;


// import React from 'react';
// import { TextField, Box } from '@mui/material';

// const SearchBar = ({ searchQuery, setSearchQuery }) => {
//   return (
//     <Box mb={2} display="flex" justifyContent="center">
//       <TextField
//         variant="outlined"
//         placeholder="Search products..."
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         fullWidth
//         sx={{ maxWidth: 500 }}
//       />
//     </Box>
//   );
// };

// export default SearchBar;
