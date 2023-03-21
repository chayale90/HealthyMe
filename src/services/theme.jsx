import { createTheme } from '@mui/material/styles';
import { grey, purple } from '@mui/material/colors';

export const theme = createTheme({
    palette: {
        primary: {
            main: "#A435F0",
        },
        secondary: {
            main: "#C12FFF",
        },
        danger: {
            main: "purple[300]",
        },
        success: {
            main: "#FFFFFF"
        },
        darkMode:{
            main: "#4a4848"
        },
        lightMode:{
            main: "#FFGFFF"
        }
    }
});

