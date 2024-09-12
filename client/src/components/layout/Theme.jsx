import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
  palette: {
    primary: {
      main: "#373E40",
      light: "#f0f2f9",
      dark: "#DB4444",
      customBlack: "#262626"
    },
    secondary: {
      main: "#472a7cfd",
      heading:"hsl(219,29%,62%)",
      subHeading:"#7E5A9B"
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif', // Note the correct way of setting font family
  },
});

export default Theme;
