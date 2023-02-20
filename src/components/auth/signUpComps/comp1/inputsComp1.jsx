import { Button, OutlinedInput, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../../services/theme';
import { useForm } from 'react-hook-form';
import { btnStyle } from '../../../../services/btnStyle'
import { useDispatch, useSelector } from 'react-redux';
import { setShowHideComp1, setShowHideComp2, addForm } from "../../../../features/signUpSlice"


export default function InputsComp1() {

    const dispatch = useDispatch();
    const { register, getValues, handleSubmit, formState: { errors } } = useForm();
    const regEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    const regWordWithoutDigits = /\b[^\d\W]+\b/g
    const { formComp1 } = useSelector(myStore => myStore.signUpSlice)
   

    const onSubmit = (_dataBody) => {
        console.log(_dataBody)
        // delete _dataBody.password2; -do this in redux
        //here need to send to grandFather by redux:
        dispatch(addForm({ val: _dataBody }))
        dispatch(setShowHideComp1())
        dispatch(setShowHideComp2())
    }

    return (
        <div >
            <ThemeProvider theme={theme}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-3'>
                        <TextField
                            {...register('name', { required: true, pattern: regWordWithoutDigits, minLength: 2, maxLength: 99 })}
                            autoComplete="FullName"
                            size='small' fullWidth
                            label="Full Name*"
                            variant="outlined"
                            defaultValue={formComp1.name}
                        />
                        {errors.name && <div className='text-danger s12'>Enter valid name </div>}
                    </div>

                    <div className='mb-3'>
                        <TextField
                            {...register('email', { required: true, pattern: regEmail, maxLength: 99 })}
                            autoComplete="emailAdress"
                            size='small' fullWidth
                            type="email"
                            label="Email*"
                            variant="outlined"
                            defaultValue={formComp1.email}
                        />
                        {errors.email && <div className='text-danger s12'>Enter valid email</div>}
                    </div>

                    <div className='mb-3'>
                        <TextField
                            {...register('password', { required: true, minLength: 3, maxLength: 99 })}
                            autoComplete="password"
                            id="outlined-adornment-password"
                            size='small' fullWidth
                            // sx={{ marginBottom: "20px" }}
                            type="password" 
                            label="Password*"
                            variant="outlined" 
                            defaultValue={formComp1.password}

                            />
                        {errors.password && <div className='text-danger s12'>Enter valid password </div>}
                    </div>

                    <div className='mb-3'>
                        <TextField
                            {...register('password2', { required: true, validate: (value) => { return value == getValues('password') } })}
                            autoComplete="password2"
                            size='small' fullWidth
                            type="password"
                            label="Confirm Password*"
                            variant="outlined" 
                            defaultValue={formComp1.password2}
                            />
                        {errors.password2 && <div className='text-danger s12'>Password not match</div>}
                    </div>

                    <Button type='submit'
                        sx={btnStyle}
                        className='loginBtn mt-2'>
                        Next
                    </Button>

                </form>
            </ThemeProvider>
        </div >

    )
}
