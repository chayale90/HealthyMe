import { createTheme } from '@mui/material/styles';
import { purple, green } from '@mui/material/colors';

export const theme = createTheme({
    palette: {
        primary: {
            main: "#C12FFF",
        },
        danger: {
            main: purple[300],
        },
        secondary: {
            main: green[500],
        }
    }
});
