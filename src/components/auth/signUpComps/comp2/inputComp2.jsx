import { Button, FormControl, FormControlLabel, Input, InputAdornment, OutlinedInput, Radio, RadioGroup, TextField, ThemeProvider } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { theme } from '../../../../services/theme'
import { useNavigate } from 'react-router-dom';
import { btnStyle, btnStyle2 } from '../../../../services/btnStyle';


export default function InputComp2() {
    const { register, getValues, handleSubmit, formState: { errors } } = useForm();
    const nav = useNavigate()

    // const [values, setValues] = useState({
    //     weight: '',
    //     value: "1998-06-28"
    // });

    // const handleChange = (prop) => (event) => {
    //     setValues({ ...values, [prop]: event.target.value });
    // };

    const onSubmit = (_dataBody) => {
        console.log(_dataBody)
        //here need to send to grandFather by redux
        nav('/')
    }

    return (
        <div>

            <div >
                <ThemeProvider theme={theme}>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <TextField size='small' fullWidth sx={{ marginBottom: "14px" }} id="outlined-basic" label="Full Name*" variant="outlined" />

                        <p style={{ fontSize: "14px" }} className="mb-2"> What is your gender?*</p>

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
                            {/* <label>Date of birth</label> */}
                            <OutlinedInput className='me-3' size='small' sx={{ marginBottom: "24px" }} type="date" variant="outlined" />

                            <TextField size='small' sx={{ marginBottom: "24px" }} id="outlined-basic" label="Location" variant="outlined" />

                        </div>

                        <div className='d-flex '>
                            <FormControl size='small' variant="outlined">
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    endAdornment={<InputAdornment position="end">kg*</InputAdornment>}
                                    inputProps={{
                                        'aria-label': 'weight',
                                    }}
                                />
                            </FormControl>
                            <TextField className='ms-3' size='small' sx={{ marginBottom: "24px" }} id="outlined-basic" label="Height*" variant="outlined" />
                        </div>

                        <div className='d-flex mt-2'>

                            <Button
                                onClick={() => nav('/signUp')}
                                sx={btnStyle2}
                                className='loginBtn me-2'>
                                Back
                            </Button>

                            <Button type='submit'
                                // onClick={() => nav('/signUp/comp2')}
                                sx={btnStyle}
                                className='loginBtn'>
                                Finish
                            </Button>

                        </div>



                    </form>
                </ThemeProvider>
            </div>
        </div>
    )
}
