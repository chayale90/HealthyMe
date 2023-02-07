import React, { useState } from 'react'
import { Avatar, Dialog, IconButton, InputBase, Paper } from '@mui/material'
import { OutlinedInput, InputLabel, InputAdornment, Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../../../services/theme"
import { useForm } from 'react-hook-form';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { btnStyle, btnStyle3, btnStyle2 } from '../../../../services/btnStyle';
import { API_URL, doApiMethod } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import "./editMyDetails"

export default function EditAccount({ displayAccount, returnToMyDetails }) {
    const nav = useNavigate()
    const { register, getValues, handleSubmit, formState: { errors } } = useForm();
    const { user } = useSelector(myStore => myStore.userSlice);
    const [open, setOpen] = useState(true);

    const [values, setValues] = useState({ email: user?.email, password: '', newPassword: '', password3: '', showPassword: true, showNewPassword: false, showPassword3: false });
    const passwordRef = register("password", { required: { value: true, message: 'Password is requried' }, minLength: { value: 3, message: "Password must be at least 3 characters" } });
    const newPasswordRef = register("newPassword", { required: { value: true, message: 'NewPassword is requried' }, minLength: { value: 3, message: "NewPassword must be at least 3 characters" } });
    const passwordRef3 = register("password3", { required: true, validate: (value) => { return value == getValues('newPassword') } });
    const emailRef = register("email", {
        required: true,
        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    })

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values, showPassword: !values.showPassword,
        });
    };
    const handleClickShowNewPassword = () => {
        setValues({
            ...values, showNewPassword: !values.showNewPassword,
        });
    };
    const handleClickShowPassword3 = () => {
        setValues({
            ...values, showPassword3: !values.showPassword3,
        });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const onSubmit = async (_dataBody) => {
        delete _dataBody.password3;
        console.log(_dataBody);
        await doApiEditAccount(_dataBody);
    };

    const doApiEditAccount = async (_dataBody) => {
        let url = API_URL + "/users/changeMyPass";
        try {
            let resp = await doApiMethod(url, "PATCH", _dataBody);
            if (resp.data) {
                console.log(resp.data);
                toast.success("Password changed successfully!");
                // doApiInfoUser()
                nav("/myProfile");
            }
            else {
                toast.error("There problem, try again later")
            }
        }
        catch (err) {
            console.log(err);
            toast.error("There problem, try again later")
        }
    };


    return (
        <>
            <ThemeProvider theme={theme}>
                <Dialog
                    style={{ display: displayAccount }}
                    open={open}
                    fullWidth
                    maxWidth="xs"
                    aria-labelledby="editAccount-dialog"
                    aria-describedby="editAccount-dialog-description"
                >
                    <Paper >
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='container p-md-4 p-3'>
                                <div className='d-flex mb-4 pb-1 '>
                                    <IconButton
                                        onClick={() => { returnToMyDetails() }}
                                        sx={{ marginRight: "55px" }}
                                    >
                                        <ArrowBackIcon />
                                    </IconButton>
                                    <h2 className='s24 mt-2 '>Change password</h2>
                                </div>


                                <div className='inputEmail'>
                                    <InputLabel style={{ fontSize: "14px" }} >Email</InputLabel>
                                    <OutlinedInput
                                        size="small"
                                        autoComplete="email"
                                        fullWidth
                                        // {...emailRef}
                                        label="Email"
                                        variant="outlined"
                                        type={"text"}
                                        // onChange={handleChange('email')}
                                        value={user.email}
                                        disabled={true}
                                    />
                                    {/* {errors.email && <div className="text-danger s12">Enter valid email</div>} */}
                                </div>


                                <div className='inputPass mt-3'>
                                    <InputLabel style={{ fontSize: "14px" }} htmlFor="password">Current Password</InputLabel>
                                    <OutlinedInput size="small"  {...passwordRef}
                                        autoComplete="password"
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        onChange={handleChange('password')}
                                        // defaultValue=" password"
                                        fullWidth
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                    {errors.password && <div className="text-danger s12">{errors?.password?.message}</div>}
                                </div>

                                <div className='inputPass mt-3'>
                                    <InputLabel style={{ fontSize: "14px" }} htmlFor="newPassword">New Password</InputLabel>
                                    <OutlinedInput size="small"  {...newPasswordRef}
                                        autoComplete="newPassword"
                                        type={values.showNewPassword ? 'text' : 'password'}
                                        value={values.newPassword}
                                        onChange={handleChange('newPassword')}
                                        // defaultValue="new password"
                                        fullWidth
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowNewPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {values.showNewPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password2"
                                    />

                                    {errors.newPassword && <div className="text-danger s12">{errors?.newPassword?.message}</div>}
                                </div>


                                <div className='inputPass mt-3'>
                                    <InputLabel style={{ fontSize: "14px" }} htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                                    <OutlinedInput size="small"  {...passwordRef3}
                                        autoComplete="password3"
                                        type={values.showPassword3 ? 'text' : 'password'}
                                        value={values.password3}
                                        onChange={handleChange('password3')}
                                        // defaultValue="Current password"
                                        fullWidth
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword3}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {values.showPassword3 ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password3"
                                    />
                                    {errors.password3 && <div className="text-danger s12">Password not match</div>}
                                </div>

                                <Button type='submit'
                                    sx={btnStyle}
                                    className='loginBtn mt-2'
                                >
                                    Save
                                </Button>

                            </div>
                        </form>
                    </Paper>
                </Dialog>
            </ThemeProvider>
        </>
    )
}
