import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  typography  : {
     fontFamily: 'Noto Sans',
  },
  palette: {
   
    // mode: 'dark',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    text : {
      secondary : '#6F7E8C'
    }
  },
});

export default theme;