import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

export const theme = createTheme({
    palette: {
        primary: {
            main: "#A435F0",
           
        },
        secondary: {
            main: "#C12FFF",
        },
        danger: {
            main: purple[300],
        }
    }
});
