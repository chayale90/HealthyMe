import { Button, OutlinedInput, TextField } from '@mui/material'
import React from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../../services/theme';
import { useForm } from 'react-hook-form';
import { btnStyle } from '../../../../services/btnStyle'
import { useNavigate } from 'react-router-dom';



export default function inputsComp1() {
    const { register, getValues, handleSubmit, formState: { errors } } = useForm();
    const nav = useNavigate()
    const regEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

    const onSubmit = (_dataBody) => {
        console.log(_dataBody)
        delete _dataBody.password2;
        //here need to send to grandFather by redux
        nav('/signUp/comp2')
    }

    return (
        <div >
            <ThemeProvider theme={theme}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-3'>
                        <TextField
                            {...register('name', { required: true, minLength: 2, maxLength: 99 })}
                            autoComplete="userName"
                            size='small' fullWidth
                            type="text"
                            label="Name*"
                            variant="outlined"
                        />
                        {errors.name && <small className='text-danger '>Enter valid name </small>}
                    </div>

                    <div className='mb-3'>
                        <TextField
                            {...register('email', { required: true, pattern: regEmail, maxLength: 99 })}
                            autoComplete="emailAdress"
                            size='small' fullWidth
                            type="email"
                            label="Email*"
                            variant="outlined"
                        />
                        {errors.email && <small className='text-danger mb'>Enter valid email</small>}
                    </div>

                    <div className='mb-3'>
                        <TextField
                            {...register('password', { required: true, minLength: 3, maxLength: 99 })}
                            autoComplete="password"
                            id="outlined-adornment-password"
                            size='small' fullWidth
                            // sx={{ marginBottom: "20px" }}
                            type="password" label="Password*"
                            variant="outlined" />
                        {errors.password && <small className='text-danger'>Enter valid password </small>}
                    </div>

                    <div className='mb-3'>
                        <TextField
                            {...register('password2', { required: true, validate: (value) => { return value == getValues('password') } })}
                            autoComplete="password2"
                            size='small' fullWidth
                            type="password"
                            label="Confirm Password*"
                            variant="outlined" />
                        {errors.password2 && <small className='text-danger '>Password not match</small>}
                    </div>

                    <Button type='submit'
                        // onClick={() => nav('/signUp/comp2')}
                        sx={btnStyle}
                        className='loginBtn mt-2'>
                        Next
                    </Button>

                </form>
            </ThemeProvider>
        </div >

    )
}
