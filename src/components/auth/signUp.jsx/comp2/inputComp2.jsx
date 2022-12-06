import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, ThemeProvider } from '@mui/material'
import React from 'react'
import { theme } from '../../../../services/theme'

export default function InputComp2() {
    return (
        <div>

            <div >
                <p style={{ fontSize: "14px" }} className="mb-2"> What is your gender?*</p>
                <ThemeProvider theme={theme}>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        size="small"
                    >
                        <div className='d-flex' >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </div>
                    </RadioGroup>
                    <div className='d-flex mt-3'>
                        <TextField className='me-3' size='small' required sx={{ marginBottom: "24px" }} id="outlined-basic" label="Date of birth" variant="outlined" />
                        <TextField size='small' required sx={{ marginBottom: "24px" }} id="outlined-basic" label="Location" variant="outlined" />
                    </div>
                    <div className='d-flex mb-3'>
                        <TextField className='me-3' size='small' required sx={{ marginBottom: "24px" }} id="outlined-basic" label="Weight" variant="outlined" />
                        <TextField size='small' required sx={{ marginBottom: "24px" }} id="outlined-basic" label="Height" variant="outlined" />
                    </div>

                </ThemeProvider>
            </div>
        </div>
    )
}
