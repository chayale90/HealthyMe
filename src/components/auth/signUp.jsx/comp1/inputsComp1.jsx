import { TextField } from '@mui/material'
import React from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../../services/theme';

export default function inputsComp1() {
    return (
        <div >
            <ThemeProvider theme={theme}>
                    <TextField required fullWidth sx={{ marginBottom: "24px" }} id="outlined-basic" label="Name" variant="outlined" />
                    <TextField required fullWidth sx={{ marginBottom: "24px"}} id="outlined-basic" label="Email" variant="outlined" />
                    <TextField required fullWidth sx={{ marginBottom: "24px"}} id="outlined-basic" label="Password" variant="outlined" />
                    <TextField required fullWidth sx={{ marginBottom: "24px"}} id="outlined-basic" label="confirm Password " variant="outlined" />
            </ThemeProvider>

        </div>
    )
}
