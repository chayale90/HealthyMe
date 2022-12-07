import { TextField } from '@mui/material'
import React from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../../services/theme';



export default function inputsComp1() {
    return (
        <div >
            <ThemeProvider theme={theme}>
                <TextField size='small' required fullWidth sx={{ marginBottom: "20px" }} type="text" pattern="[A-Za-z]" id="outlined-basic" label="Name" variant="outlined" />
                <TextField size='small' required fullWidth sx={{ marginBottom: "20px" }}  type="email" id="outlined-basic" label="Email" variant="outlined" />
                <TextField size='small' required fullWidth sx={{ marginBottom: "20px" }} type="password" id="outlined-basic" label="Password" variant="outlined" />
                <TextField size='small' required fullWidth sx={{ marginBottom: "20px" }} type="password" id="outlined-basic" label="Confirm Password " variant="outlined" />
            </ThemeProvider>
        </div>
    )
}
