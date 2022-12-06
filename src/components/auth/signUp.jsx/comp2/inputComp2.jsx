import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React from 'react'

export default function InputComp2() {
    return (
        <div>

            <div className='d-flex'>
                <p className='me-5'> What is your gender?*</p>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                >
                    <div className='d-flex'>
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                    </div>
                </RadioGroup>
            </div>
        </div>
    )
}
