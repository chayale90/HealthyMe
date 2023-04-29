import { Button, TextField } from '@mui/material'
import React from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../../../services/theme';
import { useForm } from 'react-hook-form';
import { btnStyle } from '../../../../services/btnStyle'
import { useDispatch, useSelector } from 'react-redux';
import { setIsShowBeginComp, setIsShowEndComp, addForm } from "../../../../features/signUpSlice"


export default function InputsBegin() {

    const dispatch = useDispatch();
    const { register, getValues, handleSubmit, formState: { errors } } = useForm();
    const regEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    const regWordWithoutDigits = /\b[^\d\W]+\b/g
    const { formBegin } = useSelector(myStore => myStore.signUpSlice)
   

    const onSubmit = (_dataBody) => {
        // delete _dataBody.password2; -do this in redux
        //here need to send to grandFather by redux:
        dispatch(addForm({ val: _dataBody }))
        dispatch(setIsShowBeginComp())
        dispatch(setIsShowEndComp())
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-3'>
                        <TextField
                            {...register('name', { required: true, pattern: regWordWithoutDigits, minLength: 2, maxLength: 99 })}
                            autoComplete="FullName"
                            size='small' fullWidth
                            label="Full Name*"
                            variant="outlined"
                            defaultValue={formBegin.name}
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
                            defaultValue={formBegin.email}
                        />
                        {errors.email && <div className='text-danger s12'>Enter valid email</div>}
                    </div>

                    <div className='mb-3'>
                        <TextField
                            {...register('password', { required: true, minLength: 3, maxLength: 99 })}
                            autoComplete="password"
                            id="outlined-adornment-password"
                            size='small' fullWidth
                            type="password" 
                            label="Password*"
                            variant="outlined" 
                            defaultValue={formBegin.password}
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
                            defaultValue={formBegin.password2}
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
        </ >

    )
}
