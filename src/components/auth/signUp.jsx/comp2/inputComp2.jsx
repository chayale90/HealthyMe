import { FormControl, FormControlLabel, InputAdornment, OutlinedInput, Radio, RadioGroup, TextField, ThemeProvider } from '@mui/material'
import React, { useState } from 'react'
import { theme } from '../../../../services/theme'


export default function InputComp2() {
    const [values, setValues] = useState({
        weight: ''
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

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
                        <TextField className='me-3' size='small' required sx={{ marginBottom: "24px" }} id="outlined-basic" label="Date of birth" type={"date"} variant="outlined" />
                        <TextField size='small' required sx={{ marginBottom: "24px" }} id="outlined-basic" label="Location" variant="outlined" />
                    </div>
                    <div className='d-flex '>
                        <FormControl size='small' variant="outlined">
                            <OutlinedInput
                                id="outlined-adornment-weight"
                                value={values.weight}
                                onChange={handleChange('weight')}
                                endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                                // aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                    'aria-label': 'weight',
                                }}
                            />
                        </FormControl>

                        <TextField  className='ms-3' size='small' required sx={{ marginBottom: "24px" }} id="outlined-basic" label="Height" variant="outlined" />
                    </div>




                </ThemeProvider>
            </div>
        </div>
    )
}
