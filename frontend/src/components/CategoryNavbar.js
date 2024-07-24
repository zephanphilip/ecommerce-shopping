import React from 'react';
import { Button, ButtonGroup, Box } from '@mui/material';
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
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: '0 3px 5px 2px rgba(44, 62, 80, .3)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 6px 10px 4px rgba(44, 62, 80, .3)',
          },
          '&.Mui-selected': {
            backgroundColor: '#34495e',
            color: '#ecf0f1',
          },
        },
      },
    },
  },
});

const CategoryNavbar = ({ selectedCategory, setSelectedCategory }) => {
  const categories = ['All', 'Electronics', 'Clothing', 'Utensils', 'Beauty', 'Furniture'];

  return (
    <ThemeProvider theme={theme}>
      <Box mb={2} display="flex" justifyContent="center">
        <ButtonGroup variant="contained" color="primary" sx={{}}>
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? 'contained' : 'outlined'}
              
              sx={{padding:3,paddingBottom:0,
                '&.Mui-selected': {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.secondary.main,
                },
                '&:hover': {
                  backgroundColor: theme.palette.primary.light,
                },
              }}
            >
              {category}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
    </ThemeProvider>
  );
};

export default CategoryNavbar;


// import React from 'react';
// import { Button, ButtonGroup, Box } from '@mui/material';

// const CategoryNavbar = ({ selectedCategory, setSelectedCategory }) => {
//   const categories = ['All', 'Electronics', 'Clothing', 'Utensils', 'Beauty', 'Furniture'];

//   return (
//     <Box mb={2} display="flex" justifyContent="center">
//       <ButtonGroup variant="contained" color="primary">
//         {categories.map((category) => (
//           <Button
//             key={category}
//             onClick={() => setSelectedCategory(category)}
//             variant={selectedCategory === category ? 'contained' : 'outlined'}
//           >
//             {category}
//           </Button>
//         ))}
//       </ButtonGroup>
//     </Box>
//   );
// };

// export default CategoryNavbar;
